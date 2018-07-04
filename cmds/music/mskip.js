const Discord = require("discord.js");
const queue = new Map();

module.exports.run = async (bot, message, args) => {
    /*if(!message.member.roles.some(r=>["*Admin", "Banhammer"].includes(r.name)) )
    return message.reply("К сожалению, у вас нет прав на использование этого!").then(msg => msg.delete(5000)).then(message.delete(5000));
    const chat = message.content.split(" ");*/
    /*const serverQueue = queue.get(message.guild.id);
    const voiceChannel = message.member.voiceChannel;

    const songInfo = await YTDL.getInfo(chat[1]);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url
    };
    console.log(songInfo.baseUrl);
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(message.guild.id);
            return message.channel.send(`I could not join the voice channel: ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        return message.channel.send(`**${song.title}** добавлена в очередь!`);
    }
    return;
}*/
    const serverQueue = queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send('There is nothing playnig that I could skip for you.');
    serverQueue.connection.dispatcher.end();
    return;
}

module.exports.help = {
    name: "mskip"
}