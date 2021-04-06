const Discord = require('discord.js');
const utils = require('mundane-utils');

const processJSON = (blocks, audio) => {
    let audioFiles = new Map();
    
    console.log(blocks);
    console.log('Processing audio info...');
    for(let i = 0; i < blocks.length; i++){
        let char = blocks[i];
        audioFiles.set(char, audio[char]);
    }
    return audioFiles;
};

const verifyRequest = (command, arg) => {
    if(!characters.includes(command)){
        return false;
    }
    let charAudio = audioFiles.get(command);
    if(arg && !charAudio.includes(arg)){
        return false;
    }
    return true;
}

class Soundboard{
    /**
     * Class for creating soundboard
     * @param token Token from bot page on discord dev portal
     * @param prefix Prefix to trigger audio. Default is -
     * @param info JSON file that contains audio info. Default is info.json
     */
    constructor(token='', prefix = '-', info='info.json'){
        if(utils.stringIsEmpty(token)){
            throw new Error("Bot token required");  
        }
        let audioFiles = new Map();
        this.token = token;
        this.prefix = prefix;
        this.info = info;
        const {blocks, audio} = require('../' + info);

        this.client = new Discord.Client();
        this.client.login(this.token);
        this.client.once('ready', async () => {
            try{
                audioFiles = processJSON(blocks, audio);
            }catch(err){
                throw new Error("JSON unable to be processed");
            }
            console.log('Soundboard Connected');
        });
        this.client.on('message', async message => {
            if(message.author.bot) return;
            if(!message.content.startsWith(prefix)) return;
            const voiceChannel = message.member.voice.channel;
            if(!voiceChannel){
                return message.channel.send("You need to be in a voice channel");
            }

            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
                return message.channel.send(
                    "Bot requires permissions to join and speak in your voice channel"
                );
            }
            const messageArr = message.content.slice(prefix.length).trim().split(' ');
            const command = messageArr.shift().toLowerCase();
            var arg = '';
            if(messageArr.length > 0){
                arg = messageArr[0];
            }
            switch(command){
                case "help":
                    //generateHelp();
                    break;
                default:
                    if(verifyRequest(command, arg)){
                        playFile(command, arg, voiceChannel);
                        return;
                    }
                    else{
                        return message.channel.send('Command not valid');
                    }   
            }
        });




        //Helper functions
        const verifyRequest = (command, arg) => {
            if(!blocks.includes(command)){
                return false;
            }
            let charAudio = audioFiles.get(command);
            if(arg && !charAudio.includes(arg)){
                return false;
            }
            return true;
        }

        const playFile = (block, audio, voiceChannel) => {
            var audioFile = 'audio/' + block;
            if(audio){
                audioFile += '/' + audio + '.mp3';
            }else{
                let blockAudioFiles = audioFiles.get(block);
                let selected = blockAudioFiles[Math.floor(Math.random() * blockAudioFiles.length)]
                audioFile += '/' + selected + '.mp3';
            }
            try{
                voiceChannel.join().then(connection => {
                    connection.play(audioFile).on('finish', () => {
                        voiceChannel.leave();
                    });
                    
                });
                
            }catch(err){
                return message.channel.send(err);
            }
        }

    }
}

module.exports = Soundboard;