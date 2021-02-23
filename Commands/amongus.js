
/////////////////////////////////////////////
//// amongus.js – JavaScript x DiscordJS ////
//// Alex Montes  ––––  @a.montes28#4501 ////
/////////////////////////////////////////////

function amongusSwitch(message, Discord, msgSplit, errFile){
    
 /* - Function amongusSwitch() was designed to ONLY be called from file main.js

    - Designed for use with the popular game: Among Us

    === THIS FUNCTION WAS NOT DESIGNED TO WORK ON 3RD PARTY DISCORD SERVERS ===

    - Was designed to be triggered via command: !amongus

    - Try !amongus help to have the bot to provide a usage message */
 
    if (message.guild.id != '404413479915880448'){ // Ensure not running on a 3rd party server //
        return;
    }

    if (!message.guild.me.hasPermission("MUTE_MEMBERS") || !message.guild.me.hasPermission("DEAFEN_MEMBERS") || !message.guild.me.hasPermission("MOVE_MEMBERS")){
        errFile.missingPermissions(message, Discord, "amongus");
        return;
    }

    var aliveID = '759983927363371019';
    var deadID = '772986083428270132';
    if (msgSplit.length == 1) // Incorrect command usage message //
        errFile.amongus(message, Discord);
    else if (msgSplit.length == 2){

        if (msgSplit[1] == 'help'){ // Command usage message requested //
            errFile.amongus(message, Discord);
            return;
        }

        const embeddedMsg = new Discord.MessageEmbed()
        if (msgSplit[1] == 'deadmove'){ // Move all members from the [DEAD] channel to the main channel & Server mute them //
            if (message.guild.channels.cache.get(deadID).members.size == 0){ // Case: [DEAD] channel contains no members //
                embeddedMsg.setColor('C80000') // red
                embeddedMsg.setTitle('Amongus Deadmove Failed')
                embeddedMsg.setDescription('There are no users in the Among Us (DEAD) voice channel')
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Amongus deadmove attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            else{ // Execute move & mute command //
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
        }

        else if (msgSplit[1] == 'deadmeeting'){ // Move all members from the main channel to the [DEAD] channel & un-Server mute them//
            if (message.guild.channels.cache.get(aliveID).members.size == 0){ // Case: Main channel contains no members //
                embeddedMsg.setColor('C80000') // red
                embeddedMsg.setTitle('Amongus Deadmeeting Failed')
                embeddedMsg.setDescription('There are no users in the Among Us (ALIVE) voice channel')
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Amongus deadmeeting attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);

            }
            else{ 
                var deadCount = 0;
                message.guild.channels.cache.get(aliveID).members.forEach((member) => {
                    if (member.voice.mute && !member.voice.selfMute)
                        deadCount++;
                });
                if (deadCount == 0){ // Case: No members in the main channel are considered "dead" (Server muted) //
                    embeddedMsg.setColor('C80000') // red
                    embeddedMsg.setTitle('Amongus Deadmeeting Failed')
                    embeddedMsg.setDescription('No users in the Among Us (Alive) channel are marked as dead (server-muted). \nUse command \"!amongus silence\" to mark players as dead')
                    embeddedMsg.setTimestamp()
                    embeddedMsg.setFooter(`Amongus deadmeeting attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                }
                else{ // Execute move & un-mute command //
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
        }

        else if (msgSplit[1] == 'unmute'){ // un-Server mute all members in both the main and [DEAD] chats //
            if (message.guild.channels.cache.get(aliveID).members.size == 0 && message.guild.channels.cache.get(deadID).members.size == 0){ // Case: No members are in either of the channels //
                embeddedMsg.setColor('C80000') // red
                embeddedMsg.setTitle('Amongus Unmute Failed')
                embeddedMsg.setDescription('There are no users in neither the Among Us DEAD nor ALIVE voice channels')
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Amongus unmute attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            else{ // Execute un-mute command //
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
        }
        else // Incorrect command usage message //
            errFile.amongus(message, Discord);
    }
    else{
        if (msgSplit[1] != 'silence')  // Incorrect command usage message //
            errFile.amongus(message, Discord);
        else{ // Silence a selected set of members //
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

            if (cleared){ // Execute mute command //
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
            else{ // Case: One or more of the entries was not a valid user-tag or in a valid voice channel //
                embeddedMsg.setColor('C80000') // red
                embeddedMsg.setTitle('Amongus Silence Failed')
                embeddedMsg.setDescription('Something went wrong with the users you tagged. Please ensure you entered the command correctly\nTry \"!amongus silence\" for help with the commands')
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Amongus silence attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            message.channel.send(embeddedMsg);
        }
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { amongusSwitch };