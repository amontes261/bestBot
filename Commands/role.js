
//////////////////////////////////////////
//// role.js – JavaScript x DiscordJS ////
//// Alex Montes  –  @a.montes28#4501 ////
//////////////////////////////////////////

function roleSwitch(message, Discord, fs, msgSplit, errFile, client){
    
/* - Function roleSwitch() was designed to ONLY be called from file main.js

    - Meant to aid in server moderation and special-command usage priveleges

    - Was designed to be triggered via command: !role

    - Try !role help to have the bot to provide a usage message */
    
    if (message.guild.id != '404413479915880448'){ // Ensure not running on a 3rd party server //
        errFile.onlyOnChromozone(message, Discord, "role");
        return;
    }

    var data;
    try{ // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
    }
    catch (e){
        errFile.unexpectedErr(message, Discord, msgSplit, "role", client);
        return;
    }

    var isMaster = data["Master"].hasOwnProperty(message.author.id);
    var userAuthorized = false;
    if (data["Guilds"].hasOwnProperty(message.guild.id) )
        userAuthorized = data["Guilds"][message.guild.id]["Users"].hasOwnProperty(message.author.id);

    /* Anyone who isnt Un-Approved can add these roles */
    var untouchableRolesLv1 = ["simp", "cod", "among us", "rocket league", "secret h", "apex"]

    /* Anyone whose approved on the server can add these roles */
    var untouchableRolesLv2 = ["rpi", "poly", "friends", "friends of friends", "bot", "move, dc & mute", "quad", "chonky", "pp"]

    /* Downright untouchable: Only Alex or people w/ MASTER can modify this role */
    var untouchableRolesLv3 = ["cleared bot", "admin", "gay overlord", "sexy boi", "big dumb", "un-approved", "alex's debug account", "gay", "extra extra gay", "legacy", "server booster"]

    if (msgSplit.length < 3){ // Will work properly for "!role help" command
        errFile.role(message, Discord);
    }
    else{
        const embeddedMsg = new Discord.MessageEmbed();
        var targetID = '';
        if (message.mentions.members.size != 0)
            targetID = message.mentions.members.first().user.id;
        else
            targetID = message.author.id

        roleName = resolveRoleName(message, msgSplit);

        if (!verifyRoleExists(message, roleName ) ){
            embeddedMsg.setColor('C80000') // red
                .setTitle('Role Not Found')
                .setDescription(`The role "${roleName}" does not exist on this Discord Server.\nMake sure your spelling and spacing is correct`)
                .setTimestamp()
                .setFooter(`Role modification attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg);
            return;
        }
        else if (roleName == "gay" && message.mentions.members.size != 0 && message.mentions.members.first().user.id == "403355889253220352"){ // me getting gay role
            embeddedMsg.setColor('C80000') // red
                .setTitle('Nice Try.')
                .setDescription(`It's impossible for Alex to be gay.\nYou should know this by now.`)
                .setTimestamp()
                .setFooter(`Fake gay role assignment by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg);
            return;
        }
        else if (roleName == "gay"){ // gay role
            embeddedMsg.setColor('C80000') // red
                .setTitle('Role Assignment Failed')
                .setDescription(`There is a dedicated command for this role.\n Try "!gay help" for more info.`)
                .setTimestamp()
                .setFooter(`Role assignment by ${message.guild.members.cache.get(message.author.id).displayName} was rejected`);
            message.channel.send(embeddedMsg);
            return;
        }
        else if (roleName == "everyone" || roleName == "@everyone"){ // @everyone role
            embeddedMsg.setColor('C80000') // red
                .setTitle('Role Assignment Failed')
                .setDescription(`This role can not be distributed.`)
                .setTimestamp()
                .setFooter(`Role assignment by ${message.guild.members.cache.get(message.author.id).displayName} was rejected`);
            message.channel.send(embeddedMsg);
            return;
        }

        var preModificationRoles = [];

        message.guild.members.cache.get(message.author.id).roles.cache.forEach((role) => {
            preModificationRoles.push(role.name.toLowerCase() );
        });

        if (msgSplit[1] == 'add'){
            if (targetID != message.author.id && msgSplit[2].length != 22){
                errFile.role(message, Discord);
                return;
            }
            const grantedMsg = new Discord.MessageEmbed();
            grantedMsg.setColor('00C500') // green
                .setTitle('Role Added')
                .setDescription(`Granted the **${roleName}** role to ${message.guild.members.cache.get(targetID).displayName}`)
                .setTimestamp()
                .setFooter(`Role added by ${message.guild.members.cache.get(message.author.id).displayName}`);
            
            const rejectedMsg = new Discord.MessageEmbed();
            rejectedMsg.setColor('C80000') // red
                .setTitle('Role Assignment Failed')
                .setDescription(`You are not allowed to assign this role to any members.`)
                .setTimestamp()
                .setFooter(`Role assignment by ${message.guild.members.cache.get(message.author.id).displayName} was rejected`);
                    
            const alreadyHasMsg = new Discord.MessageEmbed();
            alreadyHasMsg.setColor('C80000') // red
                .setTitle('Role Assignment Failed')
                .setDescription(`${message.guild.members.cache.get(targetID).displayName} already has the "${roleName}" role`)
                .setTimestamp()
                .setFooter(`Role assignment attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            
            if (preModificationRoles.includes(roleName) ){
                message.channel.send(alreadyHasMsg);
            }
            else if (untouchableRolesLv3.includes(roleName) ){
                if (isMaster || message.author.id == "403355889253220352"){
                    modifyuserRole(message, targetID, roleName, "add", errFile);
                    message.channel.send(grantedMsg);
                }
                else{
                    message.channel.send(rejectedMsg);
                }
            }
            else if (untouchableRolesLv2.includes(roleName) ){
                if (userAuthorized || message.author.id == "403355889253220352"){
                    modifyuserRole(message, targetID, roleName, "add", errFile);
                    message.channel.send(grantedMsg);
                }
                else{
                    message.channel.send(rejectedMsg);
                }
            }
            else if (untouchableRolesLv1.includes(roleName) ){
                if (message.guild.members.cache.get(message.author.id).roles.cache.has("759960911682732042") ){
                    // User has Un-approved role
                    message.channel.send(rejectedMsg);
                }
                else{
                    modifyuserRole(message, targetID, roleName, "add", errFile);
                    message.channel.send(grantedMsg);
                }
            }
            else{
                errFile.unexpectedErr(message, Discord, msgSplit, "role", client);
                return;
            }
        }
        else if (msgSplit[1] == 'remove'){
            if (targetID != message.author.id && msgSplit[2].length != 22){
                errFile.role(message, Discord);
                return;
            }
            const removedMsg = new Discord.MessageEmbed();
            removedMsg.setColor('00C500') // green
                .setTitle('Role Removed')
                .setDescription(`Removed the **${roleName}** role from ${message.guild.members.cache.get(targetID).displayName}`)
                .setTimestamp()
                .setFooter(`Role removed by ${message.guild.members.cache.get(message.author.id).displayName}`);
            
            const rejectedMsg = new Discord.MessageEmbed();
            rejectedMsg.setColor('C80000') // red
                .setTitle('Role Removal Failed')
                .setDescription(`You are not allowed to remove this role from any members.`)
                .setTimestamp()
                .setFooter(`Role removal by ${message.guild.members.cache.get(message.author.id).displayName} was rejected`);
                    
            const neverHadMsg = new Discord.MessageEmbed();
            neverHadMsg.setColor('C80000') // red
                .setTitle('Role Removal Failed')
                .setDescription(`${message.guild.members.cache.get(targetID).displayName} doesn't have the "${roleName}" role`)
                .setTimestamp()
                .setFooter(`Role removal attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
            
            if (!preModificationRoles.includes(roleName) ){
                message.channel.send(neverHadMsg);
            }
            else if (untouchableRolesLv3.includes(roleName) ){
                if (isMaster || message.author.id == "403355889253220352"){
                    modifyuserRole(message, targetID, roleName, "remove", errFile);
                    message.channel.send(removedMsg);
                }
                else{
                    message.channel.send(rejectedMsg);
                }
            }
            else if (untouchableRolesLv2.includes(roleName) ){
                if (userAuthorized || message.author.id == "403355889253220352"){
                    modifyuserRole(message, targetID, roleName, "remove", errFile);
                    message.channel.send(removedMsg);
                }
                else{
                    message.channel.send(rejectedMsg);
                }
            }
            else if (untouchableRolesLv1.includes(roleName) ){
                if (message.guild.members.cache.get(message.author.id).roles.cache.has("759960911682732042") ){
                    // User has Un-approved role
                    message.channel.send(rejectedMsg);
                }
                else{
                    modifyuserRole(message, targetID, roleName, "remove", errFile);
                    message.channel.send(removedMsg);
                }
            }
            else{
                errFile.unexpectedErr(message, Discord, msgSplit, "role", client);
                return;
            }
        }
        else if (msgSplit[1] == 'check'){
            if (targetID != message.author.id && msgSplit[2].length != 22){
                errFile.role(message, Discord);
                return;
            }

            const doesNotHaveRoleMsg = new Discord.MessageEmbed();
            doesNotHaveRoleMsg.setColor('EFEF00') // yellow
                .setTitle('User Does **Not** Have Role')
                .setDescription(`${message.guild.members.cache.get(targetID).displayName} does not have the "${roleName}" role`)
                .setTimestamp()
                .setFooter(`Role check by ${message.guild.members.cache.get(message.author.id).displayName}`);

            const hasRoleMsg = new Discord.MessageEmbed();
            hasRoleMsg.setColor('00C500') // green
                .setTitle('User **Has** Role')
                .setDescription(`${message.guild.members.cache.get(targetID).displayName} has the "${roleName}" role`)
                .setTimestamp()
                .setFooter(`Role check by ${message.guild.members.cache.get(message.author.id).displayName}`);
                

            if (preModificationRoles.includes(roleName) )
                message.channel.send(hasRoleMsg);
            else
                message.channel.send(doesNotHaveRoleMsg);
        }
        else{
            errFile.role(message, Discord);
        }
    }
}

function modifyuserRole(message, id, roleName, action, errFile){
    roleID = '';

    message.guild.roles.cache.forEach((role) => {
        if (roleName == role.name.toLowerCase() ){
            roleID = role.id
        }
    });
    
    if(action == "add"){
        message.guild.members.cache.get(id).roles.add(roleID);
    }
    else if(action == "remove"){
        message.guild.members.cache.get(id).roles.remove(roleID);
    }
}

function resolveRoleName(message, msgSplit){
    var roleName = '';
    if (message.mentions.members.size != 0){ // Start index should be 3
        for (var i = 3; i < msgSplit.length; i++){
            roleName += msgSplit[i];
            if (i != msgSplit.length - 1)
                roleName += ' ';
        }
    }
    else{ // Start index should be 2
        for (var i = 2; i < msgSplit.length; i++){
            roleName += msgSplit[i];
            if (i != msgSplit.length - 1)
                roleName += ' ';
        }
    }
    return roleName.toLowerCase();
}

function verifyRoleExists(message, roleName){
    var roleExists = false;
    var roleID = '-1';
    message.guild.roles.cache.forEach((role) => {
        if (roleName == role.name.toLowerCase() ){
            roleExists = true;
        }
    });

    return roleExists;
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { roleSwitch };