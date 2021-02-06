
///////////////////////////////////////////
//// gay.js – JavaScript x DiscordJS //////
//// Alex Montes –– @a.montes28#4501 //////
///////////////////////////////////////////

function gaySwitch(message, Discord, msgSplit, errFile, client){

 /* - Function cheggSwitch() was designed to ONLY be called from file main.js

    === THIS FUNCTION WAS NOT DESIGNED TO WORK ON 3RD PARTY DISCORD SERVERS ===

    - Was designed to be triggered via command: !gay

    - Try !gay help to have the bot to provide a usage message */
    
    if (message.guild.id != "404413479915880448") // Stealth reaction, keeps command hidden //
        return;
    
    var hasRole;
    if (msgSplit.length == 1){ // Execute check self contains role //
        hasRole = message.guild.members.cache.get(message.author.id).roles.member._roles.includes('759958809140789310');
        printResponse(message, Discord, message.author.id, hasRole, message.author.id);
    }
    else if (msgSplit.length == 2 && msgSplit[1] == 'help') // Command usage message requested //
        errFile.gay(message, Discord);
    
    else if (msgSplit.length == 2 && message.mentions.members.size != 0){ // Check if tagged user has role //
        hasRole = message.guild.members.cache.get(message.mentions.members.first().user.id).roles.member._roles.includes('759958809140789310');
        printResponse(message, Discord, message.author.id, hasRole, message.mentions.members.first().user.id);
    }
    else if (msgSplit.length == 3 && message.mentions.members.size != 0){ // Tagged user addition or removal of role //
        if (msgSplit[2] == 'declare'){
            hasRole = message.guild.members.cache.get(message.mentions.members.first().user.id).roles.member._roles.includes('759958809140789310');
            modifyUserRoles(message, Discord, msgSplit, errFile, message.author.id, true, hasRole, message.mentions.members.first().user.id);
        }
        else if (msgSplit[2] == 'remove'){
            hasRole = message.guild.members.cache.get(message.mentions.members.first().user.id).roles.member._roles.includes('759958809140789310');
            modifyUserRoles(message, Discord, msgSplit, errFile, message.author.id, false, hasRole, message.mentions.members.first().user.id);
        }
    }
    else // Incorrect command usage message //
        errFile.gay(message, Discord);
}


// ====================== //
// LOCAL HELPER FUNCTIONS //
// ====================== //

function printResponse(message, Discord, requestorID, indicator, subjectID){
    const reply = new Discord.MessageEmbed()
    reply.setTimestamp()
    .setFooter(`Gay check ran by ${message.guild.members.cache.get(message.author.id).displayName}`);

    if ( (indicator && subjectID != '403355889253220352') || subjectID == '114081086065213443'){ // IS and NOT ME //
        reply.setColor('C80000') // red
            .setTitle('Gay!')
            
        if (requestorID == subjectID)
            reply.setDescription(`It appears you **are gay**!`);
        else
            reply.setDescription(`It would appear that ${message.guild.members.cache.get(subjectID).displayName} **is gay**!`);
    }
    else{ // NOT or IS ME
        reply.setColor('00C500') // green
            .setTitle('Not Gay!')
        if (requestorID == subjectID)
            reply.setDescription(`It appears you are **not** gay!`);
        else
            reply.setDescription(`It would appear that ${message.guild.members.cache.get(subjectID).displayName} is **not** gay!`);
    }

    message.channel.send(reply); // Send final output message //
}

function modifyUserRoles(message, Discord, msgSplit, errFile, requestorID, isAdding, indicator, subjectID){
    const reply = new Discord.MessageEmbed()
    reply.setTimestamp()

    var modifierIsGay = message.guild.members.cache.get(requestorID).roles.member._roles.includes('759958809140789310');
    
    if (isAdding && subjectID == '403355889253220352'){ // Case: Trying to give me role //
        reply.setTitle('Gay Declaration Failed')
            .setColor('C80000') // red
            .setDescription(`It's impossible for ${message.guild.members.cache.get(subjectID).displayName} to be gay.`)
            .setFooter(`Failed gay declaration by ${message.guild.members.cache.get(message.author.id).displayName}`);
    }
    else if (isAdding && indicator){ // Case: User already has role //
        reply.setTitle('Gay Declaration Failed')
            .setColor('C80000') // red
            .setDescription(`${message.guild.members.cache.get(subjectID).displayName} is already gay.`)
            .setFooter(`Failed gay declaration by ${message.guild.members.cache.get(message.author.id).displayName}`);
    }
    else if (isAdding && !indicator){ // Execute role add command //
        message.guild.members.cache.get(message.mentions.members.first().user.id).roles.add('759958809140789310');
        reply.setTitle('Gay Declaration Successful')
            .setColor('00C500') // green
            .setDescription(`Successfully declared ${message.guild.members.cache.get(subjectID).displayName} as gay.`)
            .setFooter(`Gay declaration by ${message.guild.members.cache.get(message.author.id).displayName}`);
    }
    else if (!isAdding && modifierIsGay){ // Case: User removing has role //
        //straight adding - fail
        reply.setTitle('Gay Removal Failed')
            .setColor('C80000') // red
            .setDescription(`You must not be gay in order to remove *the gay* from a user.`)
            .setFooter(`Failed gay removal by ${message.guild.members.cache.get(message.author.id).displayName}`);
    }
    else if (!isAdding && !indicator){ // Case: User already lacks role //
        reply.setTitle('Gay Removal Failed')
            .setColor('C80000') // red
            .setDescription(`${message.guild.members.cache.get(subjectID).displayName} already lacks *the gay*.`)
            .setFooter(`Failed gay removal by ${message.guild.members.cache.get(message.author.id).displayName}`);
    }
    else if (!isAdding){ // Execute role removal command //
        message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).roles.remove('759958809140789310');
        reply.setTitle('Gay Removal Successful')
            .setColor('00C500') // green
            .setDescription(`Successfully declared ${message.guild.members.cache.get(subjectID).displayName} as *not gay*.`)
            .setFooter(`Gay removal by ${message.guild.members.cache.get(message.author.id).displayName}`);
    }
    else{ // This should never get reached, but you never know... //
        errFile.unexpectedErr(message, Discord, msgSplit, "gay", client);
        return;
    }

    message.channel.send(reply); // Send final output message //
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { gaySwitch };