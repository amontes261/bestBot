
function coinflipSwitch(message, Discord, msgSplit, errFile){
    if (msgSplit.length != 1){
        errFile.coinflip(message, Discord);
    }
    else{
        var coin = parseInt( Math.random() * 2 , 10);
        // console.log(coin);

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
        message.delete();
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { coinflipSwitch };