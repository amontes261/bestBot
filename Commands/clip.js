
////////////////////////////////////////////
//// clip.js – JavaScript x DiscordJS //////
//// Alex Montes  –  @a.montes28#4501 //////
////////////////////////////////////////////

async function clipSwitch(message, Discord, fs, msgSplit, errFile, client){

/* - Function clipSwitch() was designed to ONLY be called from file main.js

    === THIS IS A SPECIAL COMMAND– it will only work on authorized servers. Need to use !auth command to authorize ===

    - Was designed to be triggered via command: !clip

    - Try !clip help to have the bot to provide a usage message */
   
    var data;
    try{ // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
    }
    catch (e){
        errFile.unexpectedErr(message, Discord, msgSplit, "clip", client);
        return;
    }
    var allCommandsUnlocked = false;
    if (data["Guilds"].hasOwnProperty(message.guild.id) )
		allCommandsUnlocked = data["Guilds"][message.guild.id]["All Command Access"]["Activated"];
	
	if (!allCommandsUnlocked) // Ignore command entirely if server is not authorized to use it //
        return;
        
    if (msgSplit.length == 1) // Incorrect parameter or argument message //
        errFile.clip(message, Discord);
    else if (msgSplit.length >= 2){
        if (msgSplit.length == 2 && msgSplit[1] == 'help'){ // Command usage message requested //
            errFile.clip(message, Discord);
            return;
        }
        else if (msgSplit.length == 2 && msgSplit[1] == "list"){ // Clip list requested //
            const everything = fs.readdirSync(`./Clips/`);
            var allClips = everything.filter(file => file[0] != "."); // Removes iCloud Drive .DS_Store file //

            var embedDescription = 'Here are the names of all available clips:';
            
            for (var i = 0; i < allClips.length; i++){
                embedDescription += '\n• ' + allClips[i].split(".")[0];
            }

            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('EFEF00') // yellow
                .setTitle('Clip List:')
                .setDescription(embedDescription)
                .setTimestamp()
                .setFooter(`Clip list requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg);
        }
        else if (msgSplit.length >= 2 && msgSplit[1] == "upload"){
            uploadAudioClip(' ', message, Discord); // temporary ' ' placeholder for parameter clipName
        }
        else {
            const everything = fs.readdirSync(`./Clips/`);
            var allClips = everything.filter(file => file[0] != "."); // Removes iCloud Drive .DS_Store file //

            var clipName = msgSplit[1];
            for (var i = 2; i < msgSplit.length; i++){
                clipName += ' ' + msgSplit[i]; // Get entire clip name from message //
            }

            var exists = false;
            for (var i = 0; i < allClips.length; i++){
                if (allClips[i].split(".")[0] == clipName) // Check if entered clip actually exists //
                    exists = true;
            }
            
            if (!exists){ // Case: Audio clip not found //
                const reply = new Discord.MessageEmbed();
                reply.setColor('C80000') // red
                    .setTitle('Audio Clip Not Found')
                    .setDescription(`An audio clip by the name "${clipName}" doesn't seem to exist`)
                    .setTimestamp()
                    .setFooter(`Clip playback attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(reply); // Send final output message //
                return;
            }
            else{ // Case: Audio clip found, execute clip playback command //
                message.react("▶️");
                playAudioClip(clipName, message, Discord);
            }
        }
    }
    else // Incorrect command usage message //
        errFile.clip(message, Discord); // This'll probably never be reached, but included it just in case //
}

function uploadAudioClip(clipName, message, Discord){
    // To be implemented, preferrably on Discord.js v13 to support vocal upload //
    errFile.missingNewFeature(message, Discord, "clip");
}

async function playAudioClip(clipName, message, Discord){
    if (message.member.voice.channelID != null) { // Case: User in voice channel, execute clip playback command //
		const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(`Clips/${clipName}.mp3`);
        
		dispatcher.on('finish', () => {
            message.member.voice.channel.leave();
            const embeddedMsg = new Discord.MessageEmbed();
            embeddedMsg.setColor('00C500'); // green
            embeddedMsg.setTitle(`Played Clip "${clipName}"`);
            embeddedMsg.setTimestamp();
            embeddedMsg.setFooter(`Clip played by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg); // Send final output message //

            if (message.guild.id == "404413479915880448"){ // Log if clip was played on 1st party server //
                var clientLogChannel = message.guild.channels.cache.get("772647489798537236");
                const authLogMsg = new Discord.MessageEmbed()
                    .setColor('00C500') // green 
                    .setTitle(`Clip  Played: "${clipName}"`)
                    .setTimestamp()
                    .setFooter(`Clip requested by ${message.guild.members.cache.get(message.author.id).displayName}`)
                clientLogChannel.send(authLogMsg);
            }
        });
        
		dispatcher.on('error', () => {
            console.error;
            message.member.voice.channel.leave();
            const embeddedMsg = new Discord.MessageEmbed();
            embeddedMsg.setColor('C80000'); // red
            embeddedMsg.setTitle(`Clip Playback Failed`);
            embeddedMsg.setDescription(`Failed to Play Clip: *${clipName}*`);
            embeddedMsg.setTimestamp();
            embeddedMsg.setFooter(`Clip playback attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg); // Send final output message //
        });
    }

    else{ // Case: User not in voice channel //
        const embeddedMsg = new Discord.MessageEmbed();
            embeddedMsg.setColor('C80000'); // red
            embeddedMsg.setTitle(`Clip Playback Failed`);
            embeddedMsg.setDescription(`You must be in a voice channel to play a clip.`);
            embeddedMsg.setTimestamp();
            embeddedMsg.setFooter(`Clip playback attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg); // Send final output message //
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { clipSwitch };