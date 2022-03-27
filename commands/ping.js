const { Message, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) =>{


    const embed = new MessageEmbed()
    .setColor("DARKER_GREY")
    .setDescription(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);

    return message.channel.send({ embeds: [embed]});
}