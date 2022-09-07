const Discord = require("discord.js");
require("dotenv").config();
const fs = require("fs");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

module.exports.client = client; 

client.events = new Discord.Collection();

// Event Handler
fs.readdirSync("./events/").forEach(file => {
    var jsFiles = fs.readdirSync("./events/").filter(f => f.split(".").pop() === "js");
    if ( jsFiles.length <= 0 ) return console.log("[EVENT HANDLER] - Can't find any events.");
    let check = false;
    jsFiles.forEach(event => {
        const eventGet = require(`./events/${event}`);
        try{
            client.events.set(eventGet.name, eventGet);
        } catch (error) {
            return console.error(error);
        }
    })
});




client.login(process.env.TOKEN);
console.log("Bot Loaded...");


// client.on("messageCreate", async message => {
//     const prefix = process.env.PREFIX;
//     if(message.author.bot || !message.content.startsWith(prefix)) return;
//     const args = message.content.slice(prefix.length).split(/ +/);
//     const cmd = args.shift().toLowerCase();

//     // Command Handler

//     try {
//         delete require.cache[require.resolve(`../commands/${cmd}.js`)];

//         const command_file = require(`../commands/${cmd}.js`);

//         command_file.run(client, message, args);
//     } catch (error){
        
//     }
// })
