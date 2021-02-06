
////////////////////////////////////////////
//// summon.js – JavaScript x DiscordJS ////
//// Alex Montes  –––  @a.montes28#4501 ////
////////////////////////////////////////////

async function summonSwitch(message, Discord, msgSplit, errFile){

/* - Function summonSwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic, ease-of-life command – usable on any server

    - Was designed to be triggered via command: !summon

    - Try !summon help to have the bot to provide a usage message */

    const embeddedMsg = new Discord.MessageEmbed();
    if (msgSplit.length == 1){
        errFile.summon(message, Discord);
    }
    else if (msgSplit.length == 2){
        if (msgSplit[1] == "help")
            errFile.summon(message, Discord);
        else if (message.mentions.members.size != 0){
            if (message.author.id == message.mentions.members.first().user.id ){
                embeddedMsg.setColor('C80000') // red
                    .setTitle('Summon Failed')
                    .setDescription(`Looks like you've summoned yourself here...`)
                    .setTimestamp()
                    .setFooter(`Failed summon by ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(embeddedMsg);
                return;
            }
            else{
                var inviteCreated = false;
                var inviteLink = '';
                var description = `Looking for <@${message.mentions.members.first().user.id}>`;

                if (message.guild.members.cache.get(message.author.id).voice.channelID != null){
                    if(message.guild.members.cache.get(message.mentions.members.first().user.id).voice.channelID != message.guild.members.cache.get(message.author.id).voice.channelID){
                        inviteLink = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
                        inviteCreated = true;
                        description += `\n*Click* ***Join Voice*** *below to Join ${message.guild.members.cache.get(message.author.id).displayName}'s Voice Channel*`
                    }
                }
                /*
                message.guild.fetchInvites().then(invites => {
                    invites.forEach((inv) => {
                        if (inv.code == invite){
                            inviteChannelName = inv.channel.name;
                        }
                    });
                }); 
                */
                embeddedMsg.setTitle(`Someone's Requesting Your Attention`)
                embeddedMsg.setColor('00CBFF') // baby blue
                embeddedMsg.setDescription(description)
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

                message.channel.send(embeddedMsg);
                if (inviteCreated)
                    message.channel.send("discord.gg/" + inviteLink)
                message.delete();
            }
        }
        else
            errFile.summon(message, Discord);
    }
    else if (msgSplit.length == 3){
        if (message.mentions.members.size != 1 || msgSplit[1].length != 22){
            errFile.summon(message, Discord);
            return;
        }
        else{
            if (msgSplit[2] == "dm"){
                var inviteCreated = false;
                var inviteLink = '';
                var description = `<@${message.author.id}> from ${message.guild.name} Discord Server wants your attention`;

                if (message.guild.members.cache.get(message.author.id).voice.channelID != null){
                    if(message.guild.members.cache.get(message.mentions.members.first().user.id).voice.channelID != message.guild.members.cache.get(message.author.id).voice.channelID){
                        inviteLink = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
                        inviteCreated = true;
                        description += `\n*Click* ***Join Voice*** *below to Join their Voice Channel*`
                    }
                }

                embeddedMsg.setTitle(`Someone's Requesting Your Attention`)
                embeddedMsg.setColor('00CBFF') // baby blue
                embeddedMsg.setDescription(description)
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Requested by ${message.guild.members.cache.get(message.author.id).displayName}`);


                await message.guild.members.cache.get(message.mentions.members.first().user.id).send(embeddedMsg);
                if (inviteCreated)
                    await message.guild.members.cache.get(message.mentions.members.first().user.id).send("discord.gg/" + inviteLink)
                message.delete();

                embeddedMsg.setTitle(`DM Summon Successful`)
                embeddedMsg.setColor('00C500') // green
                embeddedMsg.setDescription(`DM to ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName} successful.`)
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Summon by ${message.guild.members.cache.get(message.author.id).displayName}`);

                message.channel.send(embeddedMsg);
            }
            else if (!isNaN(msgSplit[2]) && msgSplit[2] > 0){
                
                if (msgSplit[3] > 5){
                    embeddedMsg.setTitle(`Summon Failed`)
                    embeddedMsg.setColor('C80000') // red
                    embeddedMsg.setDescription(`The number of pings you've entered is too high.\nThe maximum number of pings allowed is 5.`)
                    embeddedMsg.setTimestamp()
                    embeddedMsg.setFooter(`Failed summon requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
        
                    message.channel.send(embeddedMsg);
                    return;
                }

                var inviteCreated = false;
                var inviteLink = '';
                var description = `Looking for <@${message.mentions.members.first().user.id}>`;

                if (message.guild.members.cache.get(message.author.id).voice.channelID != null){
                    if(message.guild.members.cache.get(message.mentions.members.first().user.id).voice.channelID != message.guild.members.cache.get(message.author.id).voice.channelID){
                        inviteLink = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
                        inviteCreated = true;
                        description += `\n*Click* ***Join Voice*** *below to Join ${message.guild.members.cache.get(message.author.id).displayName}'s Voice Channel*`
                    }
                }

                embeddedMsg.setTitle(`Someone's Requesting Your Attention`)
                embeddedMsg.setColor('00CBFF') // baby blue
                embeddedMsg.setDescription(description)
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

                for (var i = 0; i < msgSplit[2]; i++)
                    await message.channel.send(embeddedMsg);
                if (inviteCreated)
                    await message.channel.send("discord.gg/" + inviteLink)
                message.delete();

                for (var i = 0; i < msgSplit[2] - 1; i++)
                    await message.channel.send(`<@${message.mentions.members.first().user.id}>`).then(msg => {msg.delete()})
            }
        }
    }
    else if (msgSplit.length == 4){
        if (message.mentions.members.size != 1 || msgSplit[1].length != 22 || msgSplit[2] != "dm" || isNaN(msgSplit[3]) || msgSplit[3] < 0){
            errFile.summon(message, Discord);
            return;
        }
        
        if (msgSplit[3] > 5){
            embeddedMsg.setTitle(`DM Summon Failed`)
            embeddedMsg.setColor('C80000') // red
            embeddedMsg.setDescription(`The number of pings you've entered is too high.\nThe maximum number of pings allowed is 5.`)
            embeddedMsg.setTimestamp()
            embeddedMsg.setFooter(`Failed DM summon requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

            message.channel.send(embeddedMsg);
            return;
        }

        var inviteCreated = false;
        var inviteLink = '';
        var description = `<@${message.author.id}> from ${message.guild.name} Discord Server wants your attention`;

        if (message.guild.members.cache.get(message.author.id).voice.channelID != null){
            if(message.guild.members.cache.get(message.mentions.members.first().user.id).voice.channelID != message.guild.members.cache.get(message.author.id).voice.channelID){
                inviteLink = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
                inviteCreated = true;
                description += `\n*Click* ***Join Voice*** *below to Join their Voice Channel*`
            }
        }

        embeddedMsg.setTitle(`Someone's Requesting Your Attention`)
        embeddedMsg.setColor('00CBFF') // baby blue
        embeddedMsg.setDescription(description)
        embeddedMsg.setTimestamp()
        embeddedMsg.setFooter(`Requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

        for (var i = 0; i < msgSplit[3]; i++)
            await message.guild.members.cache.get(message.mentions.members.first().user.id).send(embeddedMsg);
        if (inviteCreated)
            await message.guild.members.cache.get(message.mentions.members.first().user.id).send("discord.gg/" + inviteLink)
        message.delete();

        embeddedMsg.setTitle(`Summon Successful`)
        embeddedMsg.setColor('00C500') // green
        embeddedMsg.setDescription(`Successfully sent ${msgSplit[3]} DMs to ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}.`)
        embeddedMsg.setTimestamp()
        embeddedMsg.setFooter(`Summon by ${message.guild.members.cache.get(message.author.id).displayName}`);

        message.channel.send(embeddedMsg);
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { summonSwitch };