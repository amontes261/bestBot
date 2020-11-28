
function dayssinceSwitch(message, fs, msgSplit, errFile){
    if (msgSplit.length == 1)
        daysSince(message.author.id, -1, fs, message);
    else{
        var who;
        // console.log(msgSplit[1].substring(3, msgSplit[1].length - 1));
        if (msgSplit.length == 2 || msgSplit.length == 3){
            if (msgSplit[1].length == 22){
                who = msgSplit[1].substring(3, msgSplit[1].length - 1);
                if (isNaN(who))
                    errFile.tagThirdArg(message);
                else if (msgSplit.length == 2){
                    daysSince(who, -1, fs, message);
                }
                else if (msgSplit.length == 3){
                    if (msgSplit[2] == "reset")
                        daysSince(who, 0, fs, message);
                    else if (!isNaN(msgSplit[2]))
                        daysSince(who, msgSplit[2], fs, message);
                    else
                        errFile.fourthArgProblem(message);
                }
            }
            else{
                errFile.tagSecondArg(message);
            }
        }
        else
            errFile.generalArgProblem(message);
    }
}


function daysSince(who, indicator, fs, msg){
	let data = JSON.parse(fs.readFileSync("Data_Management/dayssince.json"));
	var userExists = false;

	Object.keys(data).forEach(function(key){
		if (who == key)
			userExists = true;
	});

	if (indicator == -1){ // return days since

		if (!userExists)
			msg.channel.send("Could not find the user you're looking for. User might not be registered...");
		else{
			var today = new Date();
			var prevDate = new Date(data[who].date);

			var Difference_In_Time = today.getTime() - prevDate.getTime(); 
			var Difference_In_Days = parseInt( (Difference_In_Time / (1000 * 3600 * 24) ), 10) ;
			if (Difference_In_Days == 0)
				msg.channel.send(`It's been about ${Difference_In_Days} day since <@${who}> had sex. Good shit.`);
			else if (Difference_In_Days == 1)
				msg.channel.send(`It's been about ${Difference_In_Days} day since <@${who}> had sex. Pretty recent...`);
			else if (Difference_In_Days <= 65)
				msg.channel.send(`It's been about ${Difference_In_Days} days since <@${who}> had sex. Pretty recent...`);
			else
				msg.channel.send(`It's been about ${Difference_In_Days} days since <@${who}> had sex. Mans do be lacking doe...`);
		}
	}
	else if (indicator == 0){ // reset days since
		var newDateStr;
		var newDate = new Date();

		newDateStr = (newDate.getMonth() + 1) + "/" + newDate.getDate() + "/" + newDate.getFullYear();

		data[ who ] = {"date" : newDateStr};
		fs.writeFileSync('Data_Management/dayssince.json', JSON.stringify(data));
		msg.channel.send(`Ok, set the last sex date for <@${who}> to today's date.`);

	}
	else{ // set days since
		var today = new Date();
		var todayMillisec = today.getTime();

		var daysToMillisecs = (indicator * 24 * 3600 * 1000);

		var bigDayMillisecs = todayMillisec - daysToMillisecs;
		var bigDay = new Date(bigDayMillisecs);

		var bigDayStr = (bigDay.getMonth() + 1) + "/" + bigDay.getDate() + "/" + bigDay.getFullYear();
		data[ who ] = {"date" : bigDayStr};
		fs.writeFileSync('Data_Management/dayssince.json', JSON.stringify(data));
		msg.channel.send(`Ok, set the last sex date for <@${who}> to ${bigDayStr}.`);

	}
}



// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { dayssinceSwitch };