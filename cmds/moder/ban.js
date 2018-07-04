const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.some(r=>["*Admin", "Banhammer"].includes(r.name)) )
    return message.reply("К сожалению, у вас нет прав на использование этого!").then(msg => msg.delete(5000)).then(message.delete(5000));

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
    return message.reply("Укажите правильный НИК или ID.");
    if(!member.kickable) 
    return message.reply("Вы не можете забанить пользователя, который выше или имеет ту же роль, что и вы.");
  
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Причина не указана";
    
    let banEmbed = new Discord.RichEmbed()
        .setDescription("~Бан~")
        .setColor("#bc0000")
        .addField("Кто", `${member.user} с ID ${member.user.id}`)
        .addField("Кем", `${message.author} с ID ${message.author.id}`)
        .addField("В чате", message.channel)
        .addField("Время", message.createdAt)
        .addField("Причина", reason);

    let logschannels = message.guild.channels.find(`name`, "logs");
    if(!logschannels) return message.channels.send("Невозможно найти канал logs.");
      
    await member.ban(reason)
    .catch(error => message.reply(`Извините ${message.author} Я не мог забанить из-за : ${error}`));
    message.channel.send(`${member.user} забанен администратором ${message.author} причина: ${reason}`).then(msg => msg.delete(30000)).then(message.delete(5000));
    logschannels.send(banEmbed);
}
    
module.exports.help = {
    name: "ban"
}