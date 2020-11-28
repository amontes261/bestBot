
function googleSwitch(message, Discord, msgSplitUpper, errFile){
    if (msgSplitUpper.length == 1)  {
        errFile.google(message, Discord);
        return;
    }
    else if (msgSplitUpper.length == 2){
        if (msgSplitUpper[1] == 'help'){
            errFile.google(message, Discord);
            return;
        }
    }
    var query = '';
    var linkAppend = '';
    for (var i = 1; i < msgSplitUpper.length; i++){
        linkAppend += msgSplitUpper[i];
        query += msgSplitUpper[i];
        if (i != msgSplitUpper.length - 1){
            linkAppend += '+';
            query += ' ';
        }
    }
    var link = "https://www.google.com/search?hl=en&source=hp&q=" + linkAppend;
    
    const embeddedMsg = new Discord.MessageEmbed()
        .setColor('#0099ff') // light blue
        .setTitle('Click Here to Redirect to a Google Search')
        .setURL(link)
        // .setDescription('**'+query+'**')
        .addField('**Search query:**', '- ' + query, false)
        .setTimestamp()
        .setFooter(`Google search quick-link requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
    message.delete();

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