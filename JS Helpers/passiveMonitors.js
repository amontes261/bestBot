
function assertActivity(client){
	client.user.setActivity('so many cmds || !help');
}

function blockKenbotClip(message, Discord, msgSplit){
	if (msgSplit.length <= 3){
		if (msgSplit[0] != 'gasp' || msgSplit[1] != 'clip')
			return;
		else{
			if (msgSplit.includes('alex_sus') ){

				const embeddedMsg = new Discord.MessageEmbed();
				var counter = 0;
				
				while (counter != 100000 || message.guild.members.cache.get("770766611929366551").voice.channelID != null){
					counter++;
				}
				message.guild.member('770766611929366551').voice.setChannel(null);

				embeddedMsg.setColor('C80000') // red
				embeddedMsg.setTitle('**Cap Clip Detected**');
				embeddedMsg.setDescription(`A **cap clip** has been detected. Cap clips are clips that express fake news.\n${message.guild.members.cache.get("770766611929366551").displayName} has been disconnected to avoid the presence of a cap clip.`);
				embeddedMsg.setTimestamp();
				embeddedMsg.setFooter(`Fake news clip requested from ${message.guild.members.cache.get(message.author.id).displayName}`);
				message.channel.send(embeddedMsg);
				message.delete();
			}
		}
	}
}

function containsGay(message, msgSplit){
	if (msgSplit[0] == '!role' || msgSplit[0] == '!gay')
		return;

    var containsGay = false;
		msgSplit.forEach((word) => {
			if (word.indexOf("gay") != -1 || word.indexOf("gae") != -1 || word.indexOf("gei") != -1)
				containsGay = true;
		})
		if (containsGay)
			message.react("🏳️‍🌈");
}

function containsLmao(message, msgSplit){
    var containsLMAO = false;
		msgSplit.forEach((word) => {
			if (word.indexOf("lmao") != -1 || word.indexOf("lmfao") != -1)
				containsLMAO = true;
		})
		if (containsLMAO)
			message.react("🍑");
}

function deleteVincentBruh(message, msgSplit, Discord){
	if (message.author.id == "770766611929366551"){ // Is KenBot //
		if (msgSplit.length == 2){
			if (msgSplit[0] == 'bruh' && msgSplit[1] == 'moment'){
				message.delete();
				const embeddedMsg = new Discord.MessageEmbed()
                .setColor('00C500') // green
                .setTitle(`Gay KenBot Dominated`)
                .setDescription(`Deleted the gay ass *bruh moment* message from KenBot.`)
                .setTimestamp()
                .setFooter(`I had this feature before you, KenBot & Vincent.`);
            	message.channel.send(embeddedMsg);
				return true;
			}
		}
	}
	return false;
}

function ensureCorrectMemberCount(message){
	var chromozoneID = "404413479915880448";
	if (message.guild.id != chromozoneID)
		return;

	var memberCountChannelID = "759968169015902249";
	var numMembers = message.guild.memberCount;

	var isCorrect = message.guild.channels.cache.get(memberCountChannelID).name == 'Members: ' + numMembers.toString();
	if (!isCorrect)
		message.guild.channels.cache.get(memberCountChannelID).setName(`Members: ${numMembers}`);
}

function filterSayCommand(message, msgSplit){
	if (message.content.includes('Help menu')) return;
	if (msgSplit[0] == '!role' || msgSplit[0] == '!gay')
		return false;
	
	var hasAlex = false;
	var hasGay = false;
	var hasBad = false;
	var hasBot = false;

	msgSplit.forEach((word) => {
		if (word.indexOf("alex") != -1 || word.indexOf("403355889253220352") != -1 || word.indexOf("@lex") != -1)
			hasAlex = true;
		if (word.indexOf("gay") != -1 || word.indexOf("g@y") != -1 || word.indexOf("gei") != -1 || word.indexOf("gae") != -1)
			hasGay = true;
		if (word.indexOf("bad") != -1)
			hasBad = true;
		if (word.indexOf("bot") != -1)
		hasBot = true;
	})

	if (hasAlex && hasGay){
		message.delete();
		return true;
	}
	else if (!msgSplit.includes('!say') && hasBad && hasBot){ // This was poorly thought out-- re-engineer this eventually
		message.delete();
		return true;
	}
	else
		return false;
}

function onewordChecks(message, msgSplit){
	if (msgSplit.length != 1)
		return false;
	if (msgSplit[0] == "nice"){
		message.channel.send("nice");
		return true;
	}
	else if (msgSplit[0] == "bruh"){
		message.channel.send("bruh");
		return true;
	}
	else if (msgSplit[0] == "wow"){
		message.channel.send("wow");
		return true;
	}
	else if (msgSplit[0] == "indeed"){
		message.channel.send("indeed");
		return true;
	}
	else if (msgSplit[0] == "ah"){
		message.channel.send("ah");
		return true;
	}
	return false;
}

function ttsMonitor(message, msgSplit, mediaData, ttsData, ttsAPI){
	// Will never activate for bot messages, already checks in main.js //
	if (!ttsData.get(message.guild.id)["enabled"])
		return;
	else if (ttsData.get(message.guild.id)["targetTTSChannel"] != null && message.channel.id != ttsData.get(message.guild.id)["targetTTSChannel"])
		return;
	else if ( (ttsData.get(message.guild.id)["targetUser"] != null && message.author.id != ttsData.get(message.guild.id)["targetUser"]) && !ttsData.get(message.guild.id)["groupTTS"])
		return;
	else if (msgSplit[0][0] == "!")
		return;

	var sentence = "";
	var containsLink = false;
	var containsTag = message.mentions.members.size >= 1;
	for (var i = 0; i < msgSplit.length; i++){
		if (msgSplit[i].includes("http") || msgSplit[i].includes("www.") )
			containsLink = true;
	}
	if (containsLink)
		sentence = `${message.guild.members.cache.get(message.author.id).displayName} sent a link.`
	else if (containsTag){
		sentence = `${message.guild.members.cache.get(message.author.id).displayName} tagged ${message.guild.members.cache.get(message.mentions.members.first().user.id).displayName}.` 
	}
	else{
		if (ttsData.get(message.guild.id)["groupTTS"]){
			sentence = `${message.guild.members.cache.get(message.author.id).displayName} said `
		}
		for (var i = 0; i < msgSplit.length; i++){ // Resolve Requested Title Name
			sentence += msgSplit[i];
			if (i != msgSplit.length - 1)
			  sentence += ' ';
		}
	}
	ttsData.get(message.guild.id)["sentenceQueue"].push(sentence); // add sentence to queue

	if (ttsData.get(message.guild.id)["sentenceQueue"].length == 1){ //say it and look for rest to say
		var sentenceAudio = ttsAPI.getAudioUrl(sentence, {
            lang: 'en-US',
            slow: false,
            host: 'https://translate.google.com',
        });

		dispatcher = mediaData.get(message.guild.id)['activeConnection'].play(sentenceAudio, {
            volume: mediaData.get(message.guild.id)['volume'] / 100,
          });
        mediaData.get(message.guild.id)['activeDispatcher'] = dispatcher;
		ttsData.get(message.guild.id)['sentenceQueue'].shift()
		
		dispatcher.on('finish', () => {
			if (ttsData.get(message.guild.id)['sentenceQueue'].length != 0)
				sentenceQueueShift(message, msgSplit, mediaData, ttsData, ttsAPI);
		});
	}
	else{
		ttsData.get(message.guild.id).sentenceQueue.push(sentence); // add sentence to queue
	}
}

////////////////////////////
// HELPER FUNCTIONS BELOW //
////////////////////////////

function sentenceQueueShift(message, msgSplit, mediaData, ttsData, ttsAPI){
	var sentenceAudio = ttsAPI.getAudioUrl(ttsData.get(message.guild.id)['sentenceQueue'][0], {
		lang: 'en-US',
		slow: false,
		host: 'https://translate.google.com',
	});
	ttsData.get(message.guild.id)['sentenceQueue'].shift()

	dispatcher = mediaData.get(message.guild.id)['activeConnection'].play(sentenceAudio, {
		volume: mediaData.get(message.guild.id)['volume'] / 100,
	  });
	mediaData.get(message.guild.id)['activeDispatcher'] = dispatcher;
  
	dispatcher.on('finish', () => {
	if (ttsData.get(message.guild.id)['sentenceQueue'].length != 0)
		sentenceQueueShift(message, msgSplit, mediaData, ttsData, ttsAPI);
	});
}


module.exports = { assertActivity, blockKenbotClip, containsGay, containsLmao, deleteVincentBruh, ensureCorrectMemberCount, filterSayCommand, onewordChecks, ttsMonitor };