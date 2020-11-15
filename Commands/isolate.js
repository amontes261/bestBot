
function isolateSwitch(message, Discord, msgSplit, errFile){
    if (msgSplit.length != 2){
        errFile.silence(message, Discord);
    }
    else{
        const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
        if (msgSplit[1].length == 22){
            if (message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).voice.channelID == null){
                embeddedMsg.setColor('C80000'); // red
                embeddedMsg.setTitle(`Unable to isolate ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName}`);
                embeddedMsg.setDescription(`User ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName} is not in a voice channel`)
                embeddedMsg.setFooter(`Isolation attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(embeddedMsg);
                return;
            }
            var userVoice = message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).voice;
            if (userVoice.selfMute && userVoice.selfDeaf){ //local deafened
                embeddedMsg.setColor('C80000'); // red
                embeddedMsg.setTitle(`Unable to isolate ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName}`);
                embeddedMsg.setDescription(`User ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName} is already local muted & deafened.\nThere's no point in a server-mute and deafen.`)
                embeddedMsg.setFooter(`Isolation attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            else if ( (userVoice.mute && !userVoice.selfMute ) && (userVoice.deaf && !userVoice.selfDeaf) ){ // already isolated
                userVoice.setDeaf(false);
                userVoice.setMute(false);
                embeddedMsg.setColor('00C500'); // green
                embeddedMsg.setTitle(`Un-isolated ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName}`);
                embeddedMsg.setFooter(`Unmuted & undeafened by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            else{
                userVoice.setDeaf(true);
                userVoice.setMute(true);
                embeddedMsg.setColor('00C500'); // green
                embeddedMsg.setTitle(`Isolated ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName}`);
                embeddedMsg.setFooter(`Muted & deafened by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            message.channel.send(embeddedMsg);
            message.delete();
        }
        else
            errFile.silence(message, Discord);
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { isolateSwitch };