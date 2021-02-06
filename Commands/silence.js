
/////////////////////////////////////////////
//// silence.js – JavaScript x DiscordJS ////
//// Alex Montes  ––––  @a.montes28#4501 ////
/////////////////////////////////////////////

function silenceSwitch(message, Discord, fs, msgSplit, errFile, client){

/* - Function silenceSwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic, ease-of-life command – usable on any server

    - Was designed to be triggered via command: !silence

    - Try !silence help to have the bot to provide a usage message */
    if (msgSplit.length != 2){
        errFile.silence(message, Discord);
    }
    else{
        var data;
        try{ // Attempt to read "database" JSON file //
            data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
        }
        catch (e){
            errFile.unexpectedErr(message, Discord, msgSplit, "silence", client);
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

        if (!message.guild.me.hasPermission("MUTE_MEMBERS") ){
            errFile.missingPermissions(message, Discord, "silence");
            return;
        }

        const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
        if (message.mentions.members.size != 0){
            if (message.guild.members.cache.get(message.mentions.members.first().user.id).voice.channelID == null){
                embeddedMsg.setColor('C80000'); // red
                embeddedMsg.setTitle(`Unable to silence ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}`);
                embeddedMsg.setDescription(`${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName} is not in a voice channel`);
                embeddedMsg.setFooter(`Silence attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(embeddedMsg);
                return;
            }
            var userVoice = message.guild.members.cache.get(message.mentions.members.first().user.id).voice;
            if (userVoice.selfMute){ //local muted
                embeddedMsg.setColor('C80000'); // red
                embeddedMsg.setTitle(`Unable to silence ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}`);
                embeddedMsg.setDescription(`${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName} is already local muted`)
                embeddedMsg.setFooter(`Silence attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            else if (userVoice.mute && !userVoice.selfMute){ // already silenced
                userVoice.setMute(false);
                embeddedMsg.setColor('00C500'); // green
                embeddedMsg.setTitle(`Un-silenced ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}`);
                embeddedMsg.setFooter(`Unmuted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            else{
                userVoice.setMute(true);
                embeddedMsg.setColor('00C500'); // green
                embeddedMsg.setTitle(`Silenced ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}`);
                embeddedMsg.setFooter(`Muted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            message.channel.send(embeddedMsg);
        }
        else
            errFile.silence(message, Discord);
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { silenceSwitch };