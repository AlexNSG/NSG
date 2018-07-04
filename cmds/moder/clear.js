const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.some(r=>["*Admin"].includes(r.name)) )
    return message.reply("К сожалению, у вас нет прав на использование этого!").then(msg => msg.delete(5000)).then(message.delete(5000));

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Удалено ${args[0]} сообщений администратором ${message.author}.`).then(msg => msg.delete(2000));
    });

    let clearEmbed = new Discord.RichEmbed()
        .setDescription("~Очистка~")
        .setColor("#bc0000")
        .addField("Кто очистил", `${message.author} с ID ${message.author.id}`)
        .addField("В каком чате", message.channel)
        .addField("Время", message.createdAt)
        .addField("Сколько сообщений удалено", args[0]);

    let logschannels = message.guild.channels.find(`name`, "logs");
    if(!logschannels) return message.channels.send("Невозможно найти канал logs.");
    logschannels.send(clearEmbed);
}
    
module.exports.help = {
    name: "clear"
}