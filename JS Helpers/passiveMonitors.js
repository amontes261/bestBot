
function containsLmao(message, msgSplit){
    var containsLMAO = false;
		msgSplit.forEach((word) => {
			if (word.indexOf("lmao") != -1)
				containsLMAO = true;
		})
		if (containsLMAO)
			message.react("🍑");
}


module.exports = { containsLmao };