const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

    //!8ball <вопрос>
    if(!args[1]) return message.reply("А вопрос задать?").then(msg => msg.delete(5000)).then(message.delete(5000));
    let replies = [
        "Да.", 
        "Нет.", 
        "Я не знаю.", 
        "Я знаю точно что дед гей", 
        "Возможно", 
        "Скорее всего", 
        "А ты как думаешь?", 
        "99%", 
        "-2см", 
        "А ты знаешь?", 
        "Задай еще раз вопрос", 
        "Звёзды не сошлись",
        "Нет, даже не думай",
        "А я смотрю ты из этих, да?",
        "Такие вопросы задают только геи",
        "Я думаю что нет",
        "Я думаю что да",
        "Дед знает",
        "Я смотрю ты быдло?",
        "Тебе в**бать?",
        "А ты любишь нюхать?",
        "Тебе что моча в голову ударила?",
        "Стил гей",
        "А ты подписан на инстаграм Павера? (@CYGDK)",
        "Не прав ты, Петя, ой, не прав…",
        ""
    ];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let ballembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setColor("#FF9900")
        .addField("Вопрос", question)
        .addField("Ответ", replies[result]);
    
    message.delete();
    message.channel.send(ballembed).then(msg => msg.delete(15000));
}

module.exports.help = {
    name: "ask",
}