const { MESSAGES } = require("../../util/constants");
const Discord = require("discord.js");
const ytdl = require('ytdl-core');
//const client = new Discord.Client();
const queue = new Map();
const youtube = require('request');



module.exports.run = async(client, message, args) => {        
    const serverQueue = queue.get(message.guild.id);
    execute(message, serverQueue);
    return;
};

module.exports.help = {
  name: "play"
};

async function execute(message, serverQueue) {
    args = message.content.substring(message.content.indexOf(" ") + 1, message.content.length)
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send("Vous n'etes pas dans un channel vocal");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "Je n'ai pas les permissions necessaires pour parler ou pour me connecter"
      );
    }
    //let result = await searcher.search(args.splice(1).join(' '), { type: 'video' });
    apikey = process.env.YOUTUBE
    url = "https://youtube.googleapis.com/youtube/v3/search?maxResults=5&q=" + args + "&key=" + apikey;
    var connection = await voiceChannel.join();

    youtube(url, { json: true }, (err, body, res) => {
        if (err) { return console.log(err); }
        n = 0
        console.log(url)
        while(res.items[n].id.videoId ==  undefined){
            n=n+1
            console.log(n)
        }
        kolo = res.items[n].id.videoId;
        console.log(kolo)
        message.channel.send("Url: https://www.youtube.com/watch?v=" + kolo);
    
    /*voiceChannel.join().then(connection => {
        //connection.play(ytdl('https://www.youtube.com/watch?v=' + kolo, { filter: 'audioonly' }));
    }).catch(console.error);*/
//console.log(kolo)
    const song = {
        //title: results.first.title,
        url: 'https://www.youtube.com/watch?v=' + kolo,
    };
    console.log(song.url)
    if (!serverQueue) {
        const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
        } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return 
        }
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(`**${song.url}** is playing`);
    }
    });
    
    function play(guild, song, message) {
        const serverQueue = queue.get(guild.id);
        if (!song) {
          serverQueue.voiceChannel.leave();
          queue.delete(guild.id)
          return;
        }
    
        const dispatcher = serverQueue.connection
          .play(ytdl(song.url))
          .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
          })
          .on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(`Play: **${song.url}**`);
    };
}