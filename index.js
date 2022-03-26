const discord = require("discord.js");
require("dotenv").config();

const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.username}`);
})

client.on("messageCreate", async message => {
    const prefix = process.env.PREFIX;
    if(message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    // Command Handler

    try {
        delete require.cache[require.resolve(`../commands/${cmd}.js`)];

        const command_file = require(`../commands/${cmd}.js`);

        command_file.run(client, message, args);
    } catch (error){
        
    }
})


client.login(process.env.TOKEN);