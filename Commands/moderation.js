
function banSwitch(message, Discord, fs, msgSplit, errFile){
    if (msgSplit[1].substring(3, msgSplit[1].length - 1) == "403355889253220352"){
        message.reply("This user can not be banned.")
    }
    else if (msgSplit[1].substring(3, msgSplit[1].length - 1) == message.author.id){
        message.reply("You can't ban yourself.")
    }
    else if (message.guild.id == "404413479915880448"){
        if (!( message.guild.members.cache.get(message.author.id).roles.cache.has("759957753014910996") || message.guild.members.cache.get(message.author.id).roles.cache.has("759958084301881364") || message.guild.members.cache.get(message.author.id).roles.cache.has("759957917154934784") ) )
            errFile.permissionDenied(message);
        else{
            //get the code that finds the reason
            runBanCommand(message, Discord, msgSplit[1].substring(3, msgSplit[1].length - 1) );
        }
    }
    else{
        runBanCommand(message, Discord, msgSplit[1].substring(3, msgSplit[1].length - 1) );
    }
}

function kickSwitch(message, Discord, fs, msgSplit, errFile){
    
}

function unbanSwitch(message, Discord, fs, msgSplit, errFile){
    
}

async function runBanCommand(message, Discord, userID){
    const reply = new Discord.MessageEmbed()
        .setColor('EFEF00') // yellow
        .setTitle(`Ban ${message.guild.members.cache.get(userID).displayName}?`)
        .setDescription('React with the  ✅  emoji below to confirm the ban.\nReact with the  ❌  emoji to cancel the ban.')
        .setTimestamp()
        .setFooter(`Ban requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    const cancelledMsg = new Discord.MessageEmbed()
        .setColor('C80000') // red
        .setTitle('Ban Cancelled')
        // .setDescription('React with the  ✅  emoji below to confirm the shutdown.\nReact with the  ❌  emoji to cancel the shutdown.')
        .setTimestamp()
        .setFooter(`${message.guild.members.cache.get(userID).displayName} ban originally attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);

    const banMsg = new Discord.MessageEmbed()
        .setColor('00C500') //green 
        .setTitle(`Banned ${message.guild.members.cache.get(userID).displayName}.`)
        // .setDescription('React with the  ✅  emoji below to confirm the shutdown.\nReact with the  ❌  emoji to cancel the shutdown.')
        .setTimestamp()
        .setFooter(`Banned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    await message.channel.send(reply).then(msg => {
        msg.react('✅');
        msg.react('❌');
        
        msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
        { max: 1, time: 15000 }).then( async collected => {
            if (collected.first().emoji.name == '✅') {
                await message.channel.send(banMsg);
                await message.delete();
                await msg.delete();
            }
            else{
                message.channel.send(cancelledMsg);
                message.delete();
                msg.delete();
            }
        });
    });
}



// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { banSwitch, kickSwitch, unbanSwitch };