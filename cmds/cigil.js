module.exports.run = async (bot, message, args) => {
    let role = message.guild.roles.find("name", "CIGIL");
    if(message.member.roles.has(role.id)) return message.reply("Хорошо заберу обратно роль CIGIL, как хочешь!").then(message.member.removeRole('337228181662728194'));
    await message.member.addRole('337228181662728194')

    message.channel.send(`${message.author} получил роль CIGIL, введя команду !cigil`);
}

module.exports.help = {
    name: "cigil"
}
