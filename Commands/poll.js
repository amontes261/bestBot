
function pollSwitch(message, msgSplit, Discord, errFile){
    var selections = [];
    var pollTitle = "A poll";

    if (msgSplit.length == 1){
        errFile.poll(message);
        return;
    }
    else if (msgSplit.length == 2){
        errFile.poll(message);
        return;
    }
    else if (msgSplit.length == 3){
        message.channel.send(`<@${message.author.id}> come on. A poll with ONE selection??`)
        errFile.poll(message);
        return;
    }
    else{
        var i = 1;
        while (i != msgSplit.length ){
            var newWord = '';
            var started = false;
            var isTitle = false;
            var done = false;
            while (!done){
                if (msgSplit[i][0] == '[' && msgSplit[i][msgSplit[i].length - 1] == ']'){
                    newWord = newWord + msgSplit[i];
                    done = true;
                    //console.log("reached3");
                }
                else if (msgSplit[i][0] == '{' && msgSplit[i][msgSplit[i].length - 1] == '}'){
                    newWord = newWord + msgSplit[i];
                    done = true;
                    isTitle = true;
                    //console.log("reached4");
                }
                else if (msgSplit[i][0] == '['){
                    newWord = newWord + msgSplit[i] + ' ';
                    started = true;
                    //console.log("reached1");
                }
                else if (msgSplit[i][0] == '{'){
                    newWord = newWord + msgSplit[i] + ' ';
                    started = true;
                    isTitle = true;
                    //console.log("reached2");
                }
                else if (msgSplit[i][msgSplit[i].length - 1] == ']' || msgSplit[i][msgSplit[i].length - 1] == '}'){
                    newWord = newWord + msgSplit[i];
                    done = true;
                    //console.log("reached5");
                }
                else if (started){
                    newWord = newWord + msgSplit[i] + ' ';
                    //console.log("reached6");
                }
                else if (!started){
                    console.log("failed at !started");
                    errFile.poll(message);
                    return;
                }
                i++
            }

            if (isTitle)
                pollTitle = newWord;
            else
                selections.push(newWord.substring(1, newWord.length - 1) );
        }
            /*
            if (msgSplit[i][0] == '['){

            }
            */
    }

    if (selections.length == 0){
        errFile.poll(message);
        return;
    }

    //console.log(selections);
    //console.log(selections.length);
    pollTitle = pollTitle[1].toUpperCase() + pollTitle.substring(2, pollTitle.length - 1);

    const reply = new Discord.MessageEmbed()
	.setColor('00CBFF')
    .setTitle(pollTitle)
    
    var description = 'React below to vote:\n';
    var letters = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲",
                   "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿", "❔"];
    for (var i = 0; i < selections.length; i++){
        selections[i] = selections[i].charAt(0).toUpperCase() + selections[i].substring(1, selections[i].length);
    }
    
    for (var i = 0; i < selections.length; i++){
        description = description + `${letters[i]} - **${selections[i]}**\n\n`
    }

    description = description + `${letters[letters.length - 1]} - **Indifferent**\n`

    reply.setDescription(description)
	// reply.addField('Inline field title', 'Some value here', true)
	.setTimestamp()
	.setFooter(`Poll requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(reply).then(msg => {
        for (var i = 0; i < selections.length; i++){
            msg.react(letters[i]);
        }
        msg.react(letters[letters.length - 1]);        
    })

    message.delete();
    
}

// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { pollSwitch };