const { client } = require("../index.js");

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.username}`);
})
