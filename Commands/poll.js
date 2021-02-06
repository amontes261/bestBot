
////////////////////////////////////////////
//// poll.js – JavaScript x DiscordJS //////
//// Alex Montes ––– @a.montes28#4501 //////
////////////////////////////////////////////

function pollSwitch(message, msgSplit, Discord, errFile){

 /* - Function pollSwitch() was designed to ONLY be called from file main.js

    - Poll creator command – usable on any server

    - Was designed to be triggered via command: !poll

    - Try !poll help to have the bot to provide a usage message */
    
    errFile.disabled(message, Discord, 'poll');
    return;


    var selections = [];
    var pollTitle = `${message.guild.members.cache.get(message.author.id).displayName}'s Poll`;

    if (msgSplit.length == 1){
        errFile.poll(message, Discord);
        return;
    }
    else if (msgSplit.length == 2 && msgSplit[1][0] == '['){
        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('C80000') // red
            .setTitle(`Poll Creation Failed`)
            .setDescription(`Come on. A poll with only one option?\nAdd more options to create a poll.\nTry __!poll help__ for usage help.`)
            .setTimestamp()
            .setFooter(`Poll requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
        return;
    }
    else if (msgSplit.length == 3){
        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('C80000') // red
            .setTitle(`Poll Creation Failed`)
            .setDescription(`Come on. A poll with only one option?\nAdd more options to create a poll.\nTry __!poll help__ for usage help.`)
            .setTimestamp()
            .setFooter(`Poll requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
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
                }
                else if (msgSplit[i][0] == '{' && msgSplit[i][msgSplit[i].length - 1] == '}'){
                    newWord = newWord + msgSplit[i];
                    done = true;
                    isTitle = true;
                }
                else if (msgSplit[i][0] == '['){
                    newWord = newWord + msgSplit[i] + ' ';
                    started = true;
                }
                else if (msgSplit[i][0] == '{'){
                    newWord = newWord + msgSplit[i] + ' ';
                    started = true;
                    isTitle = true;
                }
                else if (msgSplit[i][msgSplit[i].length - 1] == ']' || msgSplit[i][msgSplit[i].length - 1] == '}'){
                    newWord = newWord + msgSplit[i];
                    done = true;
                }
                else if (started){
                    newWord = newWord + msgSplit[i] + ' ';
                }
                else if (!started){
                    errFile.poll(message, Discord);
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