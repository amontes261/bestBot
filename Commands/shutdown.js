async function shutdownSwitch(message, Discord, errFile, client){
    if (message.author.id != "403355889253220352"){
        errFile.permissionDenied(message);
    }
    else{
        const reply = new Discord.MessageEmbed()
            .setColor('EFEF00') // yellow
            .setTitle('Shutdown Command Received')
            .setDescription('React with the  ✅  emoji below to confirm the shutdown.\nReact with the  ❌  emoji to cancel the shutdown.')
            .setTimestamp()
            .setFooter(`Shutdown requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

        const cancelledMsg = new Discord.MessageEmbed()
            .setColor('C80000') // red
            .setTitle('Shutdown Cancelled')
            // .setDescription('React with the  ✅  emoji below to confirm the shutdown.\nReact with the  ❌  emoji to cancel the shutdown.')
            .setTimestamp()
            .setFooter(`Shutdown originally requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

        const shutdownMsg = new Discord.MessageEmbed()
            .setColor('00C500') //green 
            .setTitle('Shutdown Successful')
            // .setDescription('React with the  ✅  emoji below to confirm the shutdown.\nReact with the  ❌  emoji to cancel the shutdown.')
            .setTimestamp()
            .setFooter(`Shutdown by ${message.guild.members.cache.get(message.author.id).displayName}`);
        
        await message.channel.send(reply).then(msg => {
            msg.react('✅');
            msg.react('❌');
            
            msg.awaitReactions((reaction, user) => user.id == "403355889253220352" && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
            { max: 1, time: 15000 }).then( async collected => {
                if (collected.first().emoji.name == '✅') {
                    await message.channel.send(shutdownMsg);
                    await message.delete();
                    await msg.delete();

                    var chromozone = client.guilds.cache.get("404413479915880448");
                    if (chromozone != undefined && chromozone != null){
                        
                        var clientLogChannel = chromozone.channels.cache.get("772647489798537236");
                        const logShutdownMsg = new Discord.MessageEmbed()
                            .setColor('C80000') // red 
                            .setTitle('Bot Shutdown')
                            .setTimestamp()
                            
                        await clientLogChannel.send(logShutdownMsg);
                    }

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

module.exports = { shutdownSwitch };