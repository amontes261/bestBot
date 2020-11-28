
function assertActivity(client){
	client.user.setActivity('everything | use !help');
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

function filterSayCommand(message, msgSplit){
	var hasAlex = false;
	var hasGay = false;

	msgSplit.forEach((word) => {
		if (word.indexOf("alex") != -1)
			hasAlex = true;
		if (word.indexOf("gay") != -1)
			hasGay = true;
	})

	if (hasAlex && hasGay){
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


module.exports = { assertActivity, containsLmao, filterSayCommand, onewordChecks };