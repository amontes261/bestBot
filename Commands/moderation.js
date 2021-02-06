
//////////////////////////////////////////////////
//// moderation.js – JavaScript x DiscordJS //////
//// Alex Montes ––––––––– @a.montes28#4501 //////
//////////////////////////////////////////////////

function banSwitch(message, Discord, fs, msgSplit, errFile){

 /* - Function banSwitch() was designed to ONLY be called from file main.js

    - Meant to aid in server moderation and special-command usage priveleges

    - Was designed to be triggered via command: !ban

    - Try !ban help to have the bot to provide a usage message */
        
    if(!hasPermission(message, fs) ){
        errFile.permissionDenied(message, Discord, "ban")
        return;
    }

    if (msgSplit.length == 2){
        if (msgSplit[1] == "help"){ // Command usage message requested //
            errFile.ban(message, Discord);
        }
        else if (msgSplit[1].length == 22 && message.mentions.members.size != 0){
            
            if (message.mentions.members.first().user.id == message.author.id){
                message.channel.send(`<@${message.author.id}> You can't ban yourself–– you shouldn't even want to.`);
                return;
            }
            else if (message.mentions.members.first().user.id == "403355889253220352"){ // make myself immune
                message.channel.send(`<@${message.author.id}> I can't ban this user.`);
                return;
            }
            else if (message.mentions.members.first().hasPermission('ADMINISTRATOR') ){
                message.channel.send(`<@${message.author.id}> I can't ban this user because he/she's a moderator.`);
                return;
            }
            else if (isGuildOwner(message, message.mentions.members.first().user.id) ){
                message.channel.send(`<@${message.author.id}> You can't ban the server owner.`);
                return;
            }
            
            runBanCommand(message, Discord, message.mentions.members.first().user.id, '');
        }
        else{
            errFile.ban(message, Discord);
        }
    }
    else if (msgSplit.length >= 3){
        if (msgSplit[1].length == 22 && message.mentions.members.size != 0){
            if (message.mentions.members.first().user.id == message.author.id){
                message.channel.send(`<@${message.author.id}> You can't ban yourself–– you shouldn't even want to.`);
                return;
            }
            else if (message.mentions.members.first().user.id == "403355889253220352"){ // make myself immune
                message.channel.send(`<@${message.author.id}> I can't ban this user.`);
                return;
            }
            else if (message.mentions.members.first().hasPermission('ADMINISTRATOR') ){
                message.channel.send(`<@${message.author.id}> I can't ban this user because he/she's a moderator.`);
                return;
            }
            else if (isGuildOwner(message, message.mentions.members.first().user.id) ){
                message.channel.send(`<@${message.author.id}> You can't ban the server owner.`);
                return;
            }

            var reasonString = '';
            for (var i = 2; i < msgSplit.length; i++){
                reasonString += msgSplit[i];
                if (i != msgSplit.length - 1)
                    reasonString += ' ';
            }
            
            runBanCommand(message, Discord, message.mentions.members.first().user.id, reasonString);
        }
        else{
            errFile.ban(message, Discord);
        }
    }
    else{
        errFile.ban(message, Discord);
    }
}

function kickSwitch(message, Discord, fs, msgSplit, errFile){

 /* - Function kickSwitch() was designed to ONLY be called from file main.js

    - Meant to aid in server moderation and special-command usage priveleges

    - Was designed to be triggered via command: !kick

    - Try !kick help to have the bot to provide a usage message */
        
    if(!hasPermission(message, fs) ){
        errFile.permissionDenied(message, Discord, "kick")
        return;
    }

    if (msgSplit.length == 2){
        if (msgSplit[1] == "help"){ // Command usage message requested //
            errFile.kick(message, Discord);
        }
        else if (msgSplit[1].length == 22 && message.mentions.members.size != 0){
            
            if (message.mentions.members.first().user.id == message.author.id){
                message.channel.send(`<@${message.author.id}> You can't kick yourself–– you shouldn't even want to.`);
                return;
            }
            else if (message.mentions.members.first().user.id == "403355889253220352"){ // make myself immune
                message.channel.send(`<@${message.author.id}> I can't kick this user.`);
                return;
            }
            else if (message.mentions.members.first().hasPermission('ADMINISTRATOR') ){
                message.channel.send(`<@${message.author.id}> I can't kick this user because he/she's a moderator.`);
                return;
            }
            else if (isGuildOwner(message, message.mentions.members.first().user.id) ){
                message.channel.send(`<@${message.author.id}> You can't kick the server owner.`);
                return;
            }
            
            runKickCommand(message, Discord, message.mentions.members.first().user.id, '');
        }
        else{
            errFile.kick(message, Discord);
        }
    }
    else if (msgSplit.length >= 3){
        if (msgSplit[1].length == 22 && message.mentions.members.size != 0){
            if (message.mentions.members.first().user.id == message.author.id){
                message.channel.send(`<@${message.author.id}> You can't kick yourself–– you shouldn't even want to.`);
                return;
            }
            else if (message.mentions.members.first().user.id == "403355889253220352"){ // make myself immune
                message.channel.send(`<@${message.author.id}> I can't kick this user.`);
                return;
            }
            else if (message.mentions.members.first().hasPermission('ADMINISTRATOR') ){
                message.channel.send(`<@${message.author.id}> I can't kick this user because he/she's a moderator.`);
                return;
            }
            else if (isGuildOwner(message, message.mentions.members.first().user.id) ){
                message.channel.send(`<@${message.author.id}> You can't kick the server owner.`);
                return;
            }

            var reasonString = '';
            for (var i = 2; i < msgSplit.length; i++){
                reasonString += msgSplit[i];
                if (i != msgSplit.length - 1)
                    reasonString += ' ';
            }
            
            runKickCommand(message, Discord, message.mentions.members.first().user.id, reasonString);
        }
        else{
            errFile.kick(message, Discord);
        }
    }
    else{
        errFile.kick(message, Discord);
    }
}

async function unbanSwitch(message, Discord, fs, msgSplit, errFile, client){

 /* - Function unbanSwitch() was designed to ONLY be called from file main.js

    - Meant to aid in server moderation and special-command usage priveleges

    - Was designed to be triggered via command: !unban

    - Try !unban help to have the bot to provide a usage message */
        
    if(!hasPermission(message, fs) ){
        errFile.permissionDenied(message, Discord, "unban")
        return;
    }

    if (msgSplit.length == 2){
        if (msgSplit[1] == "help"){ // Command usage message requested //
            errFile.unban(message, Discord);
        }

        var bannedMemberList = await message.guild.fetchBans();

        if (bannedMemberList.size == 0){ // Case: No banned members //
            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('C80000') // red
                .setTitle(`Un-ban Failed`)
                .setDescription(`There are no users to un-ban from this server.\nA user must be banned from the server in order to use the un-ban command.`)
                .setTimestamp()
                .setFooter(`Failed un-ban by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg);
            return;
        }
        
        var validInput = true;
        if (msgSplit[1].includes('#')){ // discriminator
            validInput = msgSplit[1].length - msgSplit[1].indexOf('#') == 5;
        }

        if (!validInput){ // Case: User Entry Format Invalid //
            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('C80000') // red
                .setTitle(`Un-ban Failed`)
                .setDescription(`The formatting of the user you entered is invalid.\nPlease check your entry and try again.`)
                .setTimestamp()
                .setFooter(`Failed un-ban by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg);
            return;
        }
        
        var matchingUsers = [];
        if (msgSplit[1].includes('#')){ // Include discriminator in user search
            bannedMemberList.forEach((userContainer) => {
                if (userContainer.user.username.includes( msgSplit[1].substring(0, msgSplit[1].indexOf('#')) ) )
                    if (userContainer.user.discriminator.includes( msgSplit[1].substring(msgSplit[1].indexOf('#') + 1) ))
                        matchingUsers.push(userContainer.user);
            })
        }
        else{
            bannedMemberList.forEach((userContainer) => {
                if (userContainer.user.username.includes(msgSplit[1]) )
                    matchingUsers.push(userContainer.user);
            })
        }

        if (matchingUsers.length == 0){ // Case: No Users Matched //
            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('C80000') // red
                .setTitle(`Un-ban Failed`)
                .setDescription(`There were no users that matched the username entered.\nPlease check your entry and try again.`)
                .setTimestamp()
                .setFooter(`Failed un-ban by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg);
            return;
        }
        else if (matchingUsers.length == 1){ // Case: Only one user matched //
            runUnbanCommand(message, Discord, matchingUsers[0]);
        }
        else{ // Case: More than one user matched //
            if (msgSplit[1].includes('#') ){
                errFile.unexpectedErr(message, Discord, msgSplit, 'unban', client);
                return;
            }
            else{
                const embeddedMsg = new Discord.MessageEmbed()
                    .setColor('C80000') // red
                    .setTitle(`Un-ban Failed`)
                    .setDescription(`There are multiple banned users with the same username entered.\nPlease add a discriminator to the username and try again.`)
                    .setTimestamp()
                    .setFooter(`Failed un-ban by ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(embeddedMsg);
                return;
            }
            
        }
    }
    else // Incorrect command usage message //
        errFile.unban(message, Discord);
}

async function runBanCommand(message, Discord, userID, reason){
    const reply = new Discord.MessageEmbed()
        .setColor('EFEF00') // yellow
        .setTitle(`Ban ${message.guild.members.cache.get(userID).displayName}?`)
        .setDescription('React with the  ✅  emoji below to confirm the ban.\nReact with the  ❌  emoji to cancel the ban.')
        .setTimestamp()
        .setFooter(`Ban requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    const cancelledMsg = new Discord.MessageEmbed()
        .setColor('C80000') // red
        .setTitle('Ban Cancelled')
        .setTimestamp()
        .setFooter(`Banishment of ${message.guild.members.cache.get(userID).displayName} originally requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    const banChannelMsg = new Discord.MessageEmbed()
        .setColor('00C500') //green 
        .setTitle(`Banned ${message.guild.members.cache.get(userID).displayName}`)
        .setTimestamp()
        .setFooter(`Banished by ${message.guild.members.cache.get(message.author.id).displayName}`);
        if (reason != '')
            banChannelMsg.setDescription('__Reason:__\n' + reason);

    message.channel.send(reply).then(msg => {
        msg.react('✅');
        msg.react('❌');
        
        msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
        { max: 1, time: 15000 }).then( async collected => {
            if (collected.first().emoji.name == '✅') {
                msg.delete();
                message.channel.send(banChannelMsg);

                const banDM = new Discord.MessageEmbed()
                    .setColor('C80000') // red
                    .setTitle("**You've Been Banned!**")
                    .setDescription(`You've been **banned** from the server: ${message.guild.name}`)
                    .setTimestamp()
                    if (reason == '')
                        banDM.addFields(
                            { name: '__Banned By__:', value: `${message.guild.members.cache.get(message.author.id).displayName}`},
                            { name: '__Reason__', value: '*Not provided*'}
                        )
                    else
                        banDM.addFields(
                            { name: '__Banned By__:', value: `${message.guild.members.cache.get(message.author.id).displayName}`},
                            { name: '__Reason__', value: `${reason}`}
                        )

                await message.guild.members.cache.get(message.mentions.members.first().user.id).send(banDM);

                // chromozone logging channel send (if chromozone server) //
                if (message.guild.id == "404413479915880448"){ 
                    var clientLogChannel = message.guild.channels.cache.get("772647489798537236");
                    const banLogMsg = new Discord.MessageEmbed()
                        .setColor('C80000') // red 
                        .setTitle(`User ${message.mentions.members.first().displayName} Banned from Server`)
                        .setTimestamp()
                        .setFooter(`Banned by ${message.guild.members.cache.get(message.author.id).displayName}`)

                    if (reason != '')
                        banLogMsg.addFields(
                            { name: '__Reason__:', value: `${reason}`}
                        )
                    else
                        banLogMsg.setDescription("*No Reason Provided*");
                    await clientLogChannel.send(banLogMsg);
                }

                if (reason == '')
                    message.guild.members.resolve(message.mentions.members.first().user).ban();
                else
                    message.guild.members.resolve(message.mentions.members.first().user).ban({ reason: `${reason}` });
            }
            else{
                message.channel.send(cancelledMsg);
                msg.delete();
            }
        });
    });
}

async function runKickCommand(message, Discord, userID, reason){
    const reply = new Discord.MessageEmbed()
        .setColor('EFEF00') // yellow
        .setTitle(`Kick ${message.guild.members.cache.get(userID).displayName}?`)
        .setDescription('React with the  ✅  emoji below to confirm the kick.\nReact with the  ❌  emoji to cancel the kick.')
        .setTimestamp()
        .setFooter(`Kick requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    const cancelledMsg = new Discord.MessageEmbed()
        .setColor('C80000') // red
        .setTitle('Kick Cancelled')
        .setTimestamp()
        .setFooter(`Kicking ${message.guild.members.cache.get(userID).displayName} originally requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    const kickChannelMsg = new Discord.MessageEmbed()
        .setColor('00C500') //green 
        .setTitle(`Kicked ${message.guild.members.cache.get(userID).displayName}`)
        .setTimestamp()
        .setFooter(`Kicked by ${message.guild.members.cache.get(message.author.id).displayName}`);
        if (reason != '')
            kickChannelMsg.setDescription('__Reason:__\n' + reason);

    message.channel.send(reply).then(msg => {
        msg.react('✅');
        msg.react('❌');
        
        msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
        { max: 1, time: 15000 }).then( async collected => {
            if (collected.first().emoji.name == '✅') {
                msg.delete();
                message.channel.send(kickChannelMsg);

                // chromozone logging channel send (if chromozone server) //
                if (message.guild.id == "404413479915880448"){ 
                    var clientLogChannel = message.guild.channels.cache.get("772647489798537236");
                    const kickLogMsg = new Discord.MessageEmbed()
                        .setColor('C80000') // red 
                        
                        .setTimestamp()
                        .setFooter(`Kicked by ${message.guild.members.cache.get(message.author.id).displayName}`)

                    if (message.mentions.members.first().user.bot){
                        kickLogMsg.setTitle(`Bot ${message.mentions.members.first().displayName} Removed from Server`)
                    }
                    else{
                        kickLogMsg.setTitle(`User ${message.mentions.members.first().displayName} Kicked from Server`)
                    }
                    if (reason != '')
                        kickLogMsg.addFields(
                            { name: '__Reason__:', value: `${reason}`}
                        )
                    else
                        kickLogMsg.setDescription("*No Reason Provided*");
                    await clientLogChannel.send(kickLogMsg);
                }

                if (reason == '')
                    message.guild.members.resolve(message.mentions.members.first().user).kick();
                else
                    message.guild.members.resolve(message.mentions.members.first().user).kick({ reason: `${reason}` });
            }
            else{
                message.channel.send(cancelledMsg);
                msg.delete();
            }
        });
    });
}

async function runUnbanCommand(message, Discord, userObject){
    const reply = new Discord.MessageEmbed()
        .setColor('EFEF00') // yellow
        .setTitle(`Un-ban ${userObject.username + '#' + userObject.discriminator}?`)
        .setDescription('React with the  ✅  emoji below to confirm the un-ban.\nReact with the  ❌  emoji to cancel the un-ban.')
        .setTimestamp()
        .setFooter(`Un-ban requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    const cancelledMsg = new Discord.MessageEmbed()
        .setColor('C80000') // red
        .setTitle('Un-ban Cancelled')
        .setTimestamp()
        .setFooter(`Un-ban of ${userObject.username + '#' + userObject.discriminator} originally requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    const unbanChannelMsg = new Discord.MessageEmbed()
        .setColor('00C500') //green 
        .setTitle(`Un-banned ${userObject.username + '#' + userObject.discriminator}`)
        .setTimestamp()
        .setFooter(`Un-banned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(reply).then(msg => {
        msg.react('✅');
        msg.react('❌');
        
        msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
        { max: 1, time: 15000 }).then( async collected => {
            if (collected.first().emoji.name == '✅') {
                msg.delete();
                message.channel.send(unbanChannelMsg);

                // chromozone logging channel send (if chromozone server) //
                if (message.guild.id == "404413479915880448"){ 
                    var clientLogChannel = message.guild.channels.cache.get("772647489798537236");
                    const unbanLogMsg = new Discord.MessageEmbed()
                        .setColor('00C500') // green
                        .setTitle(`User ${userObject.username + '#' + userObject.discriminator} Un-banned from Server`)
                        .setTimestamp()
                        .setFooter(`Un-banned by ${message.guild.members.cache.get(message.author.id).displayName}`)

                    await clientLogChannel.send(unbanLogMsg);
                }

                message.guild.members.unban(userObject.id);
            }
            else{
                message.channel.send(cancelledMsg);
                msg.delete();
            }
        });
    });
}

function hasPermission(message, fs){
    let data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
    var isMaster = data["Master"].hasOwnProperty(message.author.id);
    var userAuthorized = false;
    if (data["Guilds"].hasOwnProperty(message.guild.id) )
        userAuthorized = data["Guilds"][message.guild.id]["Users"].hasOwnProperty(message.author.id);
    return (isMaster || userAuthorized);
}

function isGuildOwner(message, ID){
    return message.guild.owner.user.id == ID;
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { banSwitch, kickSwitch, unbanSwitch };