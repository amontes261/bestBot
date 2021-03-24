
///////////////////////////////////////////
//// leave.js – JavaScript x DiscordJS ////
//// Alex Montes  ––  @a.montes28#4501 ////
///////////////////////////////////////////

async function leaveSwitch(message, Discord, fs, msgSplit, errFile, client){


    var data;
    try{ // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
    }
    catch (e){
        errFile.unexpectedErr(message, Discord, msgSplit, "leave", client);
        return;
    }

    var isMaster = data["Master"].hasOwnProperty(message.author.id);

    const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
    if (!isMaster && !message.author.id == "403355889253220352")
        errFile.permissionDenied(message, Discord, 'leave');

    const reply = new Discord.MessageEmbed()
        .setColor('EFEF00') // yellow
        .setTitle('Leave Command Received')
        .setDescription('React with the  ✅  emoji below to confirm the eviction.\nReact with the  ❌  emoji to cancel the eviction.')
        .setTimestamp()
        .setFooter(`Eviction requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    const cancelledMsg = new Discord.MessageEmbed()
        .setColor('C80000') // red
        .setTitle('Eviction Cancelled')
        .setTimestamp()
        .setFooter(`Eviction originally requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    const leaveMsg = new Discord.MessageEmbed()
        .setColor('00C500') //green 
        .setTitle('Eviction Successful')
        .setDescription("Thanks for having me here, it's been fun.")
        .setTimestamp()
        .setFooter(`Evicted by ${message.guild.members.cache.get(message.author.id).displayName}`);

    if (msgSplit.length == 1){
        await message.channel.send(reply).then(msg => {
            msg.react('✅');
            msg.react('❌');
            
            msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
            { max: 1, time: 15000 }).then( async collected => {
                if (collected.first().emoji.name == '✅') {
                    await message.channel.send(leaveMsg);
                    await msg.delete();

                    var chromozone = client.guilds.cache.get("404413479915880448");
                    if (chromozone != undefined && chromozone != null){
                        
                        var clientLogChannel = chromozone.channels.cache.get("772647489798537236");
                        const logShutdownMsg = new Discord.MessageEmbed()
                            .setColor('C80000') // red 
                            .setTitle('Removed From Server')
                            .setDescription(`bestBot has been removed from **${message.guild.name}**`)
                            .setTimestamp()
                            
                        await clientLogChannel.send(logShutdownMsg);
                    }
                    message.guild.leave();
                }
                else{
                    message.channel.send(cancelledMsg);
                    msg.delete();
                }
            });
        });
    }
    else if (msgSplit.length == 2){ // GHOST FEATURE //
        if (message.author.id != "403355889253220352"){
            errFile.leave(message, Discord);
            return;
        }

        var targetGuild;
        client.guilds.cache.forEach((guild) => {
            if (msgSplit[1] == guild.id)
                targetGuild = guild;
        })

        if (targetGuild == undefined){
            embeddedMsg.setColor('C80000'); // red
            embeddedMsg.setTitle(`Leave Command Failed`);
            embeddedMsg.setDescription(`You must enter the ID to a server that I'm **currently** active on.`);
            embeddedMsg.setFooter(`Failed eviction request by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg);
            return;
        }

        const ghostReply = new Discord.MessageEmbed()
            .setColor('EFEF00') // yellow
            .setTitle('Leave Command Received')
            .setDescription(`Are you sure you want this client to leave the server **${targetGuild.name}**?\n\nReact with the  ✅  emoji below to confirm the eviction.\nReact with the  ❌  emoji to cancel the eviction.`)
            .setTimestamp()
            .setFooter(`Eviction requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

        const ghostLeaveMsg = new Discord.MessageEmbed()
            .setColor('00C500') //green 
            .setTitle('Eviction Successful')
            .setDescription(`Successfully left server ${targetGuild.name}`)
            .setTimestamp()
            .setFooter(`Removed by ${message.guild.members.cache.get(message.author.id).displayName}`);

        await message.channel.send(ghostReply).then(msg => {
            msg.react('✅');
            msg.react('❌');
            
            msg.awaitReactions((reaction, user) => user.id == "403355889253220352" && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
            { max: 1, time: 15000 }).then( async collected => {
                if (collected.first().emoji.name == '✅') {
                    await message.channel.send(ghostLeaveMsg);
                    await msg.delete();

                    var chromozone = client.guilds.cache.get("404413479915880448");
                    if (chromozone != undefined && chromozone != null){
                        
                        var clientLogChannel = chromozone.channels.cache.get("772647489798537236");
                        const logShutdownMsg = new Discord.MessageEmbed()
                            .setColor('C80000') // red 
                            .setTitle('Removed From Server')
                            .setDescription(`bestBot has been removed from **${message.guild.name}**`)
                            .setTimestamp()
                            
                        await clientLogChannel.send(logShutdownMsg);
                    }
                    targetGuild.leave();
                }
                else{
                    message.channel.send(cancelledMsg);
                    msg.delete();
                }
            });
        });

    }
    else
        errFile.leave(message, Discord);
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { leaveSwitch };
