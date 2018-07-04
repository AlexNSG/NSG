const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.some(r=>["*Admin", "Banhammer"].includes(r.name)) )
    return message.reply("К сожалению, у вас нет прав на использование этого!").then(msg => msg.delete(5000)).then(message.delete(5000));

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Вы ввели не правильно НИК или ID.");

    if(toMute.id === message.author.id) return message.channel.send("Вы не можете заткнуть себя.");
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("Вы не можете заткнуть пользователя, который выше или имеет ту же роль, что и вы.");

    let role = message.guild.roles.find(r => r.name === "muted");
    if(!role) {
        try {
            let role = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions: []
            });
    
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            })
        } catch(e) {
            console.log(e.stack);
        }
    }

    if(toMute.roles.has(role.id)) return message.channel.send("Этот пользователь уже заткнут!");

    bot.mutes[toMute.id] = {
        guild: message.guild.id,
        time: Date.now() + parseInt(args[1]) * 1000
    }

    await toMute.addRole(role);

    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
        if(err) throw err;
        message.channel.send(`${member.user} заткнут администратором ${message.author}`).then(msg => msg.delete(5000)).then(message.delete(5000));
    });
}

module.exports.help = {
    name: "mute"
}