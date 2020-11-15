
function containsLmao(message, msgSplit){
    var containsLMAO = false;
		msgSplit.forEach((word) => {
			if (word.indexOf("lmao") != -1 || word.indexOf("lmfao") != -1)
				containsLMAO = true;
		})
		if (containsLMAO)
			message.react("🍑");
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


module.exports = { containsLmao, onewordChecks };