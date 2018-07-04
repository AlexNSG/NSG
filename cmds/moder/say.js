const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.some(r=>["*Admin"].includes(r.name)) )
    return message.reply("К сожалению, у вас нет прав на использование этого!").then(msg => msg.delete(5000)).then(message.delete(5000));

    const sayMessage = args.join(" ");
    message.delete();
    message.channel.send(sayMessage);
}

module.exports.help = {
    name: "say"
}