
///////////////////////////////////////////////
//// isolate.js – JavaScript x DiscordJS //////
//// Alex Montes –––––– @a.montes28#4501 //////
///////////////////////////////////////////////

function isolateSwitch(message, Discord, fs, msgSplit, errFile, client){

 /* - Function isolateSwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic, ease-of-life command – usable on any server

    - Was designed to be triggered via command: !isolate

    - Try !isolate help to have the bot to provide a usage message */
    
    var data;
    try{ // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
    }
    catch (e){
        errFile.unexpectedErr(message, Discord, msgSplit, "isolate", client);
        return;
    }

    var isMaster = data["Master"].hasOwnProperty(message.author.id);
    var userAuthorized = false;
    if (data["Guilds"].hasOwnProperty(message.guild.id) )
        userAuthorized = data["Guilds"][message.guild.id]["Users"].hasOwnProperty(message.author.id);


    if (!userAuthorized && !isMaster){ // Ensure user has proper permission to use this command //
        errFile.permissionDenied(message, Discord, "isolate");
        return;
    }

    if (!message.guild.me.hasPermission("MUTE_MEMBERS") || !message.guild.me.hasPermission("DEAFEN_MEMBERS") ){
        errFile.missingPermissions(message, Discord, "isolate");
        return;
    }

    if (msgSplit.length != 2) // Incorrect command usage message //
        errFile.isolate(message, Discord);

    else{
        if (msgSplit[1] == "help"){ // Command usage message requested //
            errFile.isolate(message, Discord);
            return;
        }
        
        const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
        if (msgSplit[1].length == 22 && message.mentions.members.size != 0){
            if (message.guild.members.cache.get(message.mentions.members.first().user.id).voice.channelID == null){  // Case: User not in a voice channel //
                embeddedMsg.setColor('C80000'); // red
                embeddedMsg.setTitle(`Unable to isolate ${message.guild.members.cache.get(message.mentions.members.first().user.id ).displayName}`);
                embeddedMsg.setDescription(`User ${message.guild.members.cache.get(message.mentions.members.first().user.id ).displayName} is not in a voice channel`)
                embeddedMsg.setFooter(`Isolation attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(embeddedMsg);
                return;
            }
            var userVoice = message.guild.members.cache.get(message.mentions.members.first().user.id).voice;
            if (userVoice.selfMute && userVoice.selfDeaf){  // Case: User already local deafened //
                embeddedMsg.setColor('C80000'); // red
                embeddedMsg.setTitle(`Unable to isolate ${message.guild.members.cache.get(message.mentions.members.first().user.id ).displayName}`);
                embeddedMsg.setDescription(`User ${message.guild.members.cache.get(message.mentions.members.first().user.id ).displayName} is already local muted & deafened.\nThere's no point in a server-mute and deafen.`)
                embeddedMsg.setFooter(`Isolation attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            else if ( (userVoice.mute && !userVoice.selfMute ) && (userVoice.deaf && !userVoice.selfDeaf) ){  // Already isolated; execute de-isolation //
                userVoice.setDeaf(false);
                userVoice.setMute(false);
                embeddedMsg.setColor('00C500'); // green
                embeddedMsg.setTitle(`Un-isolated ${message.guild.members.cache.get(message.mentions.members.first().user.id ).displayName}`);
                embeddedMsg.setFooter(`Unmuted & undeafened by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            else{ // Execute isolation //
                userVoice.setDeaf(true);
                userVoice.setMute(true);
                embeddedMsg.setColor('00C500'); // green
                embeddedMsg.setTitle(`Isolated ${message.guild.members.cache.get(message.mentions.members.first().user.id ).displayName}`);
                embeddedMsg.setFooter(`Muted & deafened by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            message.channel.send(embeddedMsg);
        }
        else // Incorrect command usage message //
            errFile.isolate(message, Discord);
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { isolateSwitch };