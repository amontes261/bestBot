
function roleSwitch(message, Discord, msgSplit, errFile){
    if (msgSplit.length < 4){
        errFile.role(message, Discord);
    }
    else{
        var untouchableRoleIDs = ["759957753014910996", "759958084301881364", "759957917154934784", "759960833626734594", "759960367370993695", "759959255083384872", "773295962662895686", "759958258982715442", "758827953781080125", "759958885204361237", "760147969466433576", "739000889913901159", "512625378188066826", "493622632378531840", "770479950327054367", "774065245936287754"];
        //roles: ADMIN, Gay Overlord, Sexy Boi, Friends, Friend of Friend, BOT, Cleared BOT, move, DC & Mute, quad, chonky, legacy, Server Booster, MEE6 Bot, Ali-A Bot, BitchBot, depressed
        const embeddedMsg = new Discord.MessageEmbed();
        if (msgSplit[1] == 'add'){
            if (msgSplit[2].length != 22)
                errFile.tagThirdArg(message);
            else{
                var roleName = '';
                for (var i = 3; i < msgSplit.length; i++){
                    roleName += msgSplit[i];
                    if (i != msgSplit.length - 1)
                        roleName += ' ';
                }
                var roleExists = false;
                var roleID = '-1';
                message.guild.roles.cache.forEach((role) => {
                    if (roleName == role.name.toLowerCase() ){
                        roleID = role.id;
                        roleExists = true;
                    }
                });

                if (!roleExists){
                    // inside a command, event listener, etc.
                    embeddedMsg.setColor('C80000') // red
                        .setTitle('Role Assignment Failed')
                        .setDescription(`The role "${roleName}" does not exist.\nMake sure spelling and spacing is correct`)
                        .setTimestamp()
                        .setFooter(`Role assignment attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                    return;
                }
                else if (untouchableRoleIDs.includes(roleID) && !( message.guild.members.cache.get(message.author.id).roles.cache.has("759957753014910996") || message.guild.members.cache.get(message.author.id).roles.cache.has("759958084301881364") || message.guild.members.cache.get(message.author.id).roles.cache.has("759957917154934784") ) ){
                    embeddedMsg.setColor('C80000') // red
                        .setTitle('Role Assignment Failed')
                        .setDescription(`You are not allowed to assign this role to any users.`)
                        .setTimestamp()
                        .setFooter(`Role assignment by ${message.guild.members.cache.get(message.author.id).displayName} was rejected`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                    return;
                }

                // console.log(message.guild.members.cache.get(msgSplit[2].substring(3, msgSplit[2].length - 1)).roles.cache);

                var alreadyHasRole = message.guild.members.cache.get(msgSplit[2].substring(3, msgSplit[2].length - 1)).roles.cache.has(roleID);

                if (alreadyHasRole){
                    embeddedMsg.setColor('C80000') // red
                        .setTitle('Role Assignment Failed')
                        .setDescription(`${message.guild.members.cache.get(msgSplit[2].substring(3, msgSplit[2].length - 1)).displayName} already has the "${roleName}" role`)
                        .setTimestamp()
                        .setFooter(`Role assignment attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                }
                else if (roleID == "759958809140789310" && msgSplit[2].substring(3, msgSplit[2].length - 1) == "403355889253220352"){ // me getting gay role
                    embeddedMsg.setColor('C80000') // red
                        .setTitle('Nice Try.')
                        .setDescription(`It's impossible for Alex to be gay.\nYou should know this by now.`)
                        .setTimestamp()
                        .setFooter(`Fake gay role assignment by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                }
                else if (roleID == "759958809140789310"){ // gay role
                    embeddedMsg.setColor('C80000') // red
                        .setTitle('Role Assignment Failed')
                        .setDescription(`There is a dedicated command for this role.\n Try "!gay help" for more info.`)
                        .setTimestamp()
                        .setFooter(`Role assignment by ${message.guild.members.cache.get(message.author.id).displayName} was rejected`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                }
                else{
                    message.guild.members.cache.get(msgSplit[2].substring(3, msgSplit[2].length - 1)).roles.add(roleID);
                    embeddedMsg.setColor('00C500') // green
                        .setTitle('Role Added')
                        .setDescription(`Granted the **${roleName}** role to ${message.guild.members.cache.get(msgSplit[2].substring(3, msgSplit[2].length - 1)).displayName}`)
                        .setTimestamp()
                        .setFooter(`Role added by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                }
            }
        }
        else if (msgSplit[1] == 'remove'){
            if (msgSplit[2].length != 22)
                errFile.tagThirdArg(message);
            else{
                var roleName = '';
                for (var i = 3; i < msgSplit.length; i++){
                    roleName += msgSplit[i];
                    if (i != msgSplit.length - 1)
                        roleName += ' ';
                }
                var roleExists = false;
                var roleID = '-1';
                message.guild.roles.cache.forEach((role) => {
                    if (roleName == role.name.toLowerCase() ){
                        roleID = role.id;
                        roleExists = true;
                    }
                });

                if (!roleExists){
                    // inside a command, event listener, etc.
                    embeddedMsg.setColor('C80000') // red
                        .setTitle('Role Removal Failed')
                        .setDescription(`The role "${roleName}" does not exist.\nMake sure spelling and spacing is correct`)
                        .setTimestamp()
                        .setFooter(`Role removal attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                    return;
                }

                var alreadyHasRole = message.guild.members.cache.get(msgSplit[2].substring(3, msgSplit[2].length - 1)).roles.cache.has(roleID);

                if (!alreadyHasRole){
                    embeddedMsg.setColor('C80000') // red
                        .setTitle('Role Removal Failed')
                        .setDescription(`${message.guild.members.cache.get(msgSplit[2].substring(3, msgSplit[2].length - 1)).displayName} doesn't seem to have the "${roleName}" role`)
                        .setTimestamp()
                        .setFooter(`Role removal attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                }
                else if (roleID == "759958809140789310"){ // gay role
                    embeddedMsg.setColor('C80000') // red
                        .setTitle('Role Removal Failed')
                        .setDescription(`There is a dedicated command for this role.\n Try "!gay help" for more info.`)
                        .setTimestamp()
                        .setFooter(`Role removal by ${message.guild.members.cache.get(message.author.id).displayName} was rejected`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                }
                else{
                    message.guild.members.cache.get(msgSplit[2].substring(3, msgSplit[2].length - 1)).roles.remove(roleID);
                    embeddedMsg.setColor('00C500') // green
                        .setTitle('Role Removed')
                        .setDescription(`Removed the **${roleName}** role from ${message.guild.members.cache.get(msgSplit[2].substring(3, msgSplit[2].length - 1)).displayName}`)
                        .setTimestamp()
                        .setFooter(`Role removed by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                }
            }
        }
        else if (msgSplit[1] == 'has'){
            if (msgSplit[2].length != 22)
                errFile.tagThirdArg(message);
            else{
                var roleName = '';
                for (var i = 3; i < msgSplit.length; i++){
                    roleName += msgSplit[i];
                    if (i != msgSplit.length - 1)
                        roleName += ' ';
                }
                var roleExists = false;
                var roleID = '-1';
                message.guild.roles.cache.forEach((role) => {
                    if (roleName == role.name.toLowerCase() ){
                        roleID = role.id;
                        roleExists = true;
                    }
                });

                if (!roleExists){
                    // inside a command, event listener, etc.
                    embeddedMsg.setColor('C80000') // red
                        .setTitle('Role Check Failed')
                        .setDescription(`The role "${roleName}" does not exist.\nMake sure spelling and spacing is correct`)
                        .setTimestamp()
                        .setFooter(`Role check attempted by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                    return;
                }

                var alreadyHasRole = message.guild.members.cache.get(msgSplit[2].substring(3, msgSplit[2].length - 1)).roles.cache.has(roleID);

                if (roleID == "759958809140789310"){ // gay role
                    embeddedMsg.setColor('C80000') // red
                        .setTitle('Role Check Failed')
                        .setDescription(`There is a dedicated command for this role.\n Try "!gay help" for more info.`)
                        .setTimestamp()
                        .setFooter(`Role check by ${message.guild.members.cache.get(message.author.id).displayName} was rejected`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                }
                else if (!alreadyHasRole){
                    embeddedMsg.setColor('EFEF00') // yellow
                        .setTitle('User Does **Not** Have Role')
                        .setDescription(`${message.guild.members.cache.get(msgSplit[2].substring(3, msgSplit[2].length - 1)).displayName} does not have the "${roleName}" role`)
                        .setTimestamp()
                        .setFooter(`Role check by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                }
                else{
                    embeddedMsg.setColor('00C500') // green
                        .setTitle('User **Has** Role')
                        .setDescription(`${message.guild.members.cache.get(msgSplit[2].substring(3, msgSplit[2].length - 1)).displayName} has the "${roleName}" role`)
                        .setTimestamp()
                        .setFooter(`Role check by ${message.guild.members.cache.get(message.author.id).displayName}`);
                    message.channel.send(embeddedMsg);
                    message.delete();
                }
            }
        }
        else{
            errFile.role(message, Discord);
        }

    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { roleSwitch };