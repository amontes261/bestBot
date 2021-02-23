////////////////////////////////////////////////////
//// mediaControl.js – JavaScript x DiscordJS //////
//// Alex Montes ––––––––––– @a.montes28#4501 //////
////////////////////////////////////////////////////

async function nowPlayingSwitch(message, Discord, msgSplit, errFile, musicDatabase, client){
  const embeddedMsg = new Discord.MessageEmbed().setTimestamp();
  if (msgSplit.length == 1){
    if (musicDatabase.get(message.guild.id)['activeDispatcher'] == null){
      embeddedMsg.setColor('C80000'); // red
      embeddedMsg.setTitle(`Nothing Playing`);
      embeddedMsg.setDescription(`Start playing some music by providing a query or link after the *!play* command`);
      embeddedMsg.setFooter(`Failed play request by ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg);
      return;
    }

    embeddedMsg.setColor('A724A8'); // dark purple
    embeddedMsg.setTitle(`Now Playing: **${musicDatabase.get(message.guild.id)['songQueue'][0].title}**`);
    embeddedMsg.setDescription(`Songs Remaining In Queue: ${musicDatabase.get(message.guild.id)['songQueue'].length - 1}`);
    embeddedMsg.setFooter(`Now playing UI requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg).then(msg => {
      msg.react('⏪');
      msg.react('⏸');
      msg.react('⏩');
      musicDatabase.get(message.guild.id)['nowPlayingMessageID'] = msg.id;
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
  else
    errFile.nowPlaying(message, Discord);
}

async function pauseSwitch(message, Discord, msgSplit, errFile, musicDatabase, client){
    const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
    if (msgSplit.length != 1)
        errFile.pause(message, Discord);
    else if (musicDatabase.get(message.guild.id)['activeConnection'] == null){
        embeddedMsg.setColor('C80000'); // red
        embeddedMsg.setTitle(`Pause Command Not Required`);
        embeddedMsg.setDescription(`I'm not in any voice channel to require the *!stop* command`);
        embeddedMsg.setFooter(`Unnecessary pause command from ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
        return;
    }
    else if(musicDatabase.get(message.guild.id)['activeDispatcher'] == null){
        embeddedMsg.setColor('C80000'); // red
        embeddedMsg.setTitle(`Pause Command Not Required`);
        embeddedMsg.setDescription(`There's nothing to pause.\nUse the *!play* command to start playing some music.`);
        embeddedMsg.setFooter(`Unnecessary pause command from ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
        return;
    }
    else{
        musicDatabase.get(message.guild.id)['activeDispatcher'].pause();
        musicDatabase.get(message.guild.id)['playing'] = false;
        embeddedMsg.setColor('00C500'); // green
        embeddedMsg.setTitle(`Player Paused`);
        embeddedMsg.setDescription(`Use the *!play* command to resume the player.`);
        embeddedMsg.setFooter(`Paused by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
        return;
    }
}

async function playSwitch(message, Discord, msgSplit, msgSplitUpper, errFile, client, youtubeDL, youtubeScraper, musicDatabase){

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
   
       if (msgSplit.length == 1){ // Already playing
         if (musicDatabase.get(message.guild.id)['playing'] ){
           embeddedMsg.setColor('C80000'); // red
           embeddedMsg.setTitle(`Already Playing`);
           embeddedMsg.setDescription(`Use the *!pause* command to pause what's playing\nUse the *!stop* command to stop what's playing`);
           embeddedMsg.setFooter(`Failed play request by ${message.guild.members.cache.get(message.author.id).displayName}`);
           message.channel.send(embeddedMsg);
           return;
         }
         else if (musicDatabase.get(message.guild.id)['activeDispatcher'] == null){ // not playing, no dispatcher playing
           embeddedMsg.setColor('C80000'); // red
           embeddedMsg.setTitle(`Nothing Playing`);
           embeddedMsg.setDescription(`Start playing some music by providing a query or link after the *!play* command`);
           embeddedMsg.setFooter(`Failed play request by ${message.guild.members.cache.get(message.author.id).displayName}`);
           message.channel.send(embeddedMsg);
           return;
         }
         else{
           // resume
           musicDatabase.get(message.guild.id)['activeDispatcher'].resume();
           musicDatabase.get(message.guild.id)['playing'] = true;
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
         modifyQueueDatabase(message, Discord, msgSplit, errFile, musicDatabase, 'songQueueAdd', videoData, client);
         embeddedMsg.setColor('A724A8'); // dark purple
         embeddedMsg.setTitle(`**${videoData.title}**`);
         embeddedMsg.setURL(msgSplitUpper[1])
   
         if (musicDatabase.get(message.guild.id)["playing"]){ // Already playing music //
           embeddedMsg.setAuthor(`Queued`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
           embeddedMsg.setFooter(`Song queued by ${message.guild.members.cache.get(message.author.id).displayName}`);
         
           message.channel.send(embeddedMsg).then(message.delete() );
         }
         else{
           embeddedMsg.setAuthor(`Now Playing`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
           embeddedMsg.setFooter(`Song requesteed by ${message.guild.members.cache.get(message.author.id).displayName}`);
         
           message.channel.send(embeddedMsg).then(message.delete() );
   
           startPlaying(message, Discord, msgSplit, errFile, musicDatabase, msgSplitUpper[1], youtubeDL, client);
         }
         return;
       }
       else if (msgSplit.length == 2 && msgSplit[1].includes('.com') ){
         // Unsupported Link Case
       }
   
   
     var query = '';
     for (var i = 1; i < msgSplit.length; i++){ // Resolve Requested Title Name
       query += msgSplit[i];
       if (i != msgSplit.length - 1)
         query += ' ';
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
               modifyQueueDatabase(message, Discord, msgSplit, errFile, musicDatabase, 'songQueueAdd', scrape[0], client);
               playResponseMsg.setColor('A724A8'); // dark purple
               playResponseMsg.setTitle(`**${scrape[0].title}**`);
               playResponseMsg.setURL(link)
   
               if (musicDatabase.get(message.guild.id)["playing"]){ // Already playing music //
                 playResponseMsg.setAuthor(`Queued`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song queued by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
               }
               else{
                 
                 playResponseMsg.setAuthor(`Now Playing`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song requesteed by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
   
                 startPlaying(message, Discord, msgSplit, errFile, musicDatabase, link, youtubeDL, client);
               }
             }
             else if (collected.first().emoji.name == '2⃣') {
               var link = 'https://www.youtube.com/watch?v=' + scrape[1].id;
               modifyQueueDatabase(message, Discord, msgSplit, errFile, musicDatabase, 'songQueueAdd', scrape[1], client);
               playResponseMsg.setColor('A724A8'); // dark purple
               playResponseMsg.setTitle(`**${scrape[1].title}**`);
               playResponseMsg.setURL(link)
   
               if (musicDatabase.get(message.guild.id)["playing"]){ // Already playing music //
                 playResponseMsg.setAuthor(`Queued`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song queued by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
               }
               else{
                 
                 playResponseMsg.setAuthor(`Now Playing`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song requesteed by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
   
                 startPlaying(message, Discord, msgSplit, errFile, musicDatabase, link, youtubeDL, client);
               }
             }
             else if (collected.first().emoji.name == '3⃣') {
               var link = 'https://www.youtube.com/watch?v=' + scrape[2].id;
               modifyQueueDatabase(message, Discord, msgSplit, errFile, musicDatabase, 'songQueueAdd', scrape[2], client);
               playResponseMsg.setColor('A724A8'); // dark purple
               playResponseMsg.setTitle(`**${scrape[2].title}**`);
               playResponseMsg.setURL(link)
   
               if (musicDatabase.get(message.guild.id)["playing"]){ // Already playing music //
                 playResponseMsg.setAuthor(`Queued`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song queued by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
               }
               else{
                 
                 playResponseMsg.setAuthor(`Now Playing`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song requesteed by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
   
                 startPlaying(message, Discord, msgSplit, errFile, musicDatabase, link, youtubeDL, client);
               }
             }
             else if (collected.first().emoji.name == '4⃣') {
               var link = 'https://www.youtube.com/watch?v=' + scrape[3].id;
               modifyQueueDatabase(message, Discord, msgSplit, errFile, musicDatabase, 'songQueueAdd', scrape[3], client);
               playResponseMsg.setColor('A724A8'); // dark purple
               playResponseMsg.setTitle(`**${scrape[3].title}**`);
               playResponseMsg.setURL(link)
   
               if (musicDatabase.get(message.guild.id)["playing"]){ // Already playing music //
                 playResponseMsg.setAuthor(`Queued`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song queued by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
               }
               else{
                 
                 playResponseMsg.setAuthor(`Now Playing`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song requesteed by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
   
                 startPlaying(message, Discord, msgSplit, errFile, musicDatabase, link, youtubeDL, client);
               }
             }
             else if (collected.first().emoji.name == '5⃣') {
               var link = 'https://www.youtube.com/watch?v=' + scrape[4].id;
               modifyQueueDatabase(message, Discord, msgSplit, errFile, musicDatabase, 'songQueueAdd', scrape[4], client);
               playResponseMsg.setColor('A724A8'); // dark purple
               playResponseMsg.setTitle(`**${scrape[4].title}**`);
               playResponseMsg.setURL(link)
   
               if (musicDatabase.get(message.guild.id)["playing"]){ // Already playing music //
                 playResponseMsg.setAuthor(`Queued`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song queued by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
               }
               else{
                 
                 playResponseMsg.setAuthor(`Now Playing`, 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
                 playResponseMsg.setFooter(`Song requesteed by ${message.guild.members.cache.get(message.author.id).displayName}`);
               
                 message.channel.send(playResponseMsg).then(msg.delete() );
   
                 startPlaying(message, Discord, msgSplit, errFile, musicDatabase, link, youtubeDL, client);
               }
             }
         });
       });
     });  
   }
   


async function skipSwitch(message, Discord, msgSplit, errFile, youtubeDL, musicDatabase, client){
    var oldName = musicDatabase.get(message.guild.id)['songQueue'][0].title;
    const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
    musicDatabase.get(message.guild.id)['activeDispatcher'].destroy();
    musicDatabase.get(message.guild.id)['songQueue'].shift()

    if (musicDatabase.get(message.guild.id)['songQueue'].length == 0){
        musicDatabase.get(message.guild.id)['activeConnection'].disconnect();
        musicDatabase.get(message.guild.id)['activeVoiceChannel'] = null;
        musicDatabase.get(message.guild.id)['activeDispatcher'] = null;
        musicDatabase.get(message.guild.id)['nowPlayingMessageID'] = null;
        musicDatabase.get(message.guild.id)['playing'] = false;
        
        embeddedMsg.setColor('C80000'); // red
        embeddedMsg.setTitle(`Queue Empty`);
        embeddedMsg.setDescription(`There was no song queued for the player to skip to, so the player has disconnected. Start playing some more music by providing a query or link after the *!play* command.`);
        embeddedMsg.setFooter(`Player automatically stopped`);
        message.channel.send(embeddedMsg);
        return;
    }
    var nextSongLink = 'https://www.youtube.com/watch?v=' + musicDatabase.get(message.guild.id)['songQueue'][0].id;
    dispatcher = musicDatabase.get(message.guild.id)['activeConnection'].play(youtubeDL(nextSongLink, {
        volume: musicDatabase.get(message.guild.id)['volume'],
    }));

    musicDatabase.get(message.guild.id)['activeDispatcher'] = dispatcher;

    embeddedMsg.setColor('00C500'); // green
    embeddedMsg.setTitle(`Skipping Track *${oldName}*`);
    embeddedMsg.setDescription(`Now Playing: **${musicDatabase.get(message.guild.id)['songQueue'][0].title}**\nUse the *!pause* command to pause the player.\nUse the *!stop* command to stop what's playing`);
    embeddedMsg.setFooter(`Song skipped by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);
    return;


}

async function stopSwitch(message, Discord, msgSplit, errFile, musicDatabase, client){
    if (msgSplit.length != 1){
      errFile.stop(message, Discord);
      return;
    }
    const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
    if (musicDatabase.get(message.guild.id)['activeConnection'] == null){
      embeddedMsg.setColor('C80000'); // red
      embeddedMsg.setTitle(`Stop Command Not Required`);
      embeddedMsg.setDescription(`I'm not in any voice channel to require the *!stop* command`);
      embeddedMsg.setFooter(`Unnecessary stop command from ${message.guild.members.cache.get(message.author.id).displayName}`);
      message.channel.send(embeddedMsg);
      return;
    }
    else{

        musicDatabase.get(message.guild.id)['activeDispatcher'].destroy();
        musicDatabase.get(message.guild.id)['activeConnection'].disconnect();

        musicDatabase.get(message.guild.id)['activeVoiceChannel'] = null;
        musicDatabase.get(message.guild.id)['activeDispatcher'] = null;
        musicDatabase.get(message.guild.id)['songQueue'] = [];
        musicDatabase.get(message.guild.id)['nowPlayingMessageID'] = null;
        musicDatabase.get(message.guild.id)['playing'] = false;

        embeddedMsg.setColor('00C500'); // green
        embeddedMsg.setTitle(`Stopping...`);
        embeddedMsg.setFooter(`Player stopped by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
        return;
    }
}


async function volumeSwitch(message, Discord, msgSplit, errFile, musicDatabase, client){
  const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
  var dispatcherStatus = musicDatabase.get(message.guild.id)['activeDispatcher'];
    if (msgSplit.length == 1){
      if (dispatcherStatus == null){
        embeddedMsg.setColor('C80000'); // red
        embeddedMsg.setTitle(`Nothing Playing`);
        embeddedMsg.setDescription(`Start playing some music by providing a query or link after the *!play* command`);
        embeddedMsg.setFooter(`Failed volume request by ${message.guild.members.cache.get(message.author.id).displayName}`);
      }
      else{
        embeddedMsg.setColor('A724A8'); // dark purple
        embeddedMsg.setTitle(`Current Volume: **${dispatcherStatus.volume * 100}%**`);
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
          musicDatabase.get(message.guild.id)['volume'] = msgSplit
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

async function startPlaying(message, Discord, msgSplit, errFile, musicDatabase, link, youtubeDL, client){
    if (!musicDatabase.get(message.guild.id)['playing'])
      modifyQueueDatabase(message, Discord, msgSplit, errFile, musicDatabase, 'playingStateChange', null, client);
    
    modifyQueueDatabase(message, Discord, msgSplit, errFile, musicDatabase, 'textChannelID', message.channel.id, client);
  
    connection = await message.member.voice.channel.join();
    modifyQueueDatabase(message, Discord, msgSplit, errFile, musicDatabase, 'voiceChannelID', message.member.voice.channel.id, client);
    modifyQueueDatabase(message, Discord, msgSplit, errFile, musicDatabase, 'activeConnectionChange', connection, client);
  
  
    dispatcher = connection.play(youtubeDL(link, {
        volume: musicDatabase.get(message.guild.id)['volume'],
      }));
  
    dispatcher.on('finish', () => {
      musicDatabase.get(message.guild.id)['songQueue'].shift()
  
      if (musicDatabase.get(message.guild.id)['songQueue'].length == 0){
        musicDatabase.get(message.guild.id)['activeDispatcher'].destroy();
        musicDatabase.get(message.guild.id)['activeConnection'].disconnect();
  
        musicDatabase.get(message.guild.id)['activeVoiceChannel'] = null;
        musicDatabase.get(message.guild.id)['activeDispatcher'] = null;
        musicDatabase.get(message.guild.id)['songQueue'] = [];
        musicDatabase.get(message.guild.id)['nowPlayingMessageID'] = null;
        musicDatabase.get(message.guild.id)['playing'] = false;
  
        const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
        embeddedMsg.setColor('00C500'); // green
        embeddedMsg.setTitle(`Queue End Reached`);
        embeddedMsg.setFooter(`Player automatically stopped`);
        message.channel.send(embeddedMsg);
        return;
      }
      else{
        queueShift(message, Discord, msgSplit, errFile, musicDatabase, youtubeDL, client);
      }
    });
    modifyQueueDatabase(message, Discord, msgSplit, errFile, musicDatabase, 'activeDispatcherChange', dispatcher, client);
  }
  
  function queueShift(message, Discord, msgSplit, errFile, musicDatabase, youtubeDL, client){
    var nextSongLink = 'https://www.youtube.com/watch?v=' + musicDatabase.get(message.guild.id)['songQueue'][0].id;
    dispatcher = musicDatabase.get(message.guild.id)['activeConnection'].play(youtubeDL(nextSongLink, {
      volume: musicDatabase.get(message.guild.id)['volume'],
    }));
    modifyQueueDatabase(message, Discord, msgSplit, errFile, musicDatabase, 'activeDispatcherChange', dispatcher, client);
  
    dispatcher.on('finish', () => {
      musicDatabase.get(message.guild.id)['songQueue'].shift()
  
      if (musicDatabase.get(message.guild.id)['songQueue'].length == 0){
        musicDatabase.get(message.guild.id)['activeDispatcher'].destroy();
        musicDatabase.get(message.guild.id)['activeConnection'].disconnect();
  
        musicDatabase.get(message.guild.id)['activeVoiceChannel'] = null;
        musicDatabase.get(message.guild.id)['activeDispatcher'] = null;
        musicDatabase.get(message.guild.id)['songQueue'] = [];
        musicDatabase.get(message.guild.id)['nowPlayingMessageID'] = null;
        musicDatabase.get(message.guild.id)['playing'] = false;
  
        const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
        embeddedMsg.setColor('00C500'); // green
        embeddedMsg.setTitle(`Queue End Reached`);
        embeddedMsg.setFooter(`Player automatically stopped`);
        message.channel.send(embeddedMsg);
        return;
      }
      else{
        queueShift(message, Discord, msgSplit, errFile, musicDatabase, youtubeDL, client);
      }
    });
  }
  
  function modifyQueueDatabase(message, Discord, msgSplit, errFile, musicDatabase, changeDescriptor, changeItem, client){
  
    var guildData = musicDatabase.get(message.guild.id)
    
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
    else if (changeDescriptor == 'volumeChange'){
      guildData["volume"] = changeItem;
    }
    else if (changeDescriptor == 'nowPlayingMsgIDChange'){
      guildData["nowPlayingMessageID"] = changeItem;
    }
    else if (changeDescriptor == 'playingStateChange'){
      guildData["playing"] = !guildData["playing"];
    }
    else{
      errFile.unexpectedErr(message, Discord, msgSplit, "play", client);
      return;
    }
  
    musicDatabase.set(message.guild.id, guildData);
    return;
  }

// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { nowPlayingSwitch, pauseSwitch, playSwitch, skipSwitch, stopSwitch, volumeSwitch };