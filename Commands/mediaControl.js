////////////////////////////////////////////////////
//// mediaControl.js – JavaScript x DiscordJS //////
//// Alex Montes ––––––––––– @a.montes28#4501 //////
////////////////////////////////////////////////////

async function nowPlayingSwitch(message, Discord, msgSplit, errFile, mediaData, client){
  const embeddedMsg = new Discord.MessageEmbed().setTimestamp();
  if (msgSplit.length == 1){
    if (mediaData.get(message.guild.id)['activeDispatcher'] == null){
      embeddedMsg.setColor('C80000'); // red
      embeddedMsg.setTitle(`Nothing Playing`);
      embeddedMsg.setDescription(`Start playing some music by providing a query or link after the *!play* command`);
      embeddedMsg.setFooter(`Failed play request by ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg);
      return;
    }

    if (mediaData.get(message.guild.id)['mediaPlaybackType'] == "music"){
      embeddedMsg.setColor('A724A8'); // dark purple
      embeddedMsg.setTitle(`Now Playing: **${mediaData.get(message.guild.id)['songQueue'][0].title}**`);
      embeddedMsg.setDescription(`Songs Remaining In Queue: ${mediaData.get(message.guild.id)['songQueue'].length - 1}`);
      embeddedMsg.setFooter(`Now playing UI requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg).then(msg => {
        msg.react('⏪');
        msg.react('⏸');
        msg.react('⏩');
        mediaData.get(message.guild.id)['nowPlayingMessageID'] = msg.id;
        //make it so existing msg gets deleted
  
        msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '⏪' || reaction.emoji.name == '⏸' || reaction.emoji.name == '⏩'),
           { max: 1, time: 180000 }).then( async collected => {
               if (collected.first().emoji.name == '⏪') {
                errFile.missingNewFeature(message, Discord, 'previous track reaction');
               }
               else if (collected.first().emoji.name == '⏸'){
                errFile.missingNewFeature(message, Discord, 'pause track reaction');
               }
               else if (collected.first().emoji.name == '⏩'){
                errFile.missingNewFeature(message, Discord, 'skip track reaction');
               }
            });
      });
    }
    else if (mediaData.get(message.guild.id)['mediaPlaybackType'] == "tts"){
      embeddedMsg.setColor('A724A8'); // dark purple
      embeddedMsg.setTitle(`Currently in **Text to Speech** mode`);
      embeddedMsg.setFooter(`Now playing UI requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg).then(msg => {
        mediaData.get(message.guild.id)['nowPlayingMessageID'] = msg.id;
      })
    }
    else if (mediaData.get(message.guild.id)['mediaPlaybackType'] == "clip"){
      embeddedMsg.setColor('A724A8'); // dark purple
      embeddedMsg.setTitle(`Clip Playing: **${mediaData.get(message.guild.id)['clipQueue'][0]}**`);
      embeddedMsg.setDescription(`Clips Remaining In Queue: ${mediaData.get(message.guild.id)['clipQueue'].length - 1}`);
      embeddedMsg.setFooter(`Now playing UI requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg).then(msg => {
        msg.react('⏪');
        msg.react('⏸');
        msg.react('⏩');
        mediaData.get(message.guild.id)['nowPlayingMessageID'] = msg.id;
        //make it so existing msg gets deleted
  
        msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '⏪' || reaction.emoji.name == '⏸' || reaction.emoji.name == '⏩'),
           { max: 1, time: 180000 }).then( async collected => {
               if (collected.first().emoji.name == '⏪') {
                errFile.missingNewFeature(message, Discord, 'previous clip reaction');
               }
               else if (collected.first().emoji.name == '⏸'){
                errFile.missingNewFeature(message, Discord, 'pause clip reaction');
               }
               else if (collected.first().emoji.name == '⏩'){
                errFile.missingNewFeature(message, Discord, 'skip clip reaction');
               }
            });
      });
    }
    else
      errFile.unexpectedErr(message, Discord, msgSplit, "nowplaying", client);
  }
  else
    errFile.nowPlaying(message, Discord);
}

async function pauseSwitch(message, Discord, msgSplit, errFile, mediaData, client){
    const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
    if (msgSplit.length != 1)
        errFile.pause(message, Discord);
    else if (mediaData.get(message.guild.id)['activeConnection'] == null){
        embeddedMsg.setColor('C80000'); // red
        embeddedMsg.setTitle(`Pause Command Not Required`);
        embeddedMsg.setDescription(`I'm not in any voice channel to require the *!stop* command`);
        embeddedMsg.setFooter(`Unnecessary pause command from ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
        return;
    }
    else if(mediaData.get(message.guild.id)['activeDispatcher'] == null){
        embeddedMsg.setColor('C80000'); // red
        embeddedMsg.setTitle(`Pause Command Not Required`);
        embeddedMsg.setDescription(`There's nothing to pause.\nUse the *!play* command to start playing some music.`);
        embeddedMsg.setFooter(`Unnecessary pause command from ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
        return;
    }
    else if(mediaData.get(message.guild.id)['mediaPlaybackType'] == "tts"){
      embeddedMsg.setColor('C80000'); // red
      embeddedMsg.setTitle(`Pause Command Not Required`);
      embeddedMsg.setDescription(`I am currently in **Text to Speech** mode, which is un-pausable\nUse the *!stop* command to leave TTS-Mode.`);
      embeddedMsg.setFooter(`Failed pause command from ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg);
      return;
    }
    else{
        mediaData.get(message.guild.id)['activeDispatcher'].pause();
        mediaData.get(message.guild.id)["playingMusic"] = false;
        mediaData.get(message.guild.id)["playingClip"] = false;
        embeddedMsg.setColor('00C500'); // green
        embeddedMsg.setTitle(`Player Paused`);
        embeddedMsg.setDescription(`Use the *!play* command to resume the player.`);
        embeddedMsg.setFooter(`Paused by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
        return;
    }
}

async function playSwitch(message, Discord, fs, msgSplit, msgSplitUpper, errFile, client, youtubeDL, youtubeScraper, mediaData){

    /* - Asynchronous function playSwitch() was designed to ONLY be called from file main.js
   
     - YouTube music player command – usable on any server
   
     - Was designed to be triggered via command: !play
   
     - Try !play help to have the bot to provide a usage message */
   
     if (!message.guild.me.hasPermission("CONNECT") || !message.guild.me.hasPermission("SPEAK") ){
       errFile.missingPermissions(message, Discord, "play");
       return;
     }  
       const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
       const voiceChannel = message.member.voice.channelID;
       if (voiceChannel == null){
         embeddedMsg.setColor('C80000'); // red
         embeddedMsg.setTitle(`Play Command Unavailable`);
         embeddedMsg.setDescription(`You must be in a voice channel to use this command`);
         embeddedMsg.setFooter(`Failed play request by ${message.guild.members.cache.get(message.author.id).displayName}`);
         message.channel.send(embeddedMsg);
         return;
       }
   
       if (msgSplit.length == 1){ // Just play cmd 
         if (mediaData.get(message.guild.id)["playingMusic"] || mediaData.get(message.guild.id)["playingClip"]){
           embeddedMsg.setColor('C80000'); // red
           embeddedMsg.setTitle(`Already Playing`);
           embeddedMsg.setDescription(`Use the *!pause* command to pause what's playing\nUse the *!stop* command to stop what's playing`);
           embeddedMsg.setFooter(`Failed play request by ${message.guild.members.cache.get(message.author.id).displayName}`);
           message.channel.send(embeddedMsg);
           return;
         }
         else if (mediaData.get(message.guild.id)['activeDispatcher'] == null){ // not playing, no dispatcher playing
           embeddedMsg.setColor('C80000'); // red
           embeddedMsg.setTitle(`Nothing Playing`);
           embeddedMsg.setDescription(`Start playing some music by providing a query or link after the *!play* command`);
           embeddedMsg.setFooter(`Failed play request by ${message.guild.members.cache.get(message.author.id).displayName}`);
           message.channel.send(embeddedMsg);
           return;
         }
         else if (mediaData.get(message.guild.id)['mediaPlaybackType'] == "tts"){ // not playing, no dispatcher playing
          embeddedMsg.setColor('C80000'); // red
          embeddedMsg.setTitle(`Play Command Not Required`);
          embeddedMsg.setDescription(`Currently in **Text to Speech** mode, which does not require this command.\nUse the *!stop* command to leave TTS-Mode`);
          embeddedMsg.setFooter(`Failed play command by ${message.guild.members.cache.get(message.author.id).displayName}`);
          message.channel.send(embeddedMsg);
          return;
          }
         else{
           // resume
           mediaData.get(message.guild.id)['activeDispatcher'].resume();
           if (mediaData.get(message.guild.id)["mediaPlaybackType"] == "music")
            modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'playingMusic', null, client);
           else if (mediaData.get(message.guild.id)["mediaPlaybackType"] == "clip")
            modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'playingClip', null, client);
           embeddedMsg.setColor('00C500'); // green
           embeddedMsg.setTitle(`Player Resuming`);
           embeddedMsg.setDescription(`Use the *!pause* command to pause the player.\nUse the *!stop* command to stop what's playing`);
           embeddedMsg.setFooter(`Un-Paused by ${message.guild.members.cache.get(message.author.id).displayName}`);
           message.channel.send(embeddedMsg);
           return;
         }
       }
       if (msgSplit.length == 2 && msgSplit[1] == 'help'){
         errFile.play(message, Discord);
       }
       else if (msgSplit.length == 2 && msgSplit[1].includes('youtube.com')){
   
         var videoData = await youtubeScraper.getVideo(msgSplitUpper[1].substring(msgSplit[1].indexOf('=') + 1) );
         modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'songQueueAdd', videoData, client);
         embeddedMsg.setColor('A724A8'); // dark purple
         embeddedMsg.setTitle(`**${videoData.title}**`);
         embeddedMsg.setURL(msgSplitUpper[1])
   
         if (mediaData.get(message.guild.id)["playingMusic"]){ // Already playing music //
           embeddedMsg.setAuthor(`Queued`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
           embeddedMsg.setFooter(`Song queued by ${message.guild.members.cache.get(message.author.id).displayName}`);
         
           message.channel.send(embeddedMsg).then(message.delete() );
         }
         else if(mediaData.get(message.guild.id)["playingClip"]){
          embeddedMsg.setColor('C80000'); // red
          embeddedMsg.setTitle(`Queue Failed`);
          embeddedMsg.setDescription(`Currently playing **clips**, not music.\nUse the **!stop** command to stop the clip playing and then re-use the **!play** command.`);
          embeddedMsg.setFooter(`Failed play request by ${message.guild.members.cache.get(message.author.id).displayName}`);
          message.channel.send(embeddedMsg);
          return;
         }
         else if(mediaData.get(message.guild.id)["mediaPlaybackType"] == "tts"){
          embeddedMsg.setColor('C80000'); // red
          embeddedMsg.setTitle(`Play Command Unavailable`);
          embeddedMsg.setDescription(`Currently in **Text to Speech** mode.\nUse the *!stop* command to leave TTS-Mode`);
          embeddedMsg.setFooter(`Failed play request by ${message.guild.members.cache.get(message.author.id).displayName}`);
          message.channel.send(embeddedMsg);
          return;
         }
         else{
           embeddedMsg.setAuthor(`Now Playing`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
           embeddedMsg.setFooter(`Song requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
         
           message.channel.send(embeddedMsg).then(message.delete() );
   
           startPlaying(message, Discord, fs, msgSplit, errFile, mediaData, msgSplitUpper[1], youtubeDL, client);
         }
         return;
       }
       else if (msgSplit.length == 2 && msgSplit[1].includes('.com') ){
        errFile.missingNewFeature(message, Discord, "non-youtube play")
        return;
       }

      if(mediaData.get(message.guild.id)["mediaPlaybackType"] == "tts"){
      embeddedMsg.setColor('C80000'); // red
      embeddedMsg.setTitle(`Play Command Unavailable`);
      embeddedMsg.setDescription(`Currently in **Text to Speech** mode.\nUse the *!stop* command to leave TTS-Mode`);
      embeddedMsg.setFooter(`Failed play request by ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg);
      return;
      }
   
     var query = '';
     for (var i = 1; i < msgSplit.length; i++){ // Resolve Requested Title Name
       query += msgSplit[i];
       if (i != msgSplit.length - 1)
         query += ' ';
     }

     if (mediaData.get(message.guild.id)["playingClip"]){ // Might not need this, already in the above content
      embeddedMsg.setColor('C80000'); // red
      embeddedMsg.setTitle(`Query Search Failed`);
      embeddedMsg.setDescription(`Currently playing **clips**, not music.\nUse the **!stop** command to stop the clip playing and then re-use the **!play** command.`);
      embeddedMsg.setFooter(`Failed play request by ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg);
      return;
     }
   
     const reply = new Discord.MessageEmbed().setTimestamp()
     reply.setColor('A724A8'); // dark purple
     reply.setTitle(`Loading...`);
     reply.setAuthor(`YouTube Search`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
     reply.setFooter(`Youtube search query requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
   
   
     await message.channel.send(reply).then(async replyMsg => {
       var scrape;
       await youtubeScraper.search(query, {
         type: "video",
         limit: 5
       }).then(videos => {
         scrape = JSON.parse(JSON.stringify(videos) );
       });
   
       const queryMsg = new Discord.MessageEmbed().setTimestamp()
       queryMsg.setColor('A724A8'); // dark purple
       queryMsg.setTitle(`Pick a result via reaction`);
       queryMsg.setAuthor(`YouTube Search Results`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
       queryMsg.setDescription(`**1)** ${scrape[0].title}\n` +
                               `**2)** ${scrape[1].title}\n` +
                               `**3)** ${scrape[2].title}\n` +
                               `**4)** ${scrape[3].title}\n` +
                               `**5)** ${scrape[4].title}`
       );
       queryMsg.setFooter(`Youtube search query requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
       
       replyMsg.edit(queryMsg).then(msg => {
         
         msg.react('1⃣');
         msg.react('2⃣');
         msg.react('3⃣');
         msg.react('4⃣');
         msg.react('5⃣');
         
         const playResponseMsg = new Discord.MessageEmbed().setTimestamp()
         msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '1⃣' || reaction.emoji.name == '2⃣' || reaction.emoji.name == '3⃣' || reaction.emoji.name == '4⃣' || reaction.emoji.name == '5⃣'),
         { max: 1, time: 60000 }).then( async collected => {
             if (collected.first().emoji.name == '1⃣') {
               var link = 'https://www.youtube.com/watch?v=' + scrape[0].id;
               modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'songQueueAdd', scrape[0], client);
               playResponseMsg.setColor('A724A8'); // dark purple
               playResponseMsg.setTitle(`**${scrape[0].title}**`);
               playResponseMsg.setURL(link)
   
               if (mediaData.get(message.guild.id)["playingMusic"]){ // Already playing music //
                 playResponseMsg.setAuthor(`Queued`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song queued by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
               }
               else{
                 
                 playResponseMsg.setAuthor(`Now Playing`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song requesteed by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
   
                 startPlaying(message, Discord, fs, msgSplit, errFile, mediaData, link, youtubeDL, client);
               }
             }
             else if (collected.first().emoji.name == '2⃣') {
               var link = 'https://www.youtube.com/watch?v=' + scrape[1].id;
               modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'songQueueAdd', scrape[1], client);
               playResponseMsg.setColor('A724A8'); // dark purple
               playResponseMsg.setTitle(`**${scrape[1].title}**`);
               playResponseMsg.setURL(link)
   
               if (mediaData.get(message.guild.id)["playingMusic"]){ // Already playing music //
                 playResponseMsg.setAuthor(`Queued`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song queued by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
               }
               else{
                 
                 playResponseMsg.setAuthor(`Now Playing`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song requesteed by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
   
                 startPlaying(message, Discord, fs, msgSplit, errFile, mediaData, link, youtubeDL, client);
               }
             }
             else if (collected.first().emoji.name == '3⃣') {
               var link = 'https://www.youtube.com/watch?v=' + scrape[2].id;
               modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'songQueueAdd', scrape[2], client);
               playResponseMsg.setColor('A724A8'); // dark purple
               playResponseMsg.setTitle(`**${scrape[2].title}**`);
               playResponseMsg.setURL(link)
   
               if (mediaData.get(message.guild.id)["playingMusic"]){ // Already playing music //
                 playResponseMsg.setAuthor(`Queued`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song queued by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
               }
               else{
                 
                 playResponseMsg.setAuthor(`Now Playing`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song requesteed by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
   
                 startPlaying(message, Discord, fs, msgSplit, errFile, mediaData, link, youtubeDL, client);
               }
             }
             else if (collected.first().emoji.name == '4⃣') {
               var link = 'https://www.youtube.com/watch?v=' + scrape[3].id;
               modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'songQueueAdd', scrape[3], client);
               playResponseMsg.setColor('A724A8'); // dark purple
               playResponseMsg.setTitle(`**${scrape[3].title}**`);
               playResponseMsg.setURL(link)
   
               if (mediaData.get(message.guild.id)["playingMusic"]){ // Already playing music //
                 playResponseMsg.setAuthor(`Queued`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song queued by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
               }
               else{
                 
                 playResponseMsg.setAuthor(`Now Playing`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song requesteed by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
   
                 startPlaying(message, Discord, fs, msgSplit, errFile, mediaData, link, youtubeDL, client);
               }
             }
             else if (collected.first().emoji.name == '5⃣') {
               var link = 'https://www.youtube.com/watch?v=' + scrape[4].id;
               modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'songQueueAdd', scrape[4], client);
               playResponseMsg.setColor('A724A8'); // dark purple
               playResponseMsg.setTitle(`**${scrape[4].title}**`);
               playResponseMsg.setURL(link)
   
               if (mediaData.get(message.guild.id)["playingMusic"]){ // Already playing music //
                 playResponseMsg.setAuthor(`Queued`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song queued by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
               }
               else{
                 
                 playResponseMsg.setAuthor(`Now Playing`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song requesteed by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
   
                 startPlaying(message, Discord, fs, msgSplit, errFile, mediaData, link, youtubeDL, client);
               }
             }
         });
       });
     });  
   }
   


async function skipSwitch(message, Discord, msgSplit, errFile, youtubeDL, mediaData, client){
  if (mediaData.get(message.guild.id)['activeConnection'] == null){
    embeddedMsg.setColor('C80000'); // red
    embeddedMsg.setTitle(`Skip Command Not Required`);
    embeddedMsg.setDescription(`I'm not in any voice channel to require the *!skip* command`);
    embeddedMsg.setFooter(`Unnecessary skip command from ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);
    return;
  }
  else if (mediaData.get(message.guild.id)["playingMusic"]){
      var oldName = mediaData.get(message.guild.id)['songQueue'][0].title;
      const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
      mediaData.get(message.guild.id)['activeDispatcher'].destroy();
      mediaData.get(message.guild.id)['songQueue'].shift()
  
      if (mediaData.get(message.guild.id)['songQueue'].length == 0){
          mediaData.get(message.guild.id)['activeConnection'].disconnect();
          mediaData.get(message.guild.id)['activeVoiceChannel'] = null;
          mediaData.get(message.guild.id)['activeDispatcher'] = null;
          mediaData.get(message.guild.id)['nowPlayingMessageID'] = null;
          mediaData.get(message.guild.id)["playingMusic"] = false;
          mediaData.get(message.guild.id)["playingClip"] = false;
          mediaData.get(message.guild.id)["mediaPlaybackType"] = null;
          
          embeddedMsg.setColor('C80000'); // red
          embeddedMsg.setTitle(`Queue Empty`);
          embeddedMsg.setDescription(`There was no song queued for the player to skip to, so the player has disconnected. Start playing some more music by providing a query or link after the *!play* command.`);
          embeddedMsg.setFooter(`Player automatically stopped`);
          message.channel.send(embeddedMsg);
          return;
      }
      var nextSongLink = 'https://www.youtube.com/watch?v=' + mediaData.get(message.guild.id)['songQueue'][0].id;
      dispatcher = mediaData.get(message.guild.id)['activeConnection'].play(youtubeDL(nextSongLink, {
          volume: mediaData.get(message.guild.id)['volume'],
      }));
  
      mediaData.get(message.guild.id)['activeDispatcher'] = dispatcher;
  
      embeddedMsg.setColor('00C500'); // green
      embeddedMsg.setTitle(`Skipping Track *${oldName}*`);
      embeddedMsg.setDescription(`Now Playing: **${mediaData.get(message.guild.id)['songQueue'][0].title}**\nUse the *!pause* command to pause the player.\nUse the *!stop* command to stop what's playing`);
      embeddedMsg.setFooter(`Song skipped by ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg);
      return;
    }
    else if(mediaData.get(message.guild.id)["playingClip"]){
      var oldName = mediaData.get(message.guild.id)['clipQueue'][0];
      const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
      mediaData.get(message.guild.id)['activeDispatcher'].destroy();
      mediaData.get(message.guild.id)['clipQueue'].shift()
  
      if (mediaData.get(message.guild.id)['clipQueue'].length == 0){
          mediaData.get(message.guild.id)['activeConnection'].disconnect();
          mediaData.get(message.guild.id)['activeVoiceChannel'] = null;
          mediaData.get(message.guild.id)['activeDispatcher'] = null;
          mediaData.get(message.guild.id)['nowPlayingMessageID'] = null;
          mediaData.get(message.guild.id)["playingMusic"] = false;
          mediaData.get(message.guild.id)["playingClip"] = false;
          mediaData.get(message.guild.id)["mediaPlaybackType"] = null;
          
          embeddedMsg.setColor('C80000'); // red
          embeddedMsg.setTitle(`Queue Empty`);
          embeddedMsg.setDescription(`There was no clip queued for the player to skip to, so the player has disconnected. Start playing some more clips by providing the *!clip* command.`);
          embeddedMsg.setFooter(`Player automatically stopped`);
          message.channel.send(embeddedMsg);
          return;
      }
      dispatcher = mediaData.get(message.guild.id)['activeConnection'].play(`Clips/${mediaData.get(message.guild.id)['clipQueue'][0]}.mp3`);
      modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'activeDispatcherChange', dispatcher, client);
  
      embeddedMsg.setColor('00C500'); // green
      embeddedMsg.setTitle(`Skipping Clip *${oldName}*`);
      embeddedMsg.setDescription(`Now Playing: **${mediaData.get(message.guild.id)['clipQueue'][0]}**\nUse the *!pause* command to pause the player.\nUse the *!stop* command to stop what's playing`);
      embeddedMsg.setFooter(`Clip skipped by ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg);
      return;
    }
    else if (mediaData.get(message.guild.id)["mediaPlaybackType"] == "tts"){
      embeddedMsg.setColor('C80000'); // red
      embeddedMsg.setTitle(`Skip Command Unavailable`);
      embeddedMsg.setDescription(`Currently in **Text to Speech** mode.\nUse the *!stop* command to leave TTS-Mode`);
      embeddedMsg.setFooter(`Unnecessary skip command from ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg);
      return;
    }
    else if (mediaData.get(message.guild.id)["activeDispatcher"] == null){
      embeddedMsg.setColor('C80000'); // red
      embeddedMsg.setTitle(`Nothing To Skip`);
      embeddedMsg.setDescription(`Start playing some music by providing a query or link after the *!play* command`);
      embeddedMsg.setFooter(`Failed skip request by ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg);
      return;
    }
    else{
      errFile.unexpectedErr(message, Discord, msgSplit, "skip", client);
      return;
    }

}

async function stopSwitch(message, Discord, msgSplit, errFile, mediaData, ttsData, client){
    if (msgSplit.length != 1){
      errFile.stop(message, Discord);
      return;
    }
    const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
    if (mediaData.get(message.guild.id)['activeConnection'] == null){
      embeddedMsg.setColor('C80000'); // red
      embeddedMsg.setTitle(`Stop Command Not Required`);
      embeddedMsg.setDescription(`I'm not in any voice channel to require the *!stop* command`);
      embeddedMsg.setFooter(`Unnecessary stop command from ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg);
      return;
    }
    else{

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

        ttsData.get(message.guild.id)['enabled'] = false;
        ttsData.get(message.guild.id)['groupTTS'] = false;
        ttsData.get(message.guild.id)['targetTTSChannel'] = null;
        ttsData.get(message.guild.id)['sentenceQueue'] = [];
        ttsData.get(message.guild.id)['targetUser'] = null;

        embeddedMsg.setColor('00C500'); // green
        embeddedMsg.setTitle(`Stopping All Media...`);
        embeddedMsg.setFooter(`Media stopped by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
        return;
    }
}


async function volumeSwitch(message, Discord, msgSplit, errFile, mediaData, client){
  const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
  var dispatcherStatus = mediaData.get(message.guild.id)['activeDispatcher'];
  var connectionStatus = mediaData.get(message.guild.id)['activeConnection'];
    if (msgSplit.length == 1){
      if (dispatcherStatus == null){
        embeddedMsg.setColor('C80000'); // red
        embeddedMsg.setTitle(`Nothing Playing`);
        embeddedMsg.setDescription(`Start playing some music by providing a query or link after the *!play* command`);
        embeddedMsg.setFooter(`Failed volume request by ${message.guild.members.cache.get(message.author.id).displayName}`);
      }
      else{
        embeddedMsg.setColor('A724A8'); // dark purple
        embeddedMsg.setTitle(`Current Volume: **${mediaData.get(message.guild.id)['volume']}%**`);
        embeddedMsg.setFooter(`Volume requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
      }
      message.channel.send(embeddedMsg);
    }
    else if (msgSplit.length == 2){
      if (!isNaN(msgSplit[1]) && msgSplit[1] >= 0 && msgSplit[1] <= 200){
        if (dispatcherStatus == null){
          embeddedMsg.setColor('C80000'); // red
          embeddedMsg.setTitle(`Nothing Playing`);
          embeddedMsg.setDescription(`Start playing some music by providing a query or link after the *!play* command`);
          embeddedMsg.setFooter(`Failed volume request by ${message.guild.members.cache.get(message.author.id).displayName}`);
        }
        else{
          dispatcherStatus.setVolume(msgSplit[1] / 100);
          mediaData.get(message.guild.id)['volume'] = msgSplit
          embeddedMsg.setColor('00C500'); // dark purple
          embeddedMsg.setTitle(`Volume Set To **${msgSplit[1]}%**`);
          embeddedMsg.setFooter(`Volume changed by ${message.guild.members.cache.get(message.author.id).displayName}`);
        }
        message.channel.send(embeddedMsg);
      }
      else
        errFile.volume(message, Discord);
    }
    else
      errFile.volume(message, Discord);
}

////////////////////////////
// HELPER FUNCTIONS BELOW //
////////////////////////////

async function startPlaying(message, Discord, fs, msgSplit, errFile, mediaData, link, youtubeDL, client){
    if (!mediaData.get(message.guild.id)["playingMusic"]){
      modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'playingMusicStateChange', null, client);
      modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'mediaTypeStateChange', "music", client);
    }
    
    modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'textChannelID', message.channel.id, client);
  
    connection = await message.member.voice.channel.join();
    modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'voiceChannelID', message.member.voice.channel.id, client);
    modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'activeConnectionChange', connection, client);
  
    dispatcher = connection.play(youtubeDL(link, {
        volume: mediaData.get(message.guild.id)['volume'],
      }));
    modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'activeDispatcherChange', dispatcher, client);

    dispatcher.on('finish', () => {
      mediaData.get(message.guild.id)['songQueue'].shift()
  
      if (mediaData.get(message.guild.id)['songQueue'].length == 0){
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
        queueShift(message, Discord, fs, msgSplit, errFile, mediaData, youtubeDL, client);
      }
    });
  }
  
  function queueShift(message, Discord, fs, msgSplit, errFile, mediaData, youtubeDL, client){
      var nextSongLink = 'https://www.youtube.com/watch?v=' + mediaData.get(message.guild.id)['songQueue'][0].id;
      dispatcher = mediaData.get(message.guild.id)['activeConnection'].play(youtubeDL(nextSongLink, {
        volume: mediaData.get(message.guild.id)['volume'],
      }));
      modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, 'activeDispatcherChange', dispatcher, client);
    
      dispatcher.on('finish', () => {
        mediaData.get(message.guild.id)['songQueue'].shift()
    
        if (mediaData.get(message.guild.id)['songQueue'].length == 0){
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
          queueShift(message, Discord, fs, msgSplit, errFile, mediaData, youtubeDL, client);
        }
      });
  }
  
  function modifyQueueDatabase(message, Discord, msgSplit, errFile, mediaData, changeDescriptor, changeItem, client){
  
    var guildData = mediaData.get(message.guild.id)
    
    if (changeDescriptor == 'textChannelID'){
      guildData["mostRecentTextChannel"] = changeItem;
    }
    else if (changeDescriptor == 'voiceChannelID'){
      guildData["activeVoiceChannel"] = changeItem;
    }
    else if (changeDescriptor == 'activeConnectionChange'){
      guildData["activeConnection"] = changeItem;
    }
    else if (changeDescriptor == 'activeDispatcherChange'){
      guildData["activeDispatcher"] = changeItem;
    }
    else if (changeDescriptor == 'songQueueAdd'){
      guildData.songQueue.push(changeItem);
    }
    else if (changeDescriptor == 'clipQueueAdd'){
      guildData.clipQueue.push(changeItem);
    }
    else if (changeDescriptor == 'volumeChange'){
      guildData["volume"] = changeItem;
    }
    else if (changeDescriptor == 'nowPlayingMsgIDChange'){
      guildData["nowPlayingMessageID"] = changeItem;
    }
    else if (changeDescriptor == 'playingMusicStateChange'){
      guildData["playingMusic"] = !guildData["playingMusic"];
    }
    else if (changeDescriptor == 'playingClipStateChange'){
      guildData["playingClip"] = !guildData["playingClip"];
    }
    else if (changeDescriptor == 'mediaTypeStateChange'){
      guildData["mediaPlaybackType"] = changeItem;
    }
    else{
      errFile.unexpectedErr(message, Discord, msgSplit, "play", client);
      return;
    }
  
    mediaData.set(message.guild.id, guildData);
    return;
  }

// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { nowPlayingSwitch, pauseSwitch, playSwitch, skipSwitch, stopSwitch, volumeSwitch };