
function avatarSwitch(message, Discord, msgSplit, errFile){
    if (msgSplit.length == 1)
        message.channel.send(message.author.avatarURL( { format: 'jpg', size: 2048 } ) );
    else if (msgSplit.length == 2){
        if (msgSplit[1].length == 22 && message.mentions.users.size != 1)
            errFile.tagSecondArgServer(message);
        else if (message.mentions.users.size != 1)
            errFile.avatar(message, Discord);
        else
            message.channel.send(message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).user.avatarURL( { format: 'jpg', size: 2048 } ) );
    }
    else
        errFile.avatar(message, Discord);
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { avatarSwitch };