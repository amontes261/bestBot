
async function inviteSwitch(message, Discord, msgSplit, errFile){
    if (msgSplit.length == 1){
        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('#0099ff') // light blue
            .setTitle(`Click Here To Add ${message.guild.members.cache.get("502354442054664192").displayName} To a Server`)
            .setURL('https://discord.com/api/oauth2/authorize?client_id=502354442054664192&permissions=0&scope=bot')
            .setTimestamp()
            .setFooter(`Invite link requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
        message.delete();
    }
    else if (msgSplit.length == 2){
        const embeddedMsg = new Discord.MessageEmbed()
            .setTimestamp()
        if (msgSplit[1] == "vc"){
            if (message.guild.members.cache.get(message.author.id).voice.channelID == null){
                // null
                embeddedMsg.setTitle('Voice Channel Invite Failed')
                    .setColor('C80000') // red
                    .setDescription('You must be in a voice channel to get a valid invite link.')
                    .setFooter(`Voice chat invite requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(embeddedMsg);
                message.delete();
                return;
            }
            
            let invite = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
            var URL = "https://discord.gg/" + invite;
            message.channel.send(URL);
        }
        else if (msgSplit[1] == "here"){
            let invite = await message.guild.channels.cache.get(message.channel.id).createInvite();
            var URL = "https://discord.gg/" + invite;
            message.channel.send(URL);
        }
        else if (msgSplit[1] == "toserver"){
            let invite = await message.guild.channels.cache.get(message.channel.id).createInvite();
            var URL = "https://discord.gg/mneh5cBkC9";
            message.channel.send(URL);
        }
        else{
            errFile.invite(message, Discord);
        }
    }
    else{
        errFile.invite(message, Discord);
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { inviteSwitch };