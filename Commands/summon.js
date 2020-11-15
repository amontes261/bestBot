
async function summonSwitch(message, Discord, msgSplit, errFile){
    if (msgSplit.length == 1){
        errFile.summon(message, Discord);
    }
    else if (msgSplit.length == 2){
        if (msgSplit.length == 2 && msgSplit[1].length == 22){
            if (message.author.id == msgSplit[1].substring(3, msgSplit[1].length - 1) ){
                message.channel.send("Seems like you've summoned yourself here...");
                return;
            }
            message.channel.send(`${msgSplit[1]} ------ Member <@${message.author.id}> wants your attention`);
            if (message.guild.members.cache.get(message.author.id).voice.channelID != null){
                if (message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).voice.channelID != message.guild.members.cache.get(message.author.id).voice.channelID){ // if user searching for isnt in same channel
                    let invite = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
                    message.channel.send("Join here: discord.gg/" + invite);
                }
            }
            message.delete();
        }
        else
            errFile.summon(message, Discord);
    }
    else if (msgSplit.length == 3 && msgSplit[1].length == 22){
        if (message.author.id == msgSplit[1].substring(3, msgSplit[1].length - 1) )
            message.channel.send("Seems like you've summoned yourself here...");
        else if (msgSplit[2] == "dm"){
            message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).send(`<@${message.author.id}> from the CHROMOZONE Discord Server wants your attention.`);
            if (message.guild.members.cache.get(message.author.id).voice.channelID != null){
                if (message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).voice.channelID != message.guild.members.cache.get(message.author.id).voice.channelID){ // if user searching for isnt in same channel
                    let invite = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
                    message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).send("Join here: discord.gg/" + invite);
                }
            }
            message.delete();
            message.channel.send(`<@${message.author.id}> ==> Successfully summoned ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName} via DM.`);
        }
        else if (!isNaN(msgSplit[2]) && msgSplit[2] > 0){
            if (msgSplit[3] > 5)
                message.channel.send("The maximum number of pings that can be sent is 5. Please enter a valid number, or no number to ping once.");
            else{
                for (var i = 0; i < msgSplit[2] - 1; i++){
                    message.channel.send(msgSplit[1]);
                }
                message.channel.send(`${msgSplit[1]} ------ Member <@${message.author.id}> wants your attention`);

                if (message.guild.members.cache.get(message.author.id).voice.channelID != null){
                    if (message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).voice.channelID != message.guild.members.cache.get(message.author.id).voice.channelID){ // if user searching for isnt in same channel
                        let invite = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
                        message.channel.send("Join here: discord.gg/" + invite);
                    }
                }
                message.delete();
            }
        }
        else
            errFile.summon(message, Discord);
    }

    else if(msgSplit.length == 4 && msgSplit[1].length == 22 && msgSplit[2] == "dm" && (!isNaN(msgSplit[3]) && msgSplit[3] > 0) ){
        if (message.author.id == msgSplit[1].substring(3, msgSplit[1].length - 1) )
            message.channel.send("Seems like you've summoned yourself here...");
        else if (msgSplit[3] > 5)
            message.channel.send("The maximum number of pings that can be sent is 5. Please enter a valid number, or no number to ping once.");
        else{
            for (var i = 0; i < msgSplit[3] - 1; i++){
                message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).send(`${msgSplit[1]}`);
                
            }
            message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).send(`<@${message.author.id}> from the CHROMOZONE Discord Server wants your attention.`);


            if (message.guild.members.cache.get(message.author.id).voice.channelID != null){
                if (message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).voice.channelID != message.guild.members.cache.get(message.author.id).voice.channelID){ // if user searching for isnt in same channel
                    let invite = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
                    message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).send("Join here: discord.gg/" + invite);
                }
            }
            message.delete();
            if (msgSplit[3] != 1)
                message.channel.send(`<@${message.author.id}> ==> Successfully summoned ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName} ${msgSplit[3]} times via DM.`)
            else
                message.channel.send(`<@${message.author.id}> ==> Successfully summoned ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName} via DM.`)
        }
    }
    else
        errFile.summon(message, Discord);


}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { summonSwitch };