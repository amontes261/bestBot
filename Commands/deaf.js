
/////////////////////////////////////////////
//// silence.js – JavaScript x DiscordJS ////
//// Alex Montes  ––––  @a.montes28#4501 ////
/////////////////////////////////////////////

function deafSwitch(message, Discord, fs, msgSplit, errFile, client){

    /* - Function deafSwitch() was designed to ONLY be called from file main.js
    
        - Small, cosmetic, ease-of-life command – usable on any server
    
        - Was designed to be triggered via command: !deaf
    
        - Try !deaf help to have the bot to provide a usage message */
        if (msgSplit.length != 2){
            errFile.deaf(message, Discord);
        }
        else{
            var data;
            try{ // Attempt to read "database" JSON file //
                data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
            }
            catch (e){
                errFile.unexpectedErr(message, Discord, msgSplit, "deaf", client);
                return;
            }
        
            var isMaster = data["Master"].hasOwnProperty(message.author.id);
            var userAuthorized = false;
            if (data["Guilds"].hasOwnProperty(message.guild.id) )
                userAuthorized = data["Guilds"][message.guild.id]["Users"].hasOwnProperty(message.author.id);
        
            if (!userAuthorized && !isMaster){ // Ensure user has proper permission to use this command //
                errFile.permissionDenied(message, Discord, "deaf");
                return;
            }
    
            if (!message.guild.me.hasPermission("MUTE_MEMBERS") ){
                errFile.missingPermissions(message, Discord, "deaf");
                return;
            }
    
            const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
            if (msgSplit[1].length == 22 && message.mentions.members.size != 0){
                if (message.guild.members.cache.get(message.mentions.members.first().user.id).voice.channelID == null){
                    embeddedMsg.setColor('C80000'); // red
                    embeddedMsg.setTitle(`Unable to deafen ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}`);
                    embeddedMsg.setDescription(`${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName} is not in a voice channel`);
                    embeddedMsg.setFooter(`Deafen attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    return;
                }
                var userVoice = message.guild.members.cache.get(message.mentions.members.first().user.id).voice;
                if (userVoice.selfDeaf){ //local deafened
                    embeddedMsg.setColor('C80000'); // red
                    embeddedMsg.setTitle(`Unable to deafen ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}`);
                    embeddedMsg.setDescription(`${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName} is already local deafened`)
                    embeddedMsg.setFooter(`Deafen attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                }
                else if (userVoice.deaf && !userVoice.selfDeaf){ // already silenced
                    userVoice.setDeaf(false);
                    embeddedMsg.setColor('00C500'); // green
                    embeddedMsg.setTitle(`Un-deafened ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}`);
                    embeddedMsg.setFooter(`Undeafened by ${message.guild.members.cache.get(message.author.id).displayName}`);
                }
                else{
                    userVoice.setDeaf(true);
                    embeddedMsg.setColor('00C500'); // green
                    embeddedMsg.setTitle(`Deafened ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}`);
                    embeddedMsg.setFooter(`Deafened by ${message.guild.members.cache.get(message.author.id).displayName}`);
                }
                message.channel.send(embeddedMsg);
            }
            else
                errFile.deaf(message, Discord);
        }
    }
    
    
    // ============= //
    // MODULE EXPORT //
    // ============= //
    
    module.exports = { deafSwitch };