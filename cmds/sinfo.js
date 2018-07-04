const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let invite = "https://discord.gg/russiapaver";
    let serverembed = new Discord.RichEmbed()
    .setTitle("Информация о сервере")
    .setDescription("Сервер сообщества CIGIL!")
    .setColor("#ef2f4f")
    .setThumbnail(sicon)
    .addField("Название сервера", message.guild.name)
    .addField("Инвайт", invite)
    .addField("Дата вашего присоединения к серверу", message.member.joinedAt)
    .addField("Дата создания сервера", message.guild.createdAt);

    message.channel.send(serverembed);
}

module.exports.help = {
    name: "sinfo"
}