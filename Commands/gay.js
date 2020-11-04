
function gaySwitch(message, msgSplit, errFile){
    var gayID = "759958809140789310";
    var hasGayRole = false;
    if (msgSplit.length == 1){
        message.member.roles.cache.forEach((role) => {
            if (role.toString().substring(3, role.toString().length - 1) == gayID)
                hasGayRole = true;
        })
    }
    else if (msgSplit.length == 2 || msgSplit.length == 3){
        if (msgSplit.length == 2 && msgSplit[1].length == 22){
            message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).roles.cache.forEach((role) => {
                if (role.toString().substring(3, role.toString().length - 1) == gayID)
                hasGayRole = true;
            })
        }
        else if (msgSplit.length == 2){
            errFile.tagSecondArg(message);
            return;
        }
        else if (msgSplit.length == 3 && msgSplit[2] == "immediate"){
            message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).roles.cache.forEach((role) => {
                if (role.toString().substring(3, role.toString().length - 1) == gayID)
                hasGayRole = true;
            })
            if (hasGayRole){
                message.channel.send("It seems this user is already gay...");
            }
            else{
                if (msgSplit[1].substring(3, msgSplit[1].length - 1) == "403355889253220352" ){ // me
                    message.channel.send(`Unable to assign ${msgSplit[1]} as gay: it is impossible for this user to be gay.`);
                }
                else{
                    message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).roles.add(gayID);
                    message.channel.send(`Assigned ${msgSplit[1]} as gay.`);
                }
            }
            return;

        }
        else if (msgSplit.length == 3 && msgSplit[2] == "remove"){
            var removerIsGay = false;
            message.guild.members.cache.get(message.author.id).roles.cache.forEach((role) => {
                if (role.toString().substring(3, role.toString().length - 1) == gayID)
                removerIsGay = true;
            })

            if (removerIsGay){
                message.channel.send(`Unable to assign ${msgSplit[1]} as straight: the role remover must NOT be gay.`);
            }
            else{
                message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).roles.remove(gayID);
                message.channel.send(`Great, ${msgSplit[1]} has been declared as straight!`);
            }
            return;
        }
        else{
            errFile.gayUsage(message);
            return;
        }
    }
    else{
        errFile.gayUsage(message);
        return;
    }

    if (hasGayRole)
        printGay(message, msgSplit, true);
    else
        printGay(message, msgSplit, false);
}


// ====================== //
// LOCAL HELPER FUNCTIONS //
// ====================== //
function printGay(message, msgSplit, isGay){
    if (msgSplit.length == 1)
        if (isGay)
            message.channel.send("Unfortunately, it would appear that you, indeed, are gay.");
        else
            message.channel.send("Fortunately, you are NOT gay.");
    else
        if (isGay)
            message.channel.send(`Unfortunately, it would appear that ${msgSplit[1]} is, in fact, gay.`);
        else
            message.channel.send(`Fortunately, ${msgSplit[1]} is NOT gay.`);
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { gaySwitch };