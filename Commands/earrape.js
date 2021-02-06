
///////////////////////////////////////////////
//// earrape.js – JavaScript x DiscordJS //////
//// Alex Montes  ––––  @a.montes28#4501 //////
///////////////////////////////////////////////

async function earrapeSwitch(message, Discord, fs, msgSplit, errFile, client){
    
 /* - Function earrapeSwitch() was designed to ONLY be called from file main.js

    === THIS FUNCTION WAS NOT DESIGNED TO WORK ON 3RD PARTY DISCORD SERVERS ===

    - Was designed to be triggered via command: !earrape

    - Try !earrape help to have the bot to provide a usage message */
    
    var data;
    try{ // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
    }
    catch (e){
        errFile.unexpectedErr(message, Discord, msgSplit, "earrape", client);
        return;
    }
    var allCommandsUnlocked = false;
    if (data["Guilds"].hasOwnProperty(message.guild.id) )
		allCommandsUnlocked = data["Guilds"][message.guild.id]["All Command Access"]["Activated"];
	
	if (!allCommandsUnlocked) // Ignore command entirely if server is not authorized to use it //
        return;

    if (msgSplit.length == 1)
        errFile.earrape(message, Discord);
    else if (msgSplit.length == 2 && msgSplit[1] == 'help')
        errFile.earrape(message, Discord);
    else if (msgSplit.length == 2 && msgSplit[1] == "list"){ // Earrape clip list requested //
        const everything = fs.readdirSync(`./EarRp/`);
        var allClips = everything.filter(file => file[0] != "."); // Removes iCloud Drive .DS_Store file //

        var embedDescription = 'Here are the names of all available clips:';
        
        for (var i = 0; i < allClips.length; i++){
            embedDescription += '\n• ' + allClips[i].split(".")[0];
        }

        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('EFEF00') // yellow
            .setTitle('Earrape Clip List:')
            .setDescription(embedDescription)
            .setTimestamp()
            .setFooter(`Earrape clip list requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
    }
    else if (msgSplit.length >= 2 && msgSplit[1] == "upload"){
        uploadAudioClip(' ', message, Discord); // temporary ' ' placeholder for parameter clipName
    }
    else{ 

        const everything = fs.readdirSync(`./EarRp/`);
        var allClips = everything.filter(file => file[0] != "."); // Removes iCloud Drive .DS_Store file //

        var clipName = msgSplit[1];
        for (var i = 2; i < msgSplit.length; i++){
            clipName += ' ' + msgSplit[i]; // Get entire clip name from message //
        }

        var exists = false;
        for (var i = 0; i < allClips.length; i++){
            if (allClips[i].substring(0, allClips[i].length - 4) == clipName) // Check if entered clip actually exists //
                exists = true;
        }
            
        if (!exists){ // Case: Audio clip not found //
            const reply = new Discord.MessageEmbed();
            reply.setColor('C80000') // red
                .setTitle('Earrape Clip Not Found')
                .setDescription(`An earrape clip by the name "${clipName}" doesn't seem to exist`)
                .setTimestamp()
                .setFooter(`Earrape clip playback attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(reply); // Send final output message //
        }
        else{ // Case: Audio clip found, execute clip playback command //
            message.react("▶️");
            playAudioClip(clipName, message, Discord);
        }
    }
}

function uploadAudioClip(clipName, message, Discord){
    // To be implemented, preferrably on Discord.js v13 to support vocal upload //
    errFile.missingNewFeature(message, Discord, "clip");
}

async function playAudioClip(clipName, message, Discord){
    if (message.member.voice.channelID != null) { // Case: User in voice channel, execute clip playback command //
		const connection = await message.member.voice.channel.join();
		const dispatcher = connection.play(`EarRp/${clipName}.mp3`);

		dispatcher.on('finish', () => {
            message.member.voice.channel.leave();
            const embeddedMsg = new Discord.MessageEmbed();
            embeddedMsg.setColor('00C500'); // green
            embeddedMsg.setTitle(`Played Earrpe Clip "${clipName}"`);
            embeddedMsg.setTimestamp();
            embeddedMsg.setFooter(`Earrape clip played by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg); // Send final output message //
        
            if (message.guild.id == "404413479915880448"){ // Log if clip was played on 1st party server //
                var clientLogChannel = message.guild.channels.cache.get("772647489798537236");
                const authLogMsg = new Discord.MessageEmbed()
                    .setColor('00C500') // green 
                    .setTitle(`Earrape clip Played: "${clipName}"`)
                    .setTimestamp()
                    .setFooter(`Earrape clip requested by ${message.guild.members.cache.get(message.author.id).displayName}`)
                clientLogChannel.send(authLogMsg);
            }
        });
        
		dispatcher.on('error', () => {
            console.error;
            message.member.voice.channel.leave();
            const embeddedMsg = new Discord.MessageEmbed();
            embeddedMsg.setColor('C80000'); // red
            embeddedMsg.setTitle(`Earrape Clip Playback Failed`);
            embeddedMsg.setDescription(`Failed to Play Earrape Clip: *${clipName}*`);
            embeddedMsg.setTimestamp();
            embeddedMsg.setFooter(`Earrape clip playback attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg); // Send final output message //
        });
    }
    
    else{ // Case: User not in voice channel //
        const embeddedMsg = new Discord.MessageEmbed();
            embeddedMsg.setColor('C80000'); // red
            embeddedMsg.setTitle(`Earrape Clip Playback Failed`);
            embeddedMsg.setDescription(`You must be in a voice channel to play an earrape clip.`);
            embeddedMsg.setTimestamp();
            embeddedMsg.setFooter(`Earrape clip playback attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg); // Send final output message //
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { earrapeSwitch };