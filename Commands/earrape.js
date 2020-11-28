
async function earrapeSwitch(message, Discord, fs, msgSplit, errFile){
    if (message.guild.id != "404413479915880448"){
        errFile.onlyOnChromozone(message);
        return;
    }

    if (msgSplit.length == 1){
        errFile.earrape(message, Discord);
    }
    else if (msgSplit.length == 2 && msgSplit[1] == "list"){
        const everything = fs.readdirSync(`./EarRp/`);
        var allClips = everything.filter(file => file[0] != ".");
        //console.log(allClips);

        var embedDescription = 'Here are the names of all available earrape clips:';
        
        for (var i = 0; i < allClips.length; i++){
            embedDescription += '\n' + allClips[i].substring(0, allClips[i].length - 4);
        }

        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('EFEF00') // yellow
            .setTitle('Earrape Clip List:')
            .setDescription(embedDescription)
            .setTimestamp()
            .setFooter(`Earrape clip list requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

        message.channel.send(embeddedMsg);

    }
    else if (msgSplit.length >= 2 && msgSplit[1] == "upload"){
        errFile.missingNewFeature(message);
    }
    else{

        const everything = fs.readdirSync(`./EarRp/`);
        var allClips = everything.filter(file => file[0] != ".");

        //var embedDescription = 'Here are the names of all available earrape clips:';
        
        var clipName = msgSplit[1];
        for (var i = 2; i < msgSplit.length; i++){
            clipName += ' ' + msgSplit[i];
        }

        var exists = false;
        for (var i = 0; i < allClips.length; i++){
            if (allClips[i].substring(0, allClips[i].length - 4) == clipName)
                exists = true;
        }
        // console.log(exists);
        
        if (exists){
            message.react("▶️");
            playAudioClip(clipName, message, Discord);
        }
        else{
            message.channel.send(`Hmm... Looks like there are no clips with the name "${msgSplit[1]}". Try again with a different clip or upload one.`);
        }


    }

}

async function playAudioClip(clipName, msg, Discord){
	if (msg.member.voice.channel) {
		const connection = await msg.member.voice.channel.join();
		const dispatcher = connection.play(`EarRp/${clipName}.mp3`);
		// console.log(dispatcher);
		/*
		dispatcher.on('start', () => {
			console.log('audio.mp3 is now playing!');
		});
		*/

		dispatcher.on('finish', () => {
            msg.member.voice.channel.leave();
            const embeddedMsg = new Discord.MessageEmbed();
            embeddedMsg.setColor('00C500'); // green
            embeddedMsg.setTitle(`Clip "${clipName}" Played.`);
            embeddedMsg.setTimestamp();
            embeddedMsg.setFooter(`Earrape clip played by ${msg.guild.members.cache.get(msg.author.id).displayName}`);
            msg.channel.send(embeddedMsg);
            msg.delete();
        });
        
		dispatcher.on('error', () => {
            console.error;
            msg.member.voice.channel.leave();
            const embeddedMsg = new Discord.MessageEmbed();
            embeddedMsg.setColor('C80000'); // red
            embeddedMsg.setTitle(`Failed to play clip "${clipName}".`);
            embeddedMsg.setTimestamp();
            embeddedMsg.setFooter(`Earrape clip failed to play – attempted by ${msg.guild.members.cache.get(msg.author.id).displayName}`);
            msg.channel.send(embeddedMsg);
            msg.delete();
        });
	}
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { earrapeSwitch };