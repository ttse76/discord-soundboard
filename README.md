# Discord Soundboard Framework

## Installation
```
npm i discord-soundboard
```

## Usage
```javascript
const Soundboard = require('discord-soundboard');
const soundboard = new Soundboard('BOT_TOKEN');
```

## Constructor Parameters
```javascript
Soundboard(token, title, prefix, info)
```
#### Required
`token` - Bot token from Discord dev portal

#### Optional
`title` - Name of soundboard. Primarily for the help

`prefix` - Prefix to trigger bot. Default is `-`

`info` - JSON file for the audio information. Default is `info.json`.

## info.json
A JSON file for the audio information is required. By default this file is `info.json` located in the root directory.

`info.json` is required to have two entires. `blocks` which is an array, and `audio`, which is an object of arrays

### Structure
```javascript
{
  // categories for audio files
  "blocks":["category1", "category2"],
  
  // audio files
  "audio":{
    "category1": ["file1", "file2"],
    "category2": ["file3"]
  }
}
```

This file is processed on service start. Any changes to `info.json` requires a restart of the service

## /audio
This is where the audio files are saved. By default the `/audio` folder is in the root directory. This cannot be changed. 
File structure should be the same as the structure in `info.json` where the categories are the folders. folders and audio names must match what is in `info.json`
Currently only `.mp3` files are supported.

## I finished the soundboard...now what?
The service must be running in order for the bot to work in discord. 
You can set this up on your local machine or a cloud computing service like [Vultr](https://www.vultr.com/?ref=8713720).

## Bugs
If you encounter any bugs/weird errors, please create an issue [here](https://github.com/ttse76/discord-soundboard/issues).
