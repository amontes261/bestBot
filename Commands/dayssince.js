
/////////////////////////////////////////////////
//// dayssince.js – JavaScript x DiscordJS //////
//// Alex Montes  ––––––  @a.montes28#4501 //////
/////////////////////////////////////////////////

function dayssinceSwitch(message, Discord, fs, msgSplit, errFile, client){
    
/* - Function dayssinceSwitch() was designed to ONLY be called from file main.js

	=== THIS IS A SPECIAL COMMAND– it will only work on authorized servers. Need to use !auth command to authorize ===

	- Was designed to be triggered via command: !dayssince

	- Try !dayssince help to have the bot to provide a usage message */
	
	var data;
    try{ // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
    }
    catch (e){
        errFile.unexpectedErr(message, Discord, msgSplit, "dayssince", client);
        return;
    }
    var allCommandsUnlocked = false;
    if (data["Guilds"].hasOwnProperty(message.guild.id) )
		allCommandsUnlocked = data["Guilds"][message.guild.id]["All Command Access"]["Activated"];
	
	if (!allCommandsUnlocked) // Ignore command entirely if server is not authorized to use it //
		return;

	const reply = new Discord.MessageEmbed();
	
    if (msgSplit.length == 1) // User wants to know their dayssince //
		daysSince(message, Discord, fs, message.author.id, -1);

    else if (msgSplit.length == 2){
		// console.log( msgSplit[1].match(/[/]/g) );
		if (msgSplit[1] == 'help') // Command usage message requested //
			errFile.daysSince(message, Discord);
		else if (msgSplit[1] == 'reset') // Reset user's dayssince to 0 //
			daysSince(message, Discord, fs, message.author.id, 0);
		else if (!isNaN(msgSplit[1]) && msgSplit[1] > 0) // Set user's dayssince to date [2nd parameter] days away from today //
			daysSince(message, Discord, fs, message.author.id, msgSplit[1]);
		else if(msgSplit[1].match(/[/]/g) != null){ // Set user's dayssince to input date //

		const reply = new Discord.MessageEmbed();
			if (msgSplit[1].match(/[/]/g).length != 2){ // Case: Invalid date format entered //
				reply.setColor('C80000') // red
					.setTitle('Invalid Date Format')
					.setDescription(`Valid date format is **MM/DD/YYYY**.\nYou entered ${msgSplit[1]}.`)
					.setTimestamp()
					.setFooter(`Dayssince registration attempt by ${message.guild.members.cache.get(message.author.id).displayName}`);
					
				message.channel.send(reply); // Send final output message //
			}
			else if (msgSplit[1].split('/').length != 3){ // Case: Invalid date format entered //
				reply.setColor('C80000') // red
					.setTitle('Invalid Date Format')
					.setDescription(`Valid date format is **MM/DD/YYYY**.\nYou entered ${msgSplit[1]}.`)
					.setTimestamp()
					.setFooter(`Dayssince registration attempt by ${message.guild.members.cache.get(message.author.id).displayName}`);
					
				message.channel.send(reply); // Send final output message //
			}
			else if ( !(msgSplit[1].split('/')[0].length == 1 || msgSplit[1].split('/')[0].length == 2) || !(msgSplit[1].split('/')[1].length == 1 || msgSplit[1].split('/')[1].length == 2) || msgSplit[1].split('/')[2].length != 4){ // Case: Invalid date format entered //
				reply.setColor('C80000') // red
					.setTitle('Invalid Date Format')
					.setDescription(`Valid date format is **MM/DD/YYYY**.\nYou entered ${msgSplit[1]}.`)
					.setTimestamp()
					.setFooter(`Dayssince registration attempt by ${message.guild.members.cache.get(message.author.id).displayName}`);
					
				message.channel.send(reply); // Send final output message //
			}
			else if (isNaN(msgSplit[1].split('/')[0]) || isNaN(msgSplit[1].split('/')[1]) || isNaN(msgSplit[1].split('/')[2])){ // Case: Invalid date format entered //
				reply.setColor('C80000') // red
					.setTitle('Invalid Date Format')
					.setDescription(`Valid date format is **MM/DD/YYYY**.\nYou entered ${msgSplit[1]}.`)
					.setTimestamp()
					.setFooter(`Dayssince registration attempt by ${message.guild.members.cache.get(message.author.id).displayName}`);
					
				message.channel.send(reply); // Send final output message //

			}
			else
				daysSince(message, Discord, fs, message.author.id, msgSplit[1]);
		}
		else if (msgSplit[1].length == 22 && message.mentions.members.size == 1) // Get tagged user's dayssince //
			daysSince(message, Discord, fs, message.mentions.members.first().user.id, -1);
		else // Incorrect command usage message //
			errFile.daysSince(message, Discord);
	}
	else if (msgSplit.length == 3){
		if (msgSplit[1].length != 22 || message.mentions.members.size != 1) // Case: Second argument is not a user tag
			errFile.tagSecondArg(message);
		else if (msgSplit[2] == 'reset') // Reset tagged user's dayssince to 0 //
			daysSince(message, Discord, fs, message.mentions.members.first().user.id, 0);
		else if (!isNaN(msgSplit[2]) && msgSplit[2] > 0 ) // Set tagged user's dayssince to date [2nd parameter] days away from today //
			daysSince(message, Discord, fs, message.mentions.members.first().user.id, msgSplit[2]);
		else if(msgSplit[2].match(/[/]/g) != null){ // Set user's dayssince to input date //
			if (msgSplit[2].match(/[/]/g).length != 2){ // Case: Invalid date format entered //
				reply.setColor('C80000') // red
					.setTitle('Invalid Date Format')
					.setDescription(`Valid date format is **MM/DD/YYYY**.\nYou entered ${msgSplit[2]}.`)
					.setTimestamp()
					.setFooter(`Dayssince registration attempt by ${message.guild.members.cache.get(message.author.id).displayName}`);
					
				message.channel.send(reply); // Send final output message //
			}
			else if (msgSplit[2].split('/').length != 3){ // Case: Invalid date format entered //
				reply.setColor('C80000') // red
					.setTitle('Invalid Date Format')
					.setDescription(`Valid date format is **MM/DD/YYYY**.\nYou entered ${msgSplit[2]}.`)
					.setTimestamp()
					.setFooter(`Dayssince registration attempt by ${message.guild.members.cache.get(message.author.id).displayName}`);
					
				message.channel.send(reply); // Send final output message //
			}
			else if ( !(msgSplit[2].split('/')[0].length == 1 || msgSplit[2].split('/')[0].length == 2) || !(msgSplit[2].split('/')[1].length == 1 || msgSplit[2].split('/')[1].length == 2) || msgSplit[2].split('/')[2].length != 4){ // Case: Invalid date format entered //
				reply.setColor('C80000') // red
					.setTitle('Invalid Date Format')
					.setDescription(`Valid date format is **MM/DD/YYYY**.\nYou entered ${msgSplit[2]}.`)
					.setTimestamp()
					.setFooter(`Dayssince registration attempt by ${message.guild.members.cache.get(message.author.id).displayName}`);
					
				message.channel.send(reply); // Send final output message //
			}
			else if (isNaN(msgSplit[2].split('/')[0]) || isNaN(msgSplit[2].split('/')[1]) || isNaN(msgSplit[2].split('/')[2])){ // Case: Invalid date format entered //
				reply.setColor('C80000') // red
					.setTitle('Invalid Date Format')
					.setDescription(`Valid date format is **MM/DD/YYYY**.\nYou entered ${msgSplit[2]}.`)
					.setTimestamp()
					.setFooter(`Dayssince registration attempt by ${message.guild.members.cache.get(message.author.id).displayName}`);
					
				message.channel.send(reply); // Send final output message //
			}
			else if ( (msgSplit[2].split('/')[0] < 1 || msgSplit[2].split('/')[0] > 12) || (msgSplit[2].split('/')[0] < 1 || msgSplit[2].split('/')[0] > 31) || (msgSplit[2].split('/')[0] < 1) ){ // Case: Invalid date format entered //
				reply.setColor('C80000') // red
					.setTitle('Invalid Date Format')
					.setDescription(`Valid date format is **MM/DD/YYYY**.\nYou entered ${msgSplit[2]}.`)
					.setTimestamp()
					.setFooter(`Dayssince registration attempt by ${message.guild.members.cache.get(message.author.id).displayName}`);
					
				message.channel.send(reply); // Send final output message //
			}
			else
				daysSince(message, Discord, fs, message.mentions.members.first().user.id, msgSplit[2]);
		}
		else // Incorrect command usage message //
			errFile.daysSince(message, Discord);
	}
	else // Incorrect command usage message //
		errFile.daysSince(message, Discord);
	}
/*
	else // Incorrect command usage message //
		errFile.daysSince(message, Discord);
		*/


function daysSince(message, Discord, fs, id, value){
	var data;
    try{ // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/dayssince.json"));
    }
    catch (e){
        errFile.unexpectedErr(message, Discord, msgSplit, "dayssince", client);
        return;
	}

	var userExists = false;
	if (data.hasOwnProperty(id) )
		userExists = true;

	const reply = new Discord.MessageEmbed();
	
	if (!userExists && value == -1){ // Case: User information was never inputted //
		reply.setColor('C80000') // red
			.setTitle('Information Unavailable')
			.setTimestamp()
			.setFooter(`Dayssince requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
		if (message.author.id == id)
			reply.setDescription(`You've never stored dayssince information for this command.\nTry *!dayssince help* to learn how to store info.`)
		else 
			reply.setDescription(`Dayssince information for ${message.guild.members.cache.get(id).displayName} was never stored`)

		message.channel.send(reply); // Send final output message //
		return;
	}
	else if (value == -1){ // Case: Get stored information for a user //

		var today = new Date();
		var prevDate = new Date(data[id]['Date']);

		var Difference_In_Time = today.getTime() - prevDate.getTime(); 
		var numDays = parseInt( (Difference_In_Time / (1000 * 3600 * 24) ), 10) ;

		reply.setTimestamp()
			.setFooter(`Dayssince requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

		if (numDays >= 65)
			reply.setTitle(`Mans Lackin.`)
				.setColor('C80000') // red
		else if (numDays >= 10)
			reply.setTitle(`Pretty Recent...`)
				.setColor('EFEF00') // yellow
		else
			reply.setTitle(`Recent. Definitely Recent.`)
			.setColor('00C500') // green
		
		var replyDescription = '';
		if (message.author.id == id && numDays == 1)
			replyDescription += `It's been **${numDays} day** since you've had sex. Good shit.\n__Date__: ${data[id].Date}`;
		else if (message.author.id == id)
			replyDescription += `It's been **${numDays} days** since you've had sex.\n__Date__: ${data[id].Date}`;
		else if ( numDays == 1)
			replyDescription += `It's been **${numDays} days** since **${message.guild.members.cache.get(id).displayName}** had sex.\n__Date__: ${data[id].Date}`;
		else
			replyDescription += `It's been **${numDays} days** since **${message.guild.members.cache.get(id).displayName}** had sex.\n__Date__: ${data[id].Date}`;
		
		if (message.author.id == id && !data[id]["Self Confirmed"]){
			replyDescription += '\n*This info may be incorrect. This usually happens when someone else runs this command on your behalf. This can be confirmed if YOU re-run the command yourself.*';
		}
		else if (!data[id]["Self Confirmed"]){
			replyDescription += "\n*This info may be incorrect. This usually happens when someone runs this command on someone else's behalf.*";
		}
		
			reply.setDescription(replyDescription);

		message.channel.send(reply); // Send final output message //

	}
	else if (value == 0){ // Execute reset dayssince command //

		reply.setTitle('Reset Days Since')
			.setColor('00C500') // green
			.setTimestamp()
			.setFooter(`Dayssince reset by ${message.guild.members.cache.get(message.author.id).displayName}`);

		var newDateStr;
		var newDate = new Date();
		newDateStr = (newDate.getMonth() + 1) + "/" + newDate.getDate() + "/" + newDate.getFullYear();

		if (message.author.id == id){
			reply.setDescription(`Guess today's the big day. I've reset your dayssince to today, ${newDateStr}.`);
		}
		else{
			reply.setDescription(`Guess today's ${message.guild.members.cache.get(id).displayName}'s big day. I've reset their dayssince to today, ${newDateStr}.`);
		}
		
		message.channel.send(reply); // Send final output message //
		
		if (message.author.id == id){
			data[ id ] = {
				"Date": newDateStr,
				"Self Confirmed": true
			}
		}
		else{
			data[ id ] = {
				"Date": newDateStr,
				"Self Confirmed": false
			}
		}
		fs.writeFileSync('Data_Management/dayssince.json', JSON.stringify(data));
			// Shouldn't fail if it's already gotten this far //
	}

	else if (!isNaN(value) ){ // Execute set dayssince command //

		reply.setTitle('Days Since Set')
			.setColor('00C500') // green
			.setTimestamp()
			.setFooter(`Dayssince set by ${message.guild.members.cache.get(message.author.id).displayName}`);

		var today = new Date();
		var todayMillisec = today.getTime();
		var daysToMillisecs = (value * 24 * 3600 * 1000);
		var bigDayMillisecs = todayMillisec - daysToMillisecs;
		var bigDay = new Date(bigDayMillisecs);
		var newDateStr = (bigDay.getMonth() + 1) + "/" + bigDay.getDate() + "/" + bigDay.getFullYear();
		
		if (message.author.id == id && numDays == 1)
			reply.setDescription(`I've set your dayssince date to ${value} day ago, ${newDateStr}.`);
		else if (message.author.id == id)
			reply.setDescription(`I've set your dayssince date to ${value} days ago, ${newDateStr}.`);
		else if ( numDays == 1)
			reply.setDescription(`I've set ${message.guild.members.cache.get(id).displayName}'s dayssince date to ${value} day ago, ${newDateStr}.`);
		else
			reply.setDescription(`I've set ${message.guild.members.cache.get(id).displayName}'s dayssince date to ${value} days ago, ${newDateStr}.`);

		message.channel.send(reply); // Send final output message //

		if (message.author.id == id){
			data[ id ] = {
				"Date": newDateStr,
				"Self Confirmed": true
			}
		}
		else{
			data[ id ] = {
				"Date": newDateStr,
				"Self Confirmed": false
			}
		}
		fs.writeFileSync('Data_Management/dayssince.json', JSON.stringify(data));
			// Shouldn't fail if it's already gotten this far //
	}
	else if (value.indexOf('/' != -1)){
		reply.setTitle('Days Since Set')
			.setColor('00C500') // green
			.setTimestamp()
			.setFooter(`Dayssince set by ${message.guild.members.cache.get(message.author.id).displayName}`);
		
		if (message.author.id == id && numDays == 1)	
			reply.setDescription(`I've set your last sex date to ${value}`);
		else if (message.author.id == id)
			reply.setDescription(`I've set your last sex date to ${value}`);
		else if ( numDays == 1)
			reply.setDescription(`I've set ${message.guild.members.cache.get(id).displayName}'s last sex date to ${value}`);
		else
			reply.setDescription(`I've set ${message.guild.members.cache.get(id).displayName}'s last sex date to ${value}`);

		message.channel.send(reply); // Send final output message //

		if (message.author.id == id){
			data[ id ] = {
				"Date": value,
				"Self Confirmed": true
			}
		}
		else{
			data[ id ] = {
				"Date": value,
				"Self Confirmed": false
			}
		}
		fs.writeFileSync('Data_Management/dayssince.json', JSON.stringify(data));
			// Shouldn't fail if it's already gotten this far //
	}
}



// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { dayssinceSwitch };