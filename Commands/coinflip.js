
////////////////////////////////////////////////
//// coinflip.js – JavaScript x DiscordJS //////
//// Alex Montes  –––––  @a.montes28#4501 //////
////////////////////////////////////////////////

function coinflipSwitch(message, Discord, msgSplit, errFile){

/* - Function coinflipSwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic command – usable on any server

    - Was designed to be triggered via command: !coinflip

    - Try !coinflip help to have the bot to provide a usage message */
   
    if (msgSplit.length != 1){ // Incorrect command usage message //
        errFile.coinflip(message, Discord);
    }
    else{ // Execute coinflip command //
        var coin = parseInt( Math.random() * 2 , 10); 

        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('00C500') // green
            .setTimestamp()
            .setFooter(`Coinflip requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

        if (coin == 0){
            embeddedMsg.setTitle('Heads');
            embeddedMsg.setDescription("The result of the requested coinflip is **heads**.");
        }
        else{
            embeddedMsg.setTitle('Tails');
            embeddedMsg.setDescription("The result of the requested coinflip is **tails**.");
        }
        
        message.channel.send(embeddedMsg);
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { coinflipSwitch };