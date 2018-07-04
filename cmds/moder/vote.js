const agree = "✅";
const disagree = "❎";

module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.some(r=>["*Admin", "Banhammer"].includes(r.name)) )
    return message.reply("К сожалению, у вас нет прав на использование этого!").then(msg => msg.delete(5000)).then(message.delete(5000));

    const sayMessage = args.join(" ");
    message.delete();
    let msg = await message.channel.send(`Голосование: ${sayMessage}`);
    await msg.react(agree);
    await msg.react(disagree);

    const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 30000});
    message.channel.send(`Голосование закончилось!\n${sayMessage}\nРезультат: \n${agree}: ${reactions.get(agree).count-1}\n${disagree}: ${reactions.get(disagree).count-1}`);
}

module.exports.help = {
    name: "vote"
}