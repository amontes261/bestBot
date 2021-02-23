
//////////////////////////////////////////
//// id.js – JavaScript x DiscordJS //////
//// Alex Montes – @a.montes28#4501 //////
//////////////////////////////////////////

const { match } = require("ffmpeg-static");

function idSwitch(message, Discord, fs, msgSplit, errFile){

    /* - Function idSwitch() was designed to ONLY be called from file main.js
    
        - Small, cosmetic command – usable on any server
    
        - Was designed to be triggered via command: !id
    
        - Try !id help to have the bot to provide a usage message */

    const embeddedMsg = new Discord.MessageEmbed();
    if(msgSplit.length == 1){
        embeddedMsg.setColor('00CBFF') // baby blue
            .setTitle('Your User ID')
            .setDescription(`User: ${message.guild.members.cache.get(message.author.id).displayName}\nID: ${message.author.id}`)
            .setTimestamp()
            .setFooter(`Own user ID requested`);
    }
    else if (msgSplit.length == 2 && msgSplit[1] == 'help'){
        errFile.id(message, Discord);
        return;
    }
    else if(msgSplit.length == 2 && message.mentions.members.size != 0 && msgSplit[1].length == 22){

        if (message.mentions.members.first().user.bot){
            embeddedMsg.setTitle(`Discord Bot ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}'s ID`)
            embeddedMsg.setDescription(`Bot: ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}\nID: ${message.mentions.members.first().user.id}`)
        }
        else{
            embeddedMsg.setTitle(`${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}'s User ID`)
            embeddedMsg.setDescription(`User: ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}\nID: ${message.mentions.members.first().user.id}`)
        }

        embeddedMsg.setColor('00CBFF') // baby blue
            .setTimestamp()
            .setFooter(`ID requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
    }
    else if(msgSplit.length == 2 && msgSplit[1] == 'channel'){
        embeddedMsg.setColor('00CBFF') // baby blue
            .setTitle('Channel ID')
            .setDescription(`Channel: ${message.channel.name}\nID: ${message.channel.id}`)
            .setTimestamp()
            .setFooter(`Channel ID requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
    }
    else if (msgSplit.length == 2 && msgSplit[1] == 'server'){
        embeddedMsg.setColor('00CBFF') // baby blue
            .setTitle('Server ID')
            .setDescription(`Server: ${message.guild.name}\nID: ${message.guild.id}`)
            .setTimestamp()
            .setFooter(`Server ID requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
    }
    else if (msgSplit.length >= 3 && msgSplit[1] == 'channel'){
        var channelName = resolveChannelName(message, msgSplit);
        
        var matchingChannels = [];
        message.guild.channels.cache.forEach((channel) => {
            if (channel.name.toLowerCase().includes(channelName.toLowerCase() ) )
                matchingChannels.push(channel);
        });

        if (matchingChannels.length == 1){
            embeddedMsg.setColor('00CBFF') // baby blue
                .setTitle('Channel ID')
                .setDescription(`Channel: ${matchingChannels[0].name}\nID: ${matchingChannels[0].id}`)
                .setTimestamp()
                .setFooter(`Channel ID requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
        }
        else if (matchingChannels.length == 0){
            embeddedMsg.setColor('C80000') // red
                .setTitle(`Channel ID Fetch Failed`)
                .setDescription(`There were no channels that match what you entered.\nPlease check your entry and try again.`)
                .setTimestamp()
                .setFooter(`Failed channel ID request by ${message.guild.members.cache.get(message.author.id).displayName}`);
        }
        else{
            embeddedMsg.setColor('C80000') // red
                .setTitle(`Channel ID Fetch Failed`)
                .setDescription(`There are multiple channel names on this server that match what you entered.\nPlease be more specific with the channel name and try again.`)
                .setTimestamp()
                .setFooter(`Failed channel ID request by ${message.guild.members.cache.get(message.author.id).displayName}`);
        }
    }
    else{
        errFile.id(message, Discord);
        return;
    }

    message.channel.send(embeddedMsg);

}

function resolveChannelName(message, msgSplit){
    var channel = '';
    for (var i = 2; i < msgSplit.length; i++){
        channel += msgSplit[i];
        if (i != msgSplit.length - 1)
            channel += ' ';
    }
    return channel.toLowerCase();
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { idSwitch };