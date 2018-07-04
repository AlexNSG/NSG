const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let uava = message.guild.iconURL
    let embed = new Discord.RichEmbed()
        .setDescription("Информация о всех командах")
        .setColor("#9B59B6")
        .setThumbnail(uava)
        .addField("1. !userinfo", "Команда для показа информации о участниках сервера.")
        .addField("2. !avatar", "Вывести фотографию пользователя в чат.")
        .addField("3. !icon", "Вывести фотографию данного сервера Discord.")
        .addField("4. !findusers", "Найти никнеймы по ключевому слову.")
        .addField("5. !mute", "Заткнуть пользователя, можно на время, можно навсегда (для модераторов).")
        .addField("6. !unmute", "То же самое что и !mute, только отключает.");

    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "help"
}