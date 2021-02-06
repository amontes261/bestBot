
/////////////////////////////////////////////
//// chegg.js – JavaScript x DiscordJS //////
//// Alex Montes  ––  @a.montes28#4501 //////
/////////////////////////////////////////////

function cheggSwitch(message, Discord, msgSplitUpper, errFile){

 /* - Function cheggSwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic, ease-of-life command – usable on any server

    - Was designed to be triggered via command: !chegg

    - Try !chegg help to have the bot to provide a usage message */
    
    if (msgSplitUpper.length == 1){ // Incorrect command usage message //
        errFile.chegg(message, Discord);
        return;
    }
    else if (msgSplitUpper.length == 2 && msgSplitUpper[1] == 'help'){ // Command usage message requested //
        errFile.chegg(message, Discord);
        return;
    }

    var query = '';
    var linkAppend = '';
    for (var i = 1; i < msgSplitUpper.length; i++){
        linkAppend += msgSplitUpper[i];
        query += msgSplitUpper[i];
        if (i != msgSplitUpper.length - 1){
            linkAppend += '%20'; // Get entire query from message //
            query += ' ';
        }
    }
    var link = `https://www.chegg.com/search/${linkAppend}/study#p=1`;
    
    const embeddedMsg = new Discord.MessageEmbed()
        .setColor('#FF7500') // Special - Chegg Orange
        .setTitle('Click Here to Redirect to a Chegg Study Search')
        .setURL(link)
        .addField('**Search query:**', '- ' + query, false)
        .setTimestamp()
        .setFooter(`Chegg search quick-link requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

        message.channel.send(embeddedMsg); // Send final output message //
        message.delete(); // Delete user input message //
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { cheggSwitch };