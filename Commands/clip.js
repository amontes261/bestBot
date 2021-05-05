
////////////////////////////////////////////
//// clip.js – JavaScript x DiscordJS //////
//// Alex Montes  –  @a.montes28#4501 //////
////////////////////////////////////////////

async function clipSwitch(message, Discord, fs, msgSplit, errFile, mediaData, client){

/* - Function clipSwitch() was designed to ONLY be called from file main.js

    === THIS IS A SPECIAL COMMAND– it will only work on authorized servers. Need to use !auth command to authorize ===

    - Was designed to be triggered via command: !clip

    - Try !clip help to have the bot to provide a usage message */
   
    /* REMOVED AFTER TYPE CHANGE
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
    */

    if (!message.guild.me.hasPermission("CONNECT") || !message.guild.me.hasPermission("SPEAK") ){
        errFile.missingPermissions(message, Discord, "clip");
        return;
    }
        
    if (msgSplit.length == 1) // Incorrect parameter or argument message //
        errFile.clip(message, Discord);
    else if (msgSplit.length >= 2){
        if (msgSplit.length == 2 && msgSplit[1] == 'help'){ // Command usage message requested //
            errFile.clip(message, Discord);
            return;
        }
        else if (msgSplit.length == 2 && msgSplit[1] == "list"){ // Clip list requested //
            embeddedMsg = new Discord.MessageEmbed()
            const everything = fs.readdirSync(`./Clips/`);
            var serverFileExists = everything.includes(message.guild.id);
            var allClips;

            if (serverFileExists){
                var serverClips = fs.readdirSync(`./Clips/${message.guild.id}`);
                allClips = serverClips.filter(file => file[0] != "."); // Removes iCloud Drive .DS_Store file //
            }

            if (!serverFileExists || allClips.length == 0){
                embeddedMsg.setColor('C80000'); // red
                embeddedMsg.setTitle(`Clip List Unavailable`);
                embeddedMsg.setDescription(`There are currently no clips stored for this server.`);
                embeddedMsg.setFooter(`Failed clip list command from ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(embeddedMsg);
                return;
            }
            
            var embedDescription = '';
            
            for (var i = 0; i < allClips.length; i++){
                if (i != allClips.length - 1)
                    embedDescription += allClips[i].split(".")[0] + '\n';
                else
                embedDescription += allClips[i].split(".")[0];
            }

            embeddedMsg = new Discord.MessageEmbed()
                .setColor('A724A8') // dark purple
                .setTitle('__**Available Clips**__')
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
            var serverFileExists = everything.includes(message.guild.id);
            var allClips;

            if (serverFileExists){
                var serverClips = fs.readdirSync(`./Clips/${message.guild.id}`);
                allClips = serverClips.filter(file => file[0] != "."); // Removes iCloud Drive .DS_Store file //
            }

            embeddedMsg = new Discord.MessageEmbed()
            if (!serverFileExists || allClips.length == 0){
                embeddedMsg.setColor('C80000'); // red
                embeddedMsg.setTitle(`Clip List Unavailable`);
                embeddedMsg.setDescription(`There are currently no clips stored for this server.`);
                embeddedMsg.setFooter(`Failed clip list command from ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(embeddedMsg);
                return;
            }

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
                const embeddedMsg = new Discord.MessageEmbed();
                if (message.member.voice.channelID == null){ // Case: User not in voice channel //
                    embeddedMsg.setColor('C80000'); // red
                    embeddedMsg.setTitle(`Clip Playback Failed`);
                    embeddedMsg.setDescription(`You must be in a voice channel to play a clip.`);
                    embeddedMsg.setTimestamp();
                    embeddedMsg.setFooter(`Clip playback attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg); // Send final output message //
                }
                else if (mediaData.get(message.guild.id)['mediaPlaybackType'] == "music"){
                    embeddedMsg.setColor('C80000'); // red
                    embeddedMsg.setTitle(`Queue Failed`);
                    embeddedMsg.setDescription(`Currently playing **music**, not clips.\nUse the **!stop** command to stop the music playing and then re-use the **!clip** command.`);
                    embeddedMsg.setFooter(`Failed clip request by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    return;
                }
                else if (mediaData.get(message.guild.id)["mediaPlaybackType"] == "tts"){
                    embeddedMsg.setColor('C80000'); // red
                    embeddedMsg.setTitle(`Clip Playback Unavailable`);
                    embeddedMsg.setDescription(`Currently in **Text to Speech** mode.\nUse the *!stop* command to leave TTS-Mode`);
                    embeddedMsg.setFooter(`Failed clip request by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    return;
                }
                else if (mediaData.get(message.guild.id)['mediaPlaybackType'] == "clip"){
                    mediaData.get(message.guild.id).clipQueue.push(clipName);
                    embeddedMsg.setColor('A724A8'); // dark purple
                    embeddedMsg.setTitle(`**${clipName}**`);
                    embeddedMsg.setAuthor(`Queued`, 'https://cdn3.iconfinder.com/data/icons/iconic-1/32/play_alt-512.png')
                    embeddedMsg.setFooter(`Clip queued by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                }
                else{
                    embeddedMsg.setColor('A724A8'); // dark purple
                    embeddedMsg.setTitle(`**${clipName}**`);
                    embeddedMsg.setAuthor(`Now Playing`, 'https://cdn3.iconfinder.com/data/icons/iconic-1/32/play_alt-512.png')
                    embeddedMsg.setFooter(`Clip requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    playAudioClip(clipName, message, Discord, mediaData);
                }

                
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

async function playAudioClip(clipName, message, Discord, mediaData){

    if (!mediaData.get(message.guild.id)["playingClip"]){
        mediaData.get(message.guild.id)['playingClip'] = true;
        mediaData.get(message.guild.id)['mediaPlaybackType'] = "clip";
        mediaData.get(message.guild.id)['mostRecentTextChannel'] = message.channel.id;
        connection = await message.member.voice.channel.join();
        mediaData.get(message.guild.id)['activeVoiceChannel'] = message.member.voice.channel.id;
        mediaData.get(message.guild.id)['activeConnection'] = connection;
      }
    
      dispatcher = connection.play(`Clips/${message.guild.id}/${clipName}.mp3`);
      mediaData.get(message.guild.id)['activeDispatcher'] = dispatcher;
      mediaData.get(message.guild.id).clipQueue.push(clipName);

      dispatcher.on('finish', () => {
        mediaData.get(message.guild.id)['clipQueue'].shift()

        if (mediaData.get(message.guild.id)['clipQueue'].length == 0){
            mediaData.get(message.guild.id)['activeDispatcher'].destroy();
            mediaData.get(message.guild.id)['activeConnection'].disconnect();
            mediaData.get(message.guild.id)['activeVoiceChannel'] = null;
            mediaData.get(message.guild.id)['activeDispatcher'] = null;
            mediaData.get(message.guild.id)['songQueue'] = [];
            mediaData.get(message.guild.id)['clipQueue'] = [];
            mediaData.get(message.guild.id)['nowPlayingMessageID'] = null;
            mediaData.get(message.guild.id)["playingMusic"] = false;
            mediaData.get(message.guild.id)["playingClip"] = false;
            mediaData.get(message.guild.id)["mediaPlaybackType"] = null;
      
            const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
            embeddedMsg.setColor('00C500'); // green
            embeddedMsg.setTitle(`Queue End Reached`);
            embeddedMsg.setFooter(`Player automatically stopped`);
            message.channel.send(embeddedMsg);
            return;
          }
          else{
            queueShift(message, Discord, mediaData)
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

function queueShift(message, Discord, mediaData){
    dispatcher = mediaData.get(message.guild.id)['activeConnection'].play(`Clips/${message.guild.id}/${mediaData.get(message.guild.id)['clipQueue'][0]}.mp3`);
    mediaData.get(message.guild.id)['activeDispatcher'] = dispatcher;
    
      dispatcher.on('finish', () => {
        mediaData.get(message.guild.id)['clipQueue'].shift()
    
        if (mediaData.get(message.guild.id)['clipQueue'].length == 0){
          mediaData.get(message.guild.id)['activeDispatcher'].destroy();
          mediaData.get(message.guild.id)['activeConnection'].disconnect();
    
          mediaData.get(message.guild.id)['activeVoiceChannel'] = null;
          mediaData.get(message.guild.id)['activeDispatcher'] = null;
          mediaData.get(message.guild.id)['songQueue'] = [];
          mediaData.get(message.guild.id)['clipQueue'] = [];
          mediaData.get(message.guild.id)['nowPlayingMessageID'] = null;
          mediaData.get(message.guild.id)["playingMusic"] = false;
          mediaData.get(message.guild.id)["playingClip"] = false;
          mediaData.get(message.guild.id)["mediaPlaybackType"] = null;
    
          const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
          embeddedMsg.setColor('00C500'); // green
          embeddedMsg.setTitle(`Queue End Reached`);
          embeddedMsg.setFooter(`Player automatically stopped`);
          message.channel.send(embeddedMsg);
          return;
        }
        else{
          queueShift(message, Discord, mediaData);
        }
      });
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { clipSwitch };