const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.some(r=>["*Admin", "Banhammer"].includes(r.name)) )
    return message.reply("К сожалению, у вас нет прав на использование этого!").then(msg => msg.delete(5000)).then(message.delete(5000));

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Вы ввели не правильно НИК или ID.");

    let role = message.guild.roles.find(r => r.name === "muted");

    if(!role || !toMute.roles.has(role.id)) return message.channel.send("Этот пользователь не заткнут!");

    delete bot.mutes[toMute.id];

    await toMute.removeRole(role);
    message.channel.send(`${member.user} включены чаты администратором ${message.author}`).then(msg => msg.delete(5000)).then(message.delete(5000));

    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
        if(err) throw err;
        console.log(`Размутил ${toMute.user.tag}.`);
    });
}

module.exports.help = {
    name: "unmute"
}