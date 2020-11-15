
function silenceSwitch(message, Discord, msgSplit, errFile){
    if (msgSplit.length != 2){
        errFile.silence(message, Discord);
    }
    else{
        const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
        if (msgSplit[1].length == 22){
            if (message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).voice.channelID == null){
                embeddedMsg.setColor('C80000'); // red
                embeddedMsg.setTitle(`Unable to silence ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName}`);
                embeddedMsg.setDescription(`${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName} is not in a voice channel`);
                embeddedMsg.setFooter(`Silence attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(embeddedMsg);
                return;
            }
            var userVoice = message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).voice;
            if (userVoice.selfMute){ //local muted
                embeddedMsg.setColor('C80000'); // red
                embeddedMsg.setTitle(`Unable to silence ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName}`);
                embeddedMsg.setDescription(`${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName} is already local muted`)
                embeddedMsg.setFooter(`Silence attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            else if (userVoice.mute && !userVoice.selfMute){ // already silenced
                userVoice.setMute(false);
                embeddedMsg.setColor('00C500'); // green
                embeddedMsg.setTitle(`Un-silenced ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName}`);
                embeddedMsg.setFooter(`Unmuted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            else{
                userVoice.setMute(true);
                embeddedMsg.setColor('00C500'); // green
                embeddedMsg.setTitle(`Silenced ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName}`);
                embeddedMsg.setFooter(`Muted by ${message.guild.members.cache.get(message.author.id).displayName}`);
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

module.exports = { silenceSwitch };