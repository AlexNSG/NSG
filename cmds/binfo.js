const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let autor = "AlexNSG";
    let vk = "https://vk.com/alexnsg";
    let botembed = new Discord.RichEmbed()
    .setTitle("Информация о боте")
    .setDescription("Данный бот предназначен для Discord сервера CIGIL!")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Имя бота", bot.user.username)
    .addField("Автор бота", autor)
    .addField("ВК Автора", vk)
    .addField("Дата создания бота", bot.user.createdAt);

    message.channel.send(botembed);
}

module.exports.help = {
    name: "binfo"
}