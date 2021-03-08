
////////////////////////////////////////////
//// tts.js – JavaScript x DiscordJS ////
//// Alex Montes  –––  @a.montes28#4501 ////
////////////////////////////////////////////

const { MessageFlags } = require("discord.js");

async function ttsSwitch(message, Discord, msgSplit, errFile, ttsAPI, mediaData, ttsData){

/* - Function ttsSwitch() was designed to ONLY be called from file main.js

    - Text to speech command – usable on any server

    - Was designed to be triggered via command: !tts

    - Try !tts help to have the bot to provide a usage message */
    /*
    tts start
    tts stop
    tts group
    tts -words-
    */
    if (!message.guild.me.hasPermission("CONNECT") || !message.guild.me.hasPermission("SPEAK") ){
        errFile.missingPermissions(message, Discord, "tts");
        return;
    }

    const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
    if (msgSplit.length == 1){
        errFile.tts(message, Discord);
    }
    else if (msgSplit[1] == "start"){
        if (mediaData.get(message.guild.id)["mediaPlaybackType"] == "tts"){
            embeddedMsg.setColor('EFEF00'); // yellow
            embeddedMsg.setTitle(`TTS Session Already Active`);
            embeddedMsg.setDescription(`There is already an active Text to Speech session.\nUse command *!tts stop* to end the current session before starting a new one.`);
            embeddedMsg.setFooter(`Failed TTS start command from ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg);
            return;
        }

        mediaData.get(message.guild.id)["mediaPlaybackType"] = "tts";
        ttsData.get(message.guild.id)["enabled"] = true;
        ttsData.get(message.guild.id)["targetTTSChannel"] = message.channel.id;
        ttsData.get(message.guild.id)["targetUser"] = message.author.id;

        var introSentence = ttsAPI.getAudioUrl(`${message.guild.members.cache.get(message.author.id).displayName} has started a text to speech session.`, {
            lang: 'en-US',
            slow: false,
            host: 'https://translate.google.com',
          });

        connection = await message.member.voice.channel.join();
        mediaData.get(message.guild.id)['activeConnection'] = connection;

        dispatcher = connection.play(introSentence, {
            volume: mediaData.get(message.guild.id)['volume'] / 100,
          });
        mediaData.get(message.guild.id)['activeDispatcher'] = dispatcher;

        embeddedMsg.setColor('00C500'); // green
        embeddedMsg.setTitle(`TTS Session Started`);
        embeddedMsg.setDescription(`Use *!tts stop* at any time to end the Text to Speech session.`);
        embeddedMsg.setFooter(`Session started by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
    }
    else if (msgSplit[1] == "stop"){
        if (mediaData.get(message.guild.id)["mediaPlaybackType"] != "tts"){
            embeddedMsg.setColor('C80000'); // red
            embeddedMsg.setTitle(`TTS Stop Command Not Required`);
            embeddedMsg.setDescription(`There is no currently active Text to Speech sesssion.`);
            embeddedMsg.setFooter(`Unnecessary TTS stop command from ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg);
            return;
        }
        mediaData.get(message.guild.id)['activeDispatcher'].destroy();
        mediaData.get(message.guild.id)['activeConnection'].disconnect();
        mediaData.get(message.guild.id)['activeConnection'] = null;
        mediaData.get(message.guild.id)['activeDispatcher'] = null;
        mediaData.get(message.guild.id)["mediaPlaybackType"] = null;

        ttsData.get(message.guild.id)["enabled"] = false;
        ttsData.get(message.guild.id)["groupTTS"] = false;
        ttsData.get(message.guild.id)["targetTTSChannel"] = null;
        ttsData.get(message.guild.id)["sentenceQueue"] = [];
        ttsData.get(message.guild.id)["targetUser"] = null;

        embeddedMsg.setColor('00C500'); // green
        embeddedMsg.setTitle(`TTS Session Ended`);
        embeddedMsg.setFooter(`Session ended by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
        return;
    }
    else if (msgSplit[1] == "group"){
        mediaData.get(message.guild.id)["mediaPlaybackType"] = "tts";
        ttsData.get(message.guild.id)["enabled"] = true;
        ttsData.get(message.guild.id)["groupTTS"] = true;
        ttsData.get(message.guild.id)["targetTTSChannel"] = message.channel.id;
        
        var introSentence = ttsAPI.getAudioUrl(`${message.guild.members.cache.get(message.author.id).displayName} has started a group text to speech session.`, {
            lang: 'en-US',
            slow: false,
            host: 'https://translate.google.com',
          });

        connection = await message.member.voice.channel.join();
        mediaData.get(message.guild.id)['activeConnection'] = connection;

        dispatcher = connection.play(introSentence, {
            volume: mediaData.get(message.guild.id)['volume'] / 100,
          });
        mediaData.get(message.guild.id)['activeDispatcher'] = dispatcher;

        embeddedMsg.setColor('00C500'); // green
        embeddedMsg.setTitle(`Group TTS Session Started`);
        embeddedMsg.setDescription(`Use *!tts stop* at any time to end the Text to Speech session.`);
        embeddedMsg.setFooter(`Group session started by ${message.guild.members.cache.get(message.author.id).displayName}`);
        message.channel.send(embeddedMsg);
    }
    else{
        // 🗣

        message.react('🗣');
        
        mediaData.get(message.guild.id)["mediaPlaybackType"] = "tts";
        ttsData.get(message.guild.id)["enabled"] = true;
        ttsData.get(message.guild.id)["targetTTSChannel"] = message.channel.id;
        ttsData.get(message.guild.id)["targetUser"] = message.author.id;

        var sentence = "";
        var containsLink = false;
        for (var i = 0; i < msgSplit.length; i++){
            if (msgSplit[i].includes("http") || msgSplit[i].includes("www.") )
                containsLink = true;
        }
        if (containsLink)
            sentence = `${message.guild.members.cache.get(message.author.id).displayName} sent a link.`
        else{
            for (var i = 1; i < msgSplit.length; i++){ // Resolve Requested Title Name
                sentence += msgSplit[i];
                if (i != msgSplit.length - 1)
                sentence += ' ';
            }
        }

        var sentenceAudio = ttsAPI.getAudioUrl(sentence, {
            lang: 'en-US',
            slow: false,
            host: 'https://translate.google.com',
        });

        connection = await message.member.voice.channel.join();
        mediaData.get(message.guild.id)['activeConnection'] = connection;

		dispatcher = mediaData.get(message.guild.id)['activeConnection'].play(sentenceAudio, {
            volume: mediaData.get(message.guild.id)['volume'] / 100,
          });
        mediaData.get(message.guild.id)['activeDispatcher'] = dispatcher;
		
		dispatcher.on('finish', () => {
			mediaData.get(message.guild.id)['activeDispatcher'].destroy();
            mediaData.get(message.guild.id)['activeConnection'].disconnect();
            mediaData.get(message.guild.id)['activeConnection'] = null;
            mediaData.get(message.guild.id)['activeDispatcher'] = null;
            mediaData.get(message.guild.id)["mediaPlaybackType"] = null;

            ttsData.get(message.guild.id)["enabled"] = false;
            ttsData.get(message.guild.id)["groupTTS"] = false;
            ttsData.get(message.guild.id)["targetTTSChannel"] = null;
            ttsData.get(message.guild.id)["sentenceQueue"] = [];
            ttsData.get(message.guild.id)["targetUser"] = null;
		});
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { ttsSwitch };