
function amongusSwitch(message, Discord, msgSplit, errFile){
    if (message.guild.id != '404413479915880448'){
        message.channel.send(errFile.onlyOnChromozone(message) );
        return;
    }

    var aliveID = '759983927363371019';
    var deadID = '772986083428270132';
    if (msgSplit.length == 1)
        errFile.amongus(message, Discord);
    else if (msgSplit.length == 2){
        const embeddedMsg = new Discord.MessageEmbed()
        if (msgSplit[1] == 'deadmove'){
            // console.log (message.guild.channels.cache.get(deadID).members.size);
            // move all back
            if (message.guild.channels.cache.get(deadID).members.size == 0){
                embeddedMsg.setColor('C80000') // red
                embeddedMsg.setTitle('Amongus Deadmove Failed')
                embeddedMsg.setDescription('There are no users in the Among Us (DEAD) voice channel')
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Amongus deadmove attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            else{
                message.guild.channels.cache.get(deadID).members.forEach((member) => {
                    member.voice.setChannel(aliveID);
                    member.voice.setMute(true);
                });
                    embeddedMsg.setColor('00C500') // green
                    embeddedMsg.setTitle('Amongus Deadmove')
                    if (message.guild.channels.cache.get(deadID).members.size == 1)
                        embeddedMsg.setDescription('Moved 1 member from the Among Us (DEAD) voice channel')
                    else
                        embeddedMsg.setDescription(`Moved ${message.guild.channels.cache.get(deadID).members.size} members from the Among Us (DEAD) voice channel`)
                    embeddedMsg.setTimestamp()
                    embeddedMsg.setFooter(`Amongus deadmove requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            message.channel.send(embeddedMsg);
            message.delete();
        }
        else if (msgSplit[1] == 'deadmeeting'){
            // call dead ppl meeting
            if (message.guild.channels.cache.get(aliveID).members.size == 0){
                embeddedMsg.setColor('C80000') // red
                embeddedMsg.setTitle('Amongus Deadmeeting Failed')
                embeddedMsg.setDescription('There are no users in the Among Us (ALIVE) voice channel')
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Amongus deadmeeting attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);

            }
            else{
                // count number of dead people
                var deadCount = 0;
                message.guild.channels.cache.get(aliveID).members.forEach((member) => {
                    if (member.voice.mute && !member.voice.selfMute)
                        deadCount++;
                });
                if (deadCount == 0){
                    embeddedMsg.setColor('C80000') // red
                    embeddedMsg.setTitle('Amongus Deadmeeting Failed')
                    embeddedMsg.setDescription('No users in the Among Us (Alive) channel are marked as dead (server-muted). \nUse command \"!amongus silence\" to mark players as dead')
                    embeddedMsg.setTimestamp()
                    embeddedMsg.setFooter(`Amongus deadmeeting attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                }
                else{
                    message.guild.channels.cache.get(aliveID).members.forEach((member) => {
                        if (member.voice.mute && !member.voice.selfMute){
                            member.voice.setChannel(deadID);
                            member.voice.setMute(false);
                        }
                    });

                    embeddedMsg.setColor('00C500') // green
                    embeddedMsg.setTitle('Amongus Deadmeeting')
                    if (deadCount == 1)
                        embeddedMsg.setDescription('Moved 1 member from the Among Us (Alive) voice channel')
                    else
                        embeddedMsg.setDescription(`Moved ${deadCount} members from the Among Us (Alive) voice channel`)
                    embeddedMsg.setTimestamp()
                    embeddedMsg.setFooter(`Amongus deadmeeting requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
                }

            }
            message.channel.send(embeddedMsg);
            message.delete();
        }
        else if (msgSplit[1] == 'unmute'){
            // unmute all

            if (message.guild.channels.cache.get(aliveID).members.size == 0 && message.guild.channels.cache.get(deadID).members.size == 0){
                embeddedMsg.setColor('C80000') // red
                embeddedMsg.setTitle('Amongus Unmute Failed')
                embeddedMsg.setDescription('There are no users in neither the Among Us DEAD nor ALIVE voice channels')
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Amongus unmute attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            else{
                var unmuteCount = 0;
                message.guild.channels.cache.get(aliveID).members.forEach((member) => {
                    member.voice.setMute(false);
                    unmuteCount++;
                });
                message.guild.channels.cache.get(deadID).members.forEach((member) => {
                    member.voice.setMute(false);
                    unmuteCount++;
                });

                embeddedMsg.setColor('00C500') // green
                embeddedMsg.setTitle('Amongus Unmute')
                if (unmuteCount == 1)
                    embeddedMsg.setDescription('Ensured 1 member is not server-muted')
                else
                    embeddedMsg.setDescription(`Ensured ${unmuteCount} members are not server-muted`)
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Amongus unmute requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }

            message.channel.send(embeddedMsg);
            message.delete();
        }
        else
            errFile.amongus(message, Discord);
    }
    else{
        if (msgSplit[1] != 'silence')
            errFile.amongus(message, Discord);
        else{
            const embeddedMsg = new Discord.MessageEmbed()
            var people = msgSplit;
            people.shift();
            people.shift();	
            var cleared = true;
            people.forEach((person) => {
                if (person.length != 22 || !( message.guild.members.cache.get(person.substring(3, person.length - 1)).voice.channelID == aliveID || message.guild.members.cache.get(person.substring(3, person.length - 1)).voice.channelID == deadID) ){
                    cleared = false;
                }
            });

            if (cleared){
                var silencedCount = 0;
                people.forEach((person) => {
                    message.guild.members.cache.get(person.substring(3, person.length - 1)).voice.setMute(true);
                    silencedCount++;
                });

                embeddedMsg.setColor('00C500') // green
                embeddedMsg.setTitle('Amongus Silence')
                if (silencedCount == 1)
                    embeddedMsg.setDescription('Silenced 1 member (Marked as dead)')
                else
                    embeddedMsg.setDescription(`Silenced ${silencedCount} members (Marked as dead)`)
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Amongus silence requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

            }
            else{
                embeddedMsg.setColor('C80000') // red
                embeddedMsg.setTitle('Amongus Silence Failed')
                embeddedMsg.setDescription('Something went wrong with the users you tagged. Please ensure you entered the command correctly\nTry \"!amongus silence\" for help with the commands')
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Amongus silence attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            message.channel.send(embeddedMsg);
            message.delete();
        }
        // DEAL WITH CASES OF NO ONE IN CHANNELS TO MOVE (and other corner cases)
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { amongusSwitch };