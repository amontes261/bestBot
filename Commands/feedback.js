
////////////////////////////////////////////////
//// feedback.js – JavaScript x DiscordJS //////
//// Alex Montes  –––––  @a.montes28#4501 //////
////////////////////////////////////////////////

function feedbackSwitch(message, Discord, fs, msgSplit, errFile, client){
    
 /* - Function feedbackSwitchSwitch() was designed to ONLY be called from file main.js

    - Can be used across any server, meant to aid in bot development

    - Was designed to be triggered via command: !feedback

    - Try !feedback help to have the bot to provide a usage message */
    
    var data;
    try{ // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/feedback.json"));
    }
    catch (e){
        errFile.unexpectedErr(message, Discord, msgSplit, "feedback", client);
        return;
    }

    if (msgSplit.length <= 2) // Incorrect command usage message //
        errFile.feedback(message, Discord);
    else{
        if (msgSplit[1] == 'feature'){ // Case: User wants to recommend a new feature //
            var description = '';
            for (var i = 2; i < msgSplit.length; i++){
                description += msgSplit[i];
                if (i != msgSplit.length - 1)
                    description += ' ';  // Get entire entry from message //
            }
            data["info"].featureCount += 1;
            var timestamp = new Date();
            var stampString = (timestamp.getMonth() + 1) + "/" + timestamp.getDate() + "/" + timestamp.getFullYear() + ', ' + timestamp.toLocaleTimeString('en-US');

            data["feature"][data["info"].featureCount.toString()] = { // Store new entry //
                "Feature": description,
                "Server Requested On": message.guild.name,
                "Timestamp": stampString,
                "Requested By": {
                    "Username": message.author.tag,
                    "Nickname": message.guild.members.cache.get(message.author.id).displayName,
                    "User ID": message.author.id
                }
            }
            
            fs.writeFileSync('Data_Management/feedback.json', JSON.stringify(data));
                // Shouldn't fail if it's already gotten this far //
            
            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('00C500') // green
                .setTitle('Feature Requested')
                .setDescription(`Your feature request has been recorded.\n Thanks for helping make ${message.guild.members.cache.get("502354442054664192").displayName} even better.`)
                .setTimestamp()
                .setFooter(`Feature requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

            message.channel.send(embeddedMsg);
        }
        else if (msgSplit[1] == 'bug'){ // Case: User wants to report a bug //

            var description = '';
                for (var i = 2; i < msgSplit.length; i++){
                    description += msgSplit[i];
                    if (i != msgSplit.length - 1)
                        description += ' ';
                }
            data["info"].bugCount += 1;
            var timestamp = new Date();
            var stampString = (timestamp.getMonth() + 1) + "/" + timestamp.getDate() + "/" + timestamp.getFullYear() + ', ' + timestamp.toLocaleTimeString('en-US');

            data["bug"][data["info"].bugCount.toString()] = { // Store new entry //
                "Bug": description,
                "Server Reported On": message.guild.name,
                "Timestamp": stampString,
                "Reported By": {
                    "Username": message.author.tag,
                    "Nickname": message.guild.members.cache.get(message.author.id).displayName,
                    "User ID": message.author.id
                }
            }
            
            fs.writeFileSync('Data_Management/feedback.json', JSON.stringify(data));
                // Shouldn't fail if it's already gotten this far //

            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('00C500') // green
                .setTitle('Bug Reported')
                .setDescription(`Your bug report has been recorded.\n Thanks for helping make ${message.guild.members.cache.get("502354442054664192").displayName} even better.`)
                .setTimestamp()
                .setFooter(`Bug reported by ${message.guild.members.cache.get(message.author.id).displayName}`);

            message.channel.send(embeddedMsg);
            message.delete();
        }
        else if (msgSplit[1] == 'change'){ // Case: User wants to recommend a change //
                var description = '';
                for (var i = 2; i < msgSplit.length; i++){
                    description += msgSplit[i];
                    if (i != msgSplit.length - 1)
                        description += ' ';  // Get entire entry from message //
                }
                data["info"].changeCount += 1;
                var timestamp = new Date();
                var stampString = (timestamp.getMonth() + 1) + "/" + timestamp.getDate() + "/" + timestamp.getFullYear() + ', ' + timestamp.toLocaleTimeString('en-US');
    
                data["changes"][data["info"].changeCount.toString()] = { // Store new entry //
                    "Change": description,
                    "Server Recommended On": message.guild.name,
                    "Timestamp": stampString,
                    "Recommended By": {
                        "Username": message.author.tag,
                        "Nickname": message.guild.members.cache.get(message.author.id).displayName,
                        "User ID": message.author.id
                    }
                }
                
                fs.writeFileSync('Data_Management/feedback.json', JSON.stringify(data));
                    // Shouldn't fail if it's already gotten this far //
                
                const embeddedMsg = new Discord.MessageEmbed()
                    .setColor('00C500') // green
                    .setTitle('Change Recommended')
                    .setDescription(`Your change recommendation has been recorded.\n Thanks for helping make ${message.guild.members.cache.get("502354442054664192").displayName} even better.`)
                    .setTimestamp()
                    .setFooter(`Change recommended by ${message.guild.members.cache.get(message.author.id).displayName}`);
    
                message.channel.send(embeddedMsg);
            }
        else{
            errFile.feedback(message, Discord);
        }
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { feedbackSwitch };