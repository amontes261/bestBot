
//////////////////////////////////////////////
//// google.js – JavaScript x DiscordJS //////
//// Alex Montes ––––– @a.montes28#4501 //////
//////////////////////////////////////////////

function googleSwitch(message, Discord, msgSplitUpper, errFile){

 /* - Function googleSwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic, ease-of-life command – usable on any server

    - Was designed to be triggered via command: !google

    - Try !google help to have the bot to provide a usage message */
    
    if (msgSplitUpper.length == 1){ // Incorrect command usage message //
        errFile.google(message, Discord);
        return;
    }
    else if (msgSplitUpper.length == 2 && msgSplitUpper[1].toLowerCase() == 'help'){ // Command usage message requested //
        errFile.google(message, Discord);
        return;
    }

    var query = '';
    var linkAppend = '';
    for (var i = 1; i < msgSplitUpper.length; i++){
        linkAppend += msgSplitUpper[i];
        query += msgSplitUpper[i];
        if (i != msgSplitUpper.length - 1){
            linkAppend += '+'; // Get entire query from message //
            query += ' ';
        }
    }
    var link = "https://www.google.com/search?hl=en&source=hp&q=" + linkAppend;
    
    const embeddedMsg = new Discord.MessageEmbed()
        .setColor('#0099ff') // light blue
        .setTitle('Click Here to Redirect to a Google Search')
        .setURL(link)
        .addField('**Search query:**', '- ' + query, false)
        .setTimestamp()
        .setFooter(`Google search quick-link requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg); // Send final output message //

    /*
    google.resultsPerPage = 50;
    var nextCounter = 0;
    google(textToSearch, function (err, res){
        if (err) console.error(err)
        
        for (var i = 0; i < res.links.length; i++) {
            var link = res.links[i];
            console.log (res.links);
            console.log(link.title + ' - ' + link.href)
            console.log(link.description + "\n")
        }
        
        if (nextCounter < 4) {
            nextCounter += 1
            if (res.next) res.next()
        }
    })
    */
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { googleSwitch };