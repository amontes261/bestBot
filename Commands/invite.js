
//////////////////////////////////////////////
//// invite.js – JavaScript x DiscordJS //////
//// Alex Montes ––––– @a.montes28#4501 //////
//////////////////////////////////////////////

async function inviteSwitch(message, Discord, msgSplit, errFile){

 /* - Function inviteSwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic, ease-of-life command – usable on any server

    - Was designed to be triggered via command: !invite

    - Try !invite help to have the bot to provide a usage message */
       
    if (msgSplit.length == 1){ // Get link that invites bot to server //
        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('#0099ff') // light blue
            .setTitle(`Click Here To Add ${message.guild.members.cache.get("502354442054664192").displayName} To a Server`)
            .setURL('https://discord.com/api/oauth2/authorize?client_id=502354442054664192&permissions=8&scope=bot')
            .setTimestamp()
            .setFooter(`Invite link requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
    }
    else if (msgSplit.length == 2){ 
        const embeddedMsg = new Discord.MessageEmbed()
            .setTimestamp()
        if (msgSplit[1] == "help") // Command usage message requested //
            errFile.invite(message, Discord);
        else if (msgSplit[1] == "vc"){ // Get link that invites user to voice channel //
            if (message.guild.members.cache.get(message.author.id).voice.channelID == null){ // Case: User not in a voice channel //
                embeddedMsg.setTitle('Voice Channel Invite Failed')
                    .setColor('C80000') // red
                    .setDescription('You must be in a voice channel to get a valid invite link.')
                    .setFooter(`Voice chat invite requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(embeddedMsg);
                return;
            }
            
            let invite = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
            var URL = "https://discord.gg/" + invite;
            message.channel.send(URL);
        }
        else if (msgSplit[1] == "here"){ // Invite user to text channel //
            let invite = await message.guild.channels.cache.get(message.channel.id).createInvite();
            var URL = "https://discord.gg/" + invite;
            message.channel.send(URL);
        }
        else if (msgSplit[1] == "toserver"){ // Invite user to 1st Party Server //
            if (message.guild.id != '404413479915880448')
                errFile.onlyOnChromozone(message, Discord, "invite toserver");
            else{
                var URL = "https://discord.gg/mneh5cBkC9";
                message.channel.send(URL);
            }
        }
        else // Incorrect command usage message //
            errFile.invite(message, Discord);
    }
    else // Incorrect command usage message //
        errFile.invite(message, Discord);
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { inviteSwitch };