module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.some(r=>["*Admin","Banhammer"].includes(r.name)) )
    return message.reply("К сожалению, у вас нет прав на использование этого!").then(msg => msg.delete(5000)).then(message.delete(5000));

    let msg = await message.channel.send("Генерируется иконка сервера...");

    if(!message.guild.iconURL) return msg.edit("Нет иконки сервера.");

    message.channel.send({files: [
        {
            attachment: message.guild.iconURL,
            name: "icon.png"
        }
    ]});

    msg.delete();
}

module.exports.help = {
    name: "sicon"
}