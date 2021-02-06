
////////////////////////////////////////////
//// ping.js – JavaScript x DiscordJS //////
//// Alex Montes ––– @a.montes28#4501 //////
////////////////////////////////////////////

function pingSwitch(message, Discord, msgSplit, errFile){

 /* - Function pingSwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic, ease-of-life command – usable on any server

    - Was designed to be triggered via command: !ping

    - Try !ping help to have the bot to provide a usage message */
        
    if (msgSplit.length != 1) // Command usage message requested OR Incorrect command usage message //
        errFile.ping(message, Discord);

    // Calculate Ping //
    var time = new Date().getTime();
    var ping = time - message.createdTimestamp;

    const embeddedMsg = new Discord.MessageEmbed()
    .setColor('#00C500') // green
    .setTitle('Pong!')
    .setDescription(`Your message was recieved in ${ping}ms.\nServer Region: ${message.guild.region}`)
    .setTimestamp()
    .setFooter(`Ping sent by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { pingSwitch };