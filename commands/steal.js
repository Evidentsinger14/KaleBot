const { Client, Message, MessageEmbed, Util } = require("discord.js");

module.exports.run = async (client, message, args) =>{

    const isPermitted = message.member.roles.cache.has(process.env.BOT_STAFF)
    
    if(!isPermitted){
        message.channel.send("You are not permitted to use that");
        return;
    }

    const embed = new MessageEmbed()
    .setColor("DARK_RED")
    .setDescription(":x: Incorrect format\n Correct format: " + process.env.PREFIX + "steal <Emoji>")

    if (!args.length){
    return message.channel.send({ embeds: [embed] });
    }

    for (const raw_emoji of args){
        const parsed_emoji = Util.parseEmoji(raw_emoji);
        if(parsed_emoji.id){
            const extension = parsed_emoji.animated ? ".gif" : ".png";
            const url = `https://cdn.discordapp.com/emojis/${parsed_emoji.id + extension}`;
            try {

                message.guild.emojis.create(url, parsed_emoji.name).then((emoji) => {
                    message.channel.send(`Added ${emoji.url}`);
                });

            } catch (error) {

                message.channel.send("Could not add emoji");
                return;

            }
        }
    }
}