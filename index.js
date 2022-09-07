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
console.log("Bot Ready...");
