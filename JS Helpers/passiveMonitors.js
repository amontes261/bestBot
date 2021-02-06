const { ConditionalNodeDependencies } = require("mathjs");

function assertActivity(client){
	client.user.setActivity('over 25 cmds: use !help');
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
	if (msgSplit[0] == '!role' || msgSplit[0] == '!gay')
		return false;
	
	var hasAlex = false;
	var hasGay = false;
	var hasBad = false;
	var hasBot = false;

	msgSplit.forEach((word) => {
		if (word.indexOf("alex") != -1 || word.indexOf("403355889253220352") != -1)
			hasAlex = true;
		if (word.indexOf("gay") != -1)
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


module.exports = { assertActivity, containsGay, containsLmao, deleteVincentBruh, ensureCorrectMemberCount, filterSayCommand, onewordChecks };