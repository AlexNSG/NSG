const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {    
    if (!message.member.voiceChannel) return message.channel.send('huy');
    message.member.voiceChannel.leave();
    return;
}

module.exports.help = {
    name: "mstop"
}