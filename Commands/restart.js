
///////////////////////////////////////////////
//// restart.js – JavaScript x DiscordJS //////
//// Alex Montes –––––– @a.montes28#4501 //////
///////////////////////////////////////////////

async function restartSwitch(message, Discord, errFile, login, client){
        
/* - Asynchronous function restartSwitch() was designed to ONLY be called from file main.js

    - Meant to be able to remotely restart the bot down

    - Was designed to be triggered via command: !restart

    - This command will likely be depreciated */
    
    errFile.depreciated(message, Discord, 'restart');
	return;
    const reply = new Discord.MessageEmbed()
        .setColor('EFEF00') // yellow
        .setTitle('Restart Command Received')
        .setDescription('React with the  ✅  emoji below to confirm the restart.\nReact with the  ❌  emoji to cancel the restart.')
        .setTimestamp()
        .setFooter(`Restart requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    const cancelledMsg = new Discord.MessageEmbed()
        .setColor('C80000') // red
        .setTitle('Restart Cancelled')
        // .setDescription('React with the  ✅  emoji below to confirm the shutdown.\nReact with the  ❌  emoji to cancel the shutdown.')
        .setTimestamp()
        .setFooter(`Restart originally requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    const restartMsg = new Discord.MessageEmbed()
        .setColor('00C500') //green 
        .setTitle('🔄 Restarted')
        // .setDescription('React with the  ✅  emoji below to confirm the shutdown.\nReact with the  ❌  emoji to cancel the shutdown.')
        .setTimestamp()
        .setFooter(`Restarted by ${message.guild.members.cache.get(message.author.id).displayName}`);

    await message.channel.send(reply).then(msg => {
        msg.react('✅');
        msg.react('❌');
        
        msg.awaitReactions((reaction, user) => (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
        { max: 1, time: 15000 }).then( async collected => {
            if (collected.first().emoji.name == '✅') {
                await msg.delete();
                await client.login(login);
                await message.channel.send(restartMsg)
                    .then(client.destroy());
                
            }
            else{
                message.channel.send(cancelledMsg);
                msg.delete();
            }
        });
    });
}



// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { restartSwitch };