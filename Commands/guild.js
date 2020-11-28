
function guildSwitch(message, Discord, fs, msgSplit, errFile){
    let data = JSON.parse(fs.readFileSync("Data_Management/guild.json"));
    var userAuthorized = data["Authorized Users"].hasOwnProperty(message.author.id);

    if (!userAuthorized)
        return;

    if (msgSplit.length == 3){
        if (msgSplit[1] == "auth"){
            //console.log(message.mentions.first() );
            if (msgSplit[2] == "server"){
                // auth server
            }
            else if (msgSplit[2].length == 22 && message.mentions.members.size != 0){
                // auth user
                
            }
            else{
                
            }
        }
        else if (msgSplit[1] == "revoke"){
            if (msgSplit[2] == "server"){

            }
        }
        else{

        }
    }
    else{
        message.channel.send(`<@${message.author.id}> I've sent you a DM with proper **!guild** command usage.`)
        message.author.send(errFile.guild(message, Discord) );
    }

}



// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { guildSwitch };