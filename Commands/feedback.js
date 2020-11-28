
function feedbackSwitch(message, Discord, fs, msgSplit, errFile){
    let data = JSON.parse(fs.readFileSync("Data_Management/feedback.json"));

    if (msgSplit.length <= 2){
        errFile.feedback(message, Discord);
    }
    else{
        if (msgSplit[1] == 'feature'){
            var description = '';
            for (var i = 2; i < msgSplit.length; i++){
                description += msgSplit[i];
                if (i != msgSplit.length - 1)
                    description += ' ';
            }
            var featureID = data["info"].featureCount;
            featureID += 1;
            data["info"].featureCount = featureID;
            var timestamp = new Date();
            var stampString = (timestamp.getMonth() + 1) + "/" + timestamp.getDate() + "/" + timestamp.getFullYear() + ', ' + timestamp.toLocaleTimeString('en-US');

            data["feature"][featureID.toString()] = {"feature": description, "requestorNickname": message.guild.members.cache.get(message.author.id).displayName, "requestorID": message.author.id, "timestamp": stampString};
            fs.writeFileSync('Data_Management/feedback.json', JSON.stringify(data));

            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('00C500') // green
                .setTitle('Feature Requested')
                .setDescription(`Your feature request has been recorded.\n Thanks for helping make ${message.guild.members.cache.get("502354442054664192").displayName} better.`)
                .setTimestamp()
                .setFooter(`Feature requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

            message.channel.send(embeddedMsg);
            message.delete();
        }
        else if (msgSplit[1] == 'bug'){

            var description = '';
                for (var i = 2; i < msgSplit.length; i++){
                    description += msgSplit[i];
                    if (i != msgSplit.length - 1)
                        description += ' ';
                }
            var bugID = data["info"].bugCount;
            bugID += 1;
            data["info"].bugCount = bugID;
            var timestamp = new Date();
            var stampString = (timestamp.getMonth() + 1) + "/" + timestamp.getDate() + "/" + timestamp.getFullYear() + ', ' + timestamp.toLocaleTimeString('en-US');

            data["bug"][bugID.toString()] = {"bug": description, "reporterNickname": message.guild.members.cache.get(message.author.id).displayName, "reporterID": message.author.id, "timestamp": stampString};
            fs.writeFileSync('Data_Management/feedback.json', JSON.stringify(data));

            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('00C500') // green
                .setTitle('Bug Reported')
                .setDescription(`Your bug report has been recorded.\n Thanks for helping make ${message.guild.members.cache.get("502354442054664192").displayName} better.`)
                .setTimestamp()
                .setFooter(`Bug reported by ${message.guild.members.cache.get(message.author.id).displayName}`);

            message.channel.send(embeddedMsg);
            message.delete();
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