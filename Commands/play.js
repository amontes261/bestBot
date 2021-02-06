
////////////////////////////////////////////
//// play.js – JavaScript x DiscordJS //////
//// Alex Montes ––– @a.montes28#4501 //////
////////////////////////////////////////////

async function playSwitch(message, Discord, msgSplit, errFile, client, youtube){

 /* - Asynchronous function playSwitch() was designed to ONLY be called from file main.js

  - YouTube music player command – usable on any server

  - Was designed to be triggered via command: !play

  - Try !play help to have the bot to provide a usage message */
  
  errFile.missingNewFeature(message, Discord, 'play');
  return;

    const connection = await message.member.voice.channel.join();
    const dispatcher = connection.play(youtube('https://www.youtube.com/watch?v=Q3zpwgQK8Yg', {
        volume: 0.5,
      }));

}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { playSwitch };