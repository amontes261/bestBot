
////////////////////////////////////////////
//// repo.js – JavaScript x DiscordJS //////
//// Alex Montes ––– @a.montes28#4501 //////
////////////////////////////////////////////

function repoSwitch(message, Discord, msgSplit, errFile){

/* - Function repoSwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic, ease-of-life command – usable on any server

    - Was designed to be triggered via command: !repo

    - Try !repo help to have the bot to provide a usage message */
    if (msgSplit.length != 1){
        errFile.repo(message, Discord);
        return;
    }
    const embeddedMsg = new Discord.MessageEmbed()
            .setColor('#0099ff') // light blue  
            .setTitle(`Click Here to Redirect to the ${message.guild.members.cache.get("502354442054664192").displayName} Repository`)
            .setURL('https://github.com/amontes261/bestBot')
            .setTimestamp()
            .setFooter(`Repository link requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { repoSwitch };