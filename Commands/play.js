
async function playSwitch(message, Discord, youtube, msgSplit, errFile){
    


    const connection = await message.member.voice.channel.join();
    const dispatcher = connection.play(youtube('https://www.youtube.com/watch?v=Q3zpwgQK8Yg', {
        volume: 0.5,
      }));

}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { playSwitch };