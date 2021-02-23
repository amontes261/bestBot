
//////////////////////////////////////////
//// auth.js – JavaScript x DiscordJS ////
//// Alex Montes  –  @a.montes28#4501 ////
////////////////////////////////////////// 

async function authSwitch(message, Discord, fs, msgSplit, errFile, client){
        
 /* - Asynchronous function authSwitch() was designed to ONLY be called from file main.js

    - Meant to aid in server moderation and special-command usage priveleges

    - Was designed to be triggered via command: !auth

    - Try !auth help to have the bot to provide a usage message */

    var data;
    try{ // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
    }
    catch (e){
        errFile.unexpectedErr(message, Discord, msgSplit, "auth", client);
        return;
    }

    var isMaster = data["Master"].hasOwnProperty(message.author.id);
    var userAuthorized = false;
    if (data["Guilds"].hasOwnProperty(message.guild.id) )
        userAuthorized = data["Guilds"][message.guild.id]["Users"].hasOwnProperty(message.author.id);


    if (!userAuthorized && !isMaster){ // Ensure user has proper permission to use this command //
        errFile.permissionDenied(message, Discord, "auth");
        return;
    }
    if (msgSplit.length == 2 && msgSplit[1] == 'help') // Command usage message requested //
        errFile.auth(message, Discord);
    else if (msgSplit.length == 3){
        var timestamp = new Date();
        var stampString = (timestamp.getMonth() + 1) + "/" + timestamp.getDate() + "/" + timestamp.getFullYear() + ', ' + timestamp.toLocaleTimeString('en-US');
        
        if (msgSplit[1] == "grant"){ // Grant authorization to either user or server //
            if (msgSplit[2] == "server"){ // Grant authorization to server //
                const reply = new Discord.MessageEmbed();

                if (data["Guilds"].hasOwnProperty(message.guild.id)){ // Case: Guild already exists in JSON file //
                    if (data["Guilds"][message.guild.id]["All Command Access"]["Activated"] == true){ // Case: Server already activated //
                        reply.setColor('C80000') // red
                            .setTitle('Server Authorization Failed')
                            .setDescription(`Server ${message.guild.name} is already Authorized`)
                            .setTimestamp()
                            .setFooter(`Server Authorization attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                        message.channel.send(reply); // Send final output message //
                        return;
                    }
                    else{ // Server not already activated: execute activation command //
                        data["Guilds"][message.guild.id]["All Command Access"]["Activated"] = true;
                        if (data["Guilds"][message.guild.id]["All Command Access"].hasOwnProperty("Revoked By") )
                            delete data["Guilds"][message.guild.id]["All Command Access"]["Revoked By"];
                        data["Guilds"][message.guild.id]["All Command Access"]["Unlocked By"] = {
                            "Username": message.author.tag,
                            "User ID": message.author.id,
                            "Timestamp": stampString 
                        }
                    }
                }
                else{ // Case: Guild does not already exist in JSON file: execute activation command //
                    data["Guilds"][message.guild.id] = {
                        "Server Name": message.guild.name,
                        "Unlock Timestamp": stampString,
                        "All Command Access": {
                            "Activated": true,
                            "Unlocked By": {
                                "Username": message.author.tag,
                                "User ID": message.author.id,
                                "Timestamp": stampString 
                            }
                        }
                    }

                    data["Guilds"][message.guild.id]["Users"] = {};
                    data["Guilds"][message.guild.id]["Users"][message.author.id] = {
                        "Username": message.author.tag,
                        "Authorized By": message.author.tag,
                        "Timestamp": stampString
                    }
                }
                fs.writeFileSync('Data_Management/authorization.json', JSON.stringify(data));
                    // Shouldn't fail if it's already gotten this far //

                reply.setColor('00C500') // green
                    .setTitle('Server Authorization Successful')
                    .setDescription(`Authorized server ${message.guild.name}`)
                    .setTimestamp()
                    .setFooter(`Server Authorized by ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(reply); // Send final output message //

                if (client.guilds.cache.get("404413479915880448") != undefined && client.guilds.cache.get("404413479915880448") != null){ // Ensure bot running on 1st Party Server //
                    var clientLogChannel = client.guilds.cache.get("404413479915880448").channels.cache.get("772647489798537236");
                    const authLogMsg = new Discord.MessageEmbed()
                        .setColor('00C500') // green 
                        .setTitle(`Server Authorized: ${message.guild.name}`)
                        .setTimestamp()
                        .setFooter(`Authorized by ${message.guild.members.cache.get(message.author.id).displayName}`)
                    clientLogChannel.send(authLogMsg);
                }

            }
            else if (msgSplit[2].length == 22 && message.mentions.members.size != 0){ // Grant authorization to user //
                const reply = new Discord.MessageEmbed();

                if (data["Guilds"].hasOwnProperty(message.guild.id)){ // Case: Guild already exists in JSON file //
                    if (data["Guilds"][message.guild.id]["Users"].hasOwnProperty(message.mentions.members.first().user.id) ){ // Case: User already authorized //
                        reply.setColor('C80000') // red
                            .setTitle('User Authorization Failed')
                            .setDescription(`${message.mentions.members.first().displayName} is already Authorized`)
                            .setTimestamp()
                            .setFooter(`User Authorization attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                        message.channel.send(reply); // Send final output message //
                        return;
                    }
                    else{ // User not already activated: execute authorization command //
                        data["Guilds"][message.guild.id]["Users"][message.mentions.members.first().user.id] = {
                            "Username": message.mentions.members.first().user.tag,
                            "Authorized By": message.author.tag,
                            "Timestamp": stampString
                        }
                    }
                }
                else{ // Case: Guild does not already exist in JSON file: execute user authorization command //
                    data["Guilds"][message.guild.id] = {
                        "Server Name": message.guild.name,
                        "Unlock Timestamp": stampString,
                        "All Command Access": {
                            "Activated": false,
                            "Unlocked By": {
                                "Username": "",
                                "User ID": "",
                                "Timestamp": ""  
                            }
                        }
                    }

                    data["Guilds"][message.guild.id]["Users"][message.mentions.members.first().user.id] = {
                        "Username": message.mentions.members.first().user.tag,
                        "Authorized By": message.author.tag,
                        "Timestamp": stampString
                    }
                }
                fs.writeFileSync('Data_Management/authorization.json', JSON.stringify(data));
                    // Shouldn't fail if it's already gotten this far //
                
                reply.setColor('00C500') // green
                    .setTitle(`Authorized ${message.mentions.members.first().displayName}`)
                    .setTimestamp()
                    .setFooter(`User Authorization by ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(reply);

                if (message.guild.id == "404413479915880448"){ // Log if user was authorized on 1st party server //
                    var clientLogChannel = message.guild.channels.cache.get("772647489798537236");
                    const authLogMsg = new Discord.MessageEmbed()
                        .setColor('00C500') // green 
                        .setTitle(`User ${message.mentions.members.first().displayName} Authorized`)
                        .setTimestamp()
                        .setFooter(`Authorized by ${message.guild.members.cache.get(message.author.id).displayName}`)
                    clientLogChannel.send(authLogMsg);
                }
            }
            else // Incorrect command usage message //
                errFile.auth(message, Discord);
        }
        else if (msgSplit[1] == "revoke"){ // Revoke authorization from either user or server //
            if (msgSplit[2] == "server"){ // Revoke authorization from server //
                const reply = new Discord.MessageEmbed();

                if (data["Guilds"].hasOwnProperty(message.guild.id)){ // Case: Guild already exists in JSON file //
                    if (data["Guilds"][message.guild.id]["All Command Access"]["Activated"] == false){ // Case: Server not activated //
                        reply.setColor('C80000') // red
                            .setTitle('Server Authorization Revoke Failed')
                            .setDescription(`Server ${message.guild.name} already lacks Authorization.`)
                            .setTimestamp()
                            .setFooter(`Server Auth. Revoke attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                        message.channel.send(reply);
                        return;
                    }
                    else{ // Server activated //
                        reply.setColor('EFEF00') // yellow
                            .setTitle('Revoke Command Received')
                            .setDescription(`Are you sure you want to revoke elevated command access from server ${message.guild.name}?\nReact with the  ✅  emoji below to confirm the revoke.\nReact with the  ❌  emoji to cancel the shutdown.`)
                            .setTimestamp()
                            .setFooter(`Revoke requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
                        
                        message.channel.send(reply).then(msg => { // Ensure user really wants to carry out command //
                            msg.react('✅');
                            msg.react('❌');
                            
                            msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
                            { max: 1, time: 15000 }).then( async collected => {
                                if (collected.first().emoji.name == '✅') { // User confirmation: execute revoke command //
                                    const revokedMsg = new Discord.MessageEmbed()
                                        .setColor('00C500') //green 
                                        .setTitle('Server Revoke Successful')
                                        .setDescription(`Revoked elevated command access from this server.`)
                                        .setTimestamp()
                                        .setFooter(`Revoked by ${message.guild.members.cache.get(message.author.id).displayName}`);

                                    message.channel.send(revokedMsg); // Send final output message //
                                    msg.delete(); // Delete confirmation message //

                                    data["Guilds"][message.guild.id]["All Command Access"]["Activated"] = false;
                                    delete data["Guilds"][message.guild.id]["All Command Access"]["Unlocked By"];
                                    data["Guilds"][message.guild.id]["All Command Access"]["Revoked By"] = {
                                        "Username": message.author.tag,
                                        "User ID": message.author.id,
                                        "Timestamp": stampString 
                                    }
                                    fs.writeFileSync('Data_Management/authorization.json', JSON.stringify(data));
                                        // Shouldn't fail if it's already gotten this far //
                                    
                                    if (client.guilds.cache.get("404413479915880448") != undefined && client.guilds.cache.get("404413479915880448") != null){ // Ensure bot running on 1st Party Server //
                                        var clientLogChannel = client.guilds.cache.get("404413479915880448").channels.cache.get("772647489798537236");
                                        const deAuthLogMsg = new Discord.MessageEmbed()
                                            .setColor('00C500') // green 
                                            .setTitle(`De-Authorized Server: ${message.guild.name}`)
                                            .setTimestamp()
                                            .setFooter(`De-Authorized by ${message.guild.members.cache.get(message.author.id).displayName}`)
                                        clientLogChannel.send(deAuthLogMsg);
                                    }

                                }
                                else{ // User cancellation //
                                    const cancelledMsg = new Discord.MessageEmbed()
                                    .setColor('C80000') // red
                                    .setTitle('Server Revoke Cancelled')
                                    .setDescription(`Cancelled revoke of elevated command access from this server.`)
                                    .setTimestamp()
                                    .setFooter(`Revoke originally requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

                                    message.channel.send(cancelledMsg); // Send final output message //
                                    msg.delete(); // Delete confirmation message //
                                }
                            });
                        });
                    }
                }
                else{
                    reply.setColor('C80000') // red
                            .setTitle('Server De-Authorization Failed')
                            .setDescription(`Server ${message.guild.name} already lacked authorization`)
                            .setTimestamp()
                            .setFooter(`Server De-Authorization attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                        message.channel.send(reply); // Send final output message //
                        return;
                }
            }
            else if (msgSplit[2].length == 22 && message.mentions.members.size != 0){ // Revoke authorization from user //
                if (data["Guilds"].hasOwnProperty(message.guild.id) ){ // Case: Guild already exists in JSON file //
                    const reply = new Discord.MessageEmbed();

                    if(data["Guilds"][message.guild.id]["Users"].hasOwnProperty(message.mentions.members.first().user.id) ){ // User authorized //

                        reply.setColor('EFEF00') // yellow
                            .setTitle('Revoke Command Received')
                            .setDescription(`Are you sure you want to revoke authorization from ${message.mentions.members.first().displayName}?\nReact with the  ✅  emoji below to confirm the revoke.\nReact with the  ❌  emoji to cancel the shutdown.`)
                            .setTimestamp()
                            .setFooter(`Revoke requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
                        
                        message.channel.send(reply).then(msg => { // Ensure user really wants to carry out command //
                            msg.react('✅');
                            msg.react('❌');
                            
                            msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
                            { max: 1, time: 15000 }).then( async collected => {
                                if (collected.first().emoji.name == '✅') { // User confirmation: execute revoke command //
                                    const revokedMsg = new Discord.MessageEmbed()
                                        .setColor('00C500') //green 
                                        .setTitle('Auth Revoke Successful')
                                        .setDescription(`De-authorized ${message.mentions.members.first().displayName}.`)
                                        .setTimestamp()
                                        .setFooter(`Revoked by ${message.guild.members.cache.get(message.author.id).displayName}`);

                                    message.channel.send(revokedMsg); // Send final output message //
                                    msg.delete(); // Delete confirmation message //
                                    
                                    delete data["Guilds"][message.guild.id]["Users"][message.mentions.members.first().user.id];
                                    fs.writeFileSync('Data_Management/authorization.json', JSON.stringify(data));
                                        // Shouldn't fail if it's already gotten this far //

                                    if (message.guild.id == "404413479915880448"){ // Log if user was de-authorized on 1st party server //
                                        var clientLogChannel = message.guild.channels.cache.get("772647489798537236");
                                        const deAuthLogMsg = new Discord.MessageEmbed()
                                            .setColor('00C500') // green 
                                            .setTitle(`User ${message.mentions.members.first().displayName} De-Authorized`)
                                            .setTimestamp()
                                            .setFooter(`De-Authorized by ${message.guild.members.cache.get(message.author.id).displayName}`)
                                        clientLogChannel.send(deAuthLogMsg);
                                    }
                                }
                                else{ // User cancellation //
                                    const cancelledMsg = new Discord.MessageEmbed()
                                    .setColor('C80000') // red
                                    .setTitle('Auth Revoke Cancelled')
                                    .setDescription(`Cancelled de-authorization from ${message.mentions.members.first().displayName}.`)
                                    .setTimestamp()
                                    .setFooter(`Revoke originally requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

                                    message.channel.send(cancelledMsg); // Send final output message //
                                    msg.delete(); // Delete confirmation message //
                                }
                            });
                        });
                    }
                    else{
                        reply.setColor('C80000') // red
                            .setTitle('User De-Authorization Failed')
                            .setDescription(`User ${message.mentions.members.first().displayName} was never authorized in the first place`)
                            .setTimestamp()
                            .setFooter(`User De-Authorization attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                        message.channel.send(reply); // Send final output message //
                        return;
                    }
                }
                else{
                    reply.setColor('C80000') // red
                            .setTitle('User De-Authorization Failed')
                            .setDescription(`User ${message.mentions.members.first().displayName} was never authorized in the first place`)
                            .setTimestamp()
                            .setFooter(`User De-Authorization attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                        message.channel.send(reply); // Send final output message //
                        return;
                }  
            }
            else // Incorrect command usage message //
                errFile.auth(message, Discord);
        }
        else // Incorrect command usage message //
            errFile.auth(message, Discord);
    }
    else  // Incorrect command usage message //
        errFile.auth(message, Discord);
}



// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { authSwitch };