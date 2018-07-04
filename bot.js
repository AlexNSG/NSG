const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");

const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.ratelimits = new Discord.Collection();
bot.mutes = require("./mutes.json");

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("Ни одной общей команды не загружено!");
        return;
    }

    console.log(`Загружено ${jsfiles.length} общих команд!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} загружен!`)
        bot.commands.set(props.help.name, props);
    });
})
fs.readdir("./cmds/music/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("Ни одной музыкальной команды не загружено!");
        return;
    }

    console.log(`Загружено ${jsfiles.length} музыкальных команд!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/music/${f}`);
        console.log(`${i + 1}: ${f} загружен!`)
        bot.commands.set(props.help.name, props);
    });
})
fs.readdir("./cmds/moder/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("Ни одной модераторской команды не загружено!");
        return;
    }

    console.log(`Загружено ${jsfiles.length} модераторских команд!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/moder/${f}`);
        console.log(`${i + 1}: ${f} загружен!`)
        bot.commands.set(props.help.name, props);
    });
})
fs.readdir("./cmds/fun/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("Ни одной фановой команды не загружено!");
        return;
    }

    console.log(`Загружено ${jsfiles.length} фановых команд!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/fun/${f}`);
        console.log(`${i + 1}: ${f} загружен!`)
        bot.commands.set(props.help.name, props);
    });
})

bot.on("ready", async () => {
    console.log(`${bot.user.username} онлайн на ${bot.guilds.size} серверах!`);
    bot.user.setActivity("стрим Russia Paver", {type: "WATCHING"});

    bot.setInterval(() => {
        for(let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let guildId = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildId);
            let member = guild.members.get(i);
            let mutedRole = guild.roles.find(r => r.name === "muted");
            if(!mutedRole) continue;

            if(Date.now() > time) {
                console.log(`${i} теперь может писать в чат!`);

                member.removeRole(mutedRole);
                delete bot.mutes[i];

                fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
                    if(err) throw err;
                    console.log(`Размутил ${member.user.tag}.`);
                });
            }
        }
    }, 5000)
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);
});

bot.login(process.env.BOT_TOKEN);