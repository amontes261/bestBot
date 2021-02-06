
////////////////////////////////////////////
//// avatar.js – JavaScript x DiscordJS ////
//// Alex Montes  –––  @a.montes28#4501 ////
////////////////////////////////////////////

function avatarSwitch(message, Discord, msgSplit, errFile){

 /* - Function avatarSwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic command – usable on any server

    - Was designed to be triggered via command: !avatar

    - Try !avatar help to have the bot to provide a usage message */

    if (msgSplit.length == 1) // Execute send user avatar command //
        message.channel.send(message.author.avatarURL( { format: 'jpg', size: 2048 } ) );
    else if (msgSplit.length == 2){
        if (msgSplit[1] == 'help') // Command usage message requested //
            errFile.avatar(message, Discord);
        else if (msgSplit[1].length == 22 && message.mentions.users.size == 1) // Execute send tagged-user avatar command //
            message.channel.send(message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).user.avatarURL( { format: 'jpg', size: 2048 } ) );
        else if (message.mentions.users.size > 1) // Incorrect command usage message //
            errFile.avatar(message, Discord);
        else  // Incorrect parameter or argument message //
            errFile.tagSecondArgServer(message);
    }
    else  // Incorrect command usage message //
        errFile.avatar(message, Discord);
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { avatarSwitch };