const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author;
    let uava = target.avatarURL
    let embed = new Discord.RichEmbed()
        .setAuthor(target.username)
        .setDescription("Информация о пользователе")
        .setColor("#9B59B6")
        .setThumbnail(uava)
        .addField("Полный ник", `${target.username}#${target.discriminator}`)
        .addField("ID", target.id)
        .addField("Дата создания аккаунта", target.createdAt);

    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "uinfo"
}