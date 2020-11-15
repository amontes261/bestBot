async function stopSwitch(message, Discord, errFile, client){
    if (message.author.id != "403355889253220352"){
        errFile.permissionDenied(message);
    }
    else{
        const reply = new Discord.MessageEmbed()
            .setColor('C80000')
            .setTitle('Shutdown Command Received')
            .setDescription('React with the  ✅  emoji below to confirm the shutdown.\nReact with the  ❌  emoji to cancel the shutdown.')
            .setTimestamp()
            .setFooter(`Shutdown requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

        const cancelledMsg = new Discord.MessageEmbed()
            .setColor('C80000')
            .setTitle('Shutdown Command Cancelled')
            // .setDescription('React with the  ✅  emoji below to confirm the shutdown.\nReact with the  ❌  emoji to cancel the shutdown.')
            .setTimestamp()
            .setFooter(`Shutdown originally requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

        const shutdownMsg = new Discord.MessageEmbed()
            .setColor('00C500')
            .setTitle('Bot Shutdown Successful')
            // .setDescription('React with the  ✅  emoji below to confirm the shutdown.\nReact with the  ❌  emoji to cancel the shutdown.')
            .setTimestamp()
            .setFooter(`Shutdown by ${message.guild.members.cache.get(message.author.id).displayName}`);

        var shutdown = false;
        
        await message.channel.send(reply).then(msg => {
            msg.react('✅');
            msg.react('❌');
            
            msg.awaitReactions((reaction, user) => user.id == "403355889253220352" && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
            { max: 1, time: 15000 }).then( async collected => {
                if (collected.first().emoji.name == '✅') {
                    await message.channel.send(shutdownMsg);
                    await message.delete();
                    await msg.delete();
                    client.destroy();
                }
                else{
                    message.channel.send(cancelledMsg);
                    message.delete();
                    msg.delete();
                }
            });
        });
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { stopSwitch };