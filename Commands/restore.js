
/////////////////////////////////////////////
//// restore.js – JavaScript x DiscordJS ////
//// Alex Montes  ––––  @a.montes28#4501 ////
/////////////////////////////////////////////

function restoreSwitch(message, Discord, fs, msgSplit, errFile, client) {

 /* - Function restoreSwitch() was designed to ONLY be called from file main.js
 
    === THIS FUNCTION WAS NOT DESIGNED TO WORK ON 3RD PARTY DISCORD SERVERS ===

    - Was designed to be triggered via command: !restore

    - Try !restore help to have the bot to provide a usage message */

    if (message.guild.id != '404413479915880448') { // Ensure not running on a 3rd party server //
        errFile.onlyOnChromozone(message, Discord, "restore");
        return;
    }

    var data;
    try { // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/restore.json"));
    }
    catch (e) {
        errFile.unexpectedErr(message, Discord, msgSplit, "restore", client);
        return;
    }
    
    if (msgSplit.length == 1)  // Execute restore command on user //
        runRestoreCmd(message, Discord, fs, data, message.author.id);
    else if (msgSplit.length == 2 && msgSplit[1] == 'help') // Command usage message requested //
        errFile.restore(message, Discord);
    else if (msgSplit.length == 2 && message.mentions.members.size != 0) // Execute restore a tagged user command //
        runRestoreCmd(message, Discord, fs, data, message.mentions.members.first().user.id);
    else if (msgSplit.length == 2 && msgSplit[1] == 'register')  // Execute register self command //
        registerRestoreCmd(message, Discord, fs, data, message.author.id);
    else if (msgSplit.length == 3 && msgSplit[1] == 'register' && message.mentions.members.size != 0) // Execute restore a tagged user command //
        registerRestoreCmd(message, Discord, fs, data, message.mentions.members.first().user.id);
    else // Incorrect command usage message //
        errFile.restore(message, Discord);
}

function runRestoreCmd(message, Discord, fs, data, id) {
    const embeddedMsg = new Discord.MessageEmbed();
    if (message.guild.owner.user.id == id) { // Case: Restore command running on Guild Owner //
        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('C80000') // red
            .setTitle('Unable to Restore Roles and Display Name')
            .setDescription('The Server Owner and other Administrators can not be restored or registered.')
            .setTimestamp()
            .setFooter(`Failed restore request from ${message.guild.members.cache.get(message.author.id).displayName}`);
        
        message.channel.send(embeddedMsg);
        return;
    }
    if (!data["Guilds"].hasOwnProperty(message.guild.id)) { // Case: Guild never registered into database //
        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('C80000') // red
            .setTitle('Unable to Restore Roles and Display Name')
            .setTimestamp()
            .setFooter(`Failed restore request from ${message.guild.members.cache.get(message.author.id).displayName}`);

        if (message.author.id == id)
            embeddedMsg.setDescription(`You never registered your roles or display name on this server.\nUse *!restore help* for more info.`)
        else
            embeddedMsg.setDescription(`Roles and display name for ${message.guild.members.cache.get(id).displayName} were never registered on this server.\nUse *!restore help* for more info.`)
        message.channel.send(embeddedMsg);
        return;
    }
    if (data["Guilds"][message.guild.id]["Users"].hasOwnProperty(id)) {
        message.guild.members.cache.get(id).setNickname(data["Guilds"][message.guild.id]["Users"][id]["Display Name"]);

        var missingRoles = 0;
        data["Guilds"][message.guild.id]["Users"][id]["Roles"].forEach((userRole) => {
            var roleMissing = true;
            message.guild.roles.cache.forEach((guildRole) => {
                if (userRole == guildRole)
                    roleMissing = false;
            })

            if (roleMissing)
                missingRoles++;
            else if (!message.guild.members.cache.get(id).roles.member._roles.includes(userRole)) // User already has role
                message.guild.members.cache.get(id).roles.add(userRole).catch(missingRoles++);
        })

        if (missingRoles == 0){
            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('00C500') // green
                .setTitle('Restored Roles and Display Name')
                .setTimestamp()
                .setFooter(`Restore requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

            if (message.author.id == id)
                embeddedMsg.setDescription(`Your roles and display name have been restored.`)
            else
                embeddedMsg.setDescription(`The roles and display name for ${message.guild.members.cache.get(id).displayName} have been restored.`)
            message.channel.send(embeddedMsg);
            return;
        }
        else if (missingRoles == data["Guilds"][message.guild.id]["Users"][id]["Roles"].length){
            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('C80000') // red
                .setTitle('Display Name Restored, Roles Failed')
                .setTimestamp()
                .setFooter(`Restore requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

            if (message.author.id == id)
                embeddedMsg.setDescription(`Your display name has been restored. However, there was a problem restoring **all** of your roles.`)
            else
                embeddedMsg.setDescription(`Display name for ${message.guild.members.cache.get(id).displayName} has been restored. However, there was a problem restoring **all** roles for ${message.guild.members.cache.get(id).displayName}..`)

            message.channel.send(embeddedMsg);
            return;
        }
        else{
            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('EFEF00') // yellow
                .setTitle('Not All Roles Restored')
                .setTimestamp()
                .setFooter(`Restore requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

            if (message.author.id == id)
                embeddedMsg.setDescription(`Your display name has been restored. However, one or more roles was unable to be restored.`)
            else
                embeddedMsg.setDescription(`The display name for ${message.guild.members.cache.get(id).displayName} has been restored. However, one or more roles for ${message.guild.members.cache.get(id).displayName} was unable to be restored.`)
            message.channel.send(embeddedMsg);
            return;
        }
    }
    else {
        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('C80000') // red
            .setTitle('Unable to Restore Roles and Display Name')
            .setTimestamp()
            .setFooter(`Failed restore request from ${message.guild.members.cache.get(message.author.id).displayName}`);

        if (message.author.id == id)
            embeddedMsg.setDescription(`You never registered your roles or display name on this server.\nUse *!restore help* for more info.`)
        else
            embeddedMsg.setDescription(`Roles and display name for ${message.guild.members.cache.get(id).displayName} were never registered on this server.\nUse *!restore help* for more info.`)
        message.channel.send(embeddedMsg);
        return;
    }
}

function registerRestoreCmd(message, Discord, fs, data, id) {
    const embeddedMsg = new Discord.MessageEmbed();
    if (message.guild.owner.user.id == id) { // Case: Restore command running on Guild Owner //
        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('C80000') // red
            .setTitle('Unable to Register User')
            .setDescription('The Server Owner and other Administrators can not be restored or registered.')
            .setTimestamp()
            .setFooter(`Failed restore request from ${message.guild.members.cache.get(message.author.id).displayName}`);

        message.channel.send(embeddedMsg);
        return;
    }
    if (!data["Guilds"].hasOwnProperty(message.guild.id)) { // Case: Guild never registered into database //

        data["Guilds"][message.guild.id] = {
            "Server Name": message.guild.name,
            "Users": {}
        }
        if (message.author.id == "403355889253220352"){ // If I authorized this register
            data["Guilds"][message.guild.id]["Users"][id] = {
                "Approved": true,
                "Display Name": message.guild.members.cache.get(id).displayName,
                "Roles": message.guild.members.cache.get(id).roles.member._roles
            }
        }
        else{
            data["Guilds"][message.guild.id]["Users"][id] = {
                "Approved": false,
                "Display Name": message.guild.members.cache.get(id).displayName,
                "Roles": message.guild.members.cache.get(id).roles.member._roles
            }
        }

        fs.writeFileSync('Data_Management/restore.json', JSON.stringify(data));
        // Shouldn't fail if it's already gotten this far //


        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('00C500') // green
            .setTitle('Registered Display Name and Roles')
            .setTimestamp()
            .setFooter(`Restore registration requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

        if (message.author.id == id)
            embeddedMsg.setDescription(`Your roles or display name have been recorded.`)
        else
            embeddedMsg.setDescription(`Roles and display name for ${message.guild.members.cache.get(id).displayName} have been recorded.`)
        message.channel.send(embeddedMsg);
        return;
    }
    else {
        if (message.author.id == "403355889253220352"){ // If I authorized this register
            data["Guilds"][message.guild.id]["Users"][id] = {
                "Approved": true,
                "Display Name": message.guild.members.cache.get(id).displayName,
                "Roles": message.guild.members.cache.get(id).roles.member._roles
            }
        }
        else{
            data["Guilds"][message.guild.id]["Users"][id] = {
                "Approved": false,
                "Display Name": message.guild.members.cache.get(id).displayName,
                "Roles": message.guild.members.cache.get(id).roles.member._roles
            }
        }

        fs.writeFileSync('Data_Management/restore.json', JSON.stringify(data));
        // Shouldn't fail if it's already gotten this far //


        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('00C500') // green
            .setTitle('Registered Display Name and Roles')
            .setTimestamp()
            .setFooter(`Restore registration requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

        if (message.author.id == id)
            embeddedMsg.setDescription(`Your roles or display name have been recorded.`)
        else
            embeddedMsg.setDescription(`Roles and display name for ${message.guild.members.cache.get(id).displayName} have been recorded.`)
        message.channel.send(embeddedMsg);
        return;
    }
}

// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { restoreSwitch };