
////////////////////////////////////////////
//// nick.js – JavaScript x DiscordJS //////
//// Alex Montes  –  @a.montes28#4501 //////
////////////////////////////////////////////

function nickSwitch(message, Discord, fs, msgSplit, errFile){

/* - Function nickSwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic command – usable on any server

    - Was designed to be triggered via command: !nick

    - Try !nick help to have the bot to provide a usage message */

    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES") ){
        errFile.missingPermissions(message, Discord, "nick");
        return;
    }

    var data;
    try{ // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
    }
    catch (e){
        errFile.unexpectedErr(message, Discord, msgSplit, "nick", client);
        return;
    }

    var isMaster = data["Master"].hasOwnProperty(message.author.id);
    var userAuthorized = false;
    if (data["Guilds"].hasOwnProperty(message.guild.id) )
        userAuthorized = data["Guilds"][message.guild.id]["Users"].hasOwnProperty(message.author.id);

    if (msgSplit.length < 2)
        errFile.nick(message, Discord);
    else if (msgSplit.length == 2 && msgSplit[1] == 'help')
        errFile.nick(message, Discord);
    else{
        const embeddedMsg = new Discord.MessageEmbed();
        var targetID = '';
        if (message.mentions.members.size != 0 && msgSplit[1].length == 22)
            targetID = message.mentions.members.first().user.id;
        else
            targetID = message.author.id
        
        if (message.guild.owner.user.id == targetID || message.guild.members.cache.get(targetID).hasPermission('ADMINISTRATOR')){
            embeddedMsg.setTitle(`Nickname Change Failed`)
            embeddedMsg.setColor('C80000') // red
            embeddedMsg.setDescription("No one's allowed to change this user's name using the **nick** command because he/she's a moderator.")
            embeddedMsg.setTimestamp()
            embeddedMsg.setFooter(`Failed nickname change by ${message.guild.members.cache.get(message.author.id).displayName}`);
        }
        else if (targetID == '502354442054664192' && !(userAuthorized || isMaster) ){ // If targetID is this bot but they dont have Master permission
            embeddedMsg.setTitle(`Nickname Change Failed`)
            embeddedMsg.setColor('C80000') // red
            embeddedMsg.setDescription("Only authorized users can change my name using the **nick** command.")
            embeddedMsg.setTimestamp()
            embeddedMsg.setFooter(`Failed nickname change by ${message.guild.members.cache.get(message.author.id).displayName}`);
        }
        else if (targetID != message.author.id){
            if (isMaster || userAuthorized){
                message.guild.members.cache.get(targetID).setNickname(resolveNewName(message, msgSplit));

                embeddedMsg.setTitle(`Nickname Change Succesful`)
                embeddedMsg.setColor('00C500') // green
                embeddedMsg.setDescription(`Successfully changed the name of ${message.guild.members.cache.get(targetID).displayName}.`)
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Failed nickname change by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
            else{
                embeddedMsg.setTitle(`Nickname Change Failed`)
                embeddedMsg.setColor('C80000') // red
                embeddedMsg.setDescription("You are not authorized to change any nicknames but your own.")
                embeddedMsg.setTimestamp()
                embeddedMsg.setFooter(`Failed nickname change by ${message.guild.members.cache.get(message.author.id).displayName}`);
            }
        }
        else{
            message.guild.members.cache.get(targetID).setNickname(resolveNewName(message, msgSplit));

            embeddedMsg.setTitle(`Nickname Change Succesful`)
            embeddedMsg.setColor('00C500') // green
            embeddedMsg.setDescription(`Successfully changed the name of ${message.guild.members.cache.get(targetID).displayName}.`)
            embeddedMsg.setTimestamp()
            embeddedMsg.setFooter(`Failed nickname change by ${message.guild.members.cache.get(message.author.id).displayName}`);
        }
        
        message.channel.send(embeddedMsg);
    }
}

function resolveNewName(message, msgSplit){
    var newName = '';
    if (message.mentions.members.size != 0){ // Start index should be 2
        for (var i = 2; i < msgSplit.length; i++){
            newName += msgSplit[i];
            if (i != msgSplit.length - 1)
                newName += ' ';
        }
    }
    else{ // Start index should be 1
        for (var i = 1; i < msgSplit.length; i++){
            newName += msgSplit[i];
            if (i != msgSplit.length - 1)
                newName += ' ';
        }
    }
    return newName.toLowerCase();
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { nickSwitch };