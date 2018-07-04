const Discord = module.require("discord.js");
const YTDL = module.require('ytdl-core');

const queue = new Map();

module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.some(r=>["*Admin", "Banhammer"].includes(r.name)) )
    return message.reply("К сожалению, у вас нет прав на использование этого!").then(msg => msg.delete(5000)).then(message.delete(5000));
    const chat = message.content.split(" ");
    const serverQueue = queue.get(message.guild.id);
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
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);

    const dispatcher = serverQueue.connection.playStream(YTDL(song.url))
        .on('end', () => {
            console.log('song ended!');
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(5 / 5);
}

module.exports.help = {
    name: "mplay"
}