const Discord = require('discord.js');
const utils = require('mundane-utils');

const processJSON = (f) => {
    const info = require(f);

    console.log('Processing audio info...');
    characters = info.characters;
    let audioInfo = info.audio;
    for(let i = 0; i < characters.length; i++){
        let char = characters[i];
        audioFiles.set(char, audioInfo[char]);
    }
    return;
};

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
        this.token = token;
        this.prefix = prefix;
        this.info = info;
        this.client = new Discord.Client();
        this.client.login(this.token);
        this.client.once('ready', () => {
            try{
                //processJSON(this.info);
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
            console.log(command);
        });
    }
}

module.exports = Soundboard;