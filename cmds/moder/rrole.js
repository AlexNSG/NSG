const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.some(r=>["*Admin"].includes(r.name)) )
    return message.reply("К сожалению, у вас нет прав на использование этого!").then(msg => msg.delete(5000)).then(message.delete(5000));
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("Не могу найти пользователя.").then(msg => msg.delete(5000)).then(message.delete(5000));
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("Укажите роль!").then(msg => msg.delete(5000)).then(message.delete(5000));
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Не могу найти эту роль.").then(msg => msg.delete(5000)).then(message.delete(5000));
  
    if(!rMember.roles.has(gRole.id)) return message.reply("Он не имеет такой роли.").then(msg => msg.delete(5000)).then(message.delete(5000));
    await(rMember.removeRole(gRole.id));
    message.delete();
  
    message.channel.send(`${message.author} снял с пользователя <@${rMember.id}>, роль ${gRole.name}.`);
}
    
module.exports.help = {
    name: "rrole"
}
