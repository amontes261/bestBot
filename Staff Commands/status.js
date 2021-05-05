
////////////////////////////////////////////
//// status.js – JavaScript x DiscordJS ////
//// Alex Montes  –––  @a.montes28#4501 ////
////////////////////////////////////////////

const { ConsoleTransportOptions } = require("winston/lib/winston/transports");

function statusSwitch(message, Discord, fs, msgSplit, errFile, mediaData, ttsData, client){
    /*
    const mediaDataEntry = {
        mostRecentTextChannel: null,
        activeVoiceChannel: null,
        activeConnection: null,
        activeDispatcher: null,
        songQueue: [],
        clipQueue: [],
        volume: 100,
        nowPlayingMessageID: null,
        playingMusic: false,
        playingClip: false,
        mediaPlaybackType: null
    };
    
    const ttsDataEntry = {
        enabled: false,
        groupTTS: false,
        targetTTSChannel: null,
        sentenceQueue: [],
        targetUser: null,
    };
    */
    var data;
    try{ // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
    }
    catch (e){
        errFile.unexpectedErr(message, Discord, msgSplit, "status", client);
        return;
    }

    var isMaster = data["Master"].hasOwnProperty(message.author.id);

    if (!isMaster){ // Ensure user has proper permission to use this command //
        errFile.permissionDenied(message, Discord, "status");
        return;
    }

    var serverNames = '';
    var serverActivities = '';
    var topFivePlayed = '';
    var activeGuildCounter = 0;
    
    client.guilds.cache.forEach((guild) => {
        if (mediaData.get(guild.id)['mediaPlaybackType'] != null){
            activeGuildCounter+= 1;
            serverNames += guild.name + '\n';
            if (mediaData.get(guild.id)['mediaPlaybackType'] == 'tts'){
                serverActivities += "Text To Speech Session" + '\n';
            }
            else if (mediaData.get(guild.id)['mediaPlaybackType'] == 'music'){
                serverActivities += "Music Playback" + '\n';
            }
            else if (mediaData.get(guild.id)['mediaPlaybackType'] == 'clip'){
                serverActivities += "Clip Playback" + '\n';
            }
            else{
                errFile.unexpectedErr(message, Discord, msgSplit, "status", client);
                return;
            }

        }
    })

    if (activeGuildCounter != 0){
        const embeddedMsg = new Discord.MessageEmbed()
            .setAuthor(`Current Activity Status`, message.guild.members.cache.get("502354442054664192").user.avatarURL( { format: 'jpg', size: 2048 } ) )
            .setColor('00CBFF') // baby blue
            if (activeGuildCounter == 1)
                embeddedMsg.setDescription(`There is 1 server currently using client features.`)
            else
                embeddedMsg.setDescription(`There are ${activeGuildCounter} servers currently using client features.`)
            if (activeGuildCounter <= 5)
                embeddedMsg.addFields({ name: 'Server', value: serverNames, inline: true },
                { name: 'Activity', value: serverActivities, inline: true } )
            .setTimestamp()
            .setFooter(`Client status summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
        return;
    }
    else{
        const inactiveMsg = new Discord.MessageEmbed()
            .setAuthor(`No Active Servers`, message.guild.members.cache.get("502354442054664192").user.avatarURL( { format: 'jpg', size: 2048 } ) )
            .setColor('00CBFF') // baby blue
            .setDescription('There are no servers using client features.\nThis client can be safely shut down at this time.')
            .setTimestamp()
            .setFooter(`Client status summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(inactiveMsg);
        return;
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { statusSwitch };
