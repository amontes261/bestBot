console.log("Bot is starting...")

const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require("fs"); // filesystem
let login = JSON.parse(fs.readFileSync('auth.json')).token;



client.on('ready', () => {
	console.log("Bot leading complete. " + client.user.tag + " is now online.")

	client.user.setActivity("with Nishant's feelings")

	client.guilds.cache.forEach((guild) => {
		console.log("Running on: " + guild.name)

		/*
		guild.channels.cache.forEach((channel) => {
			console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
		})
		*/
	})
	

	// Members Channel ID : 759968169015902249
	// var botMgmt = client.channels.cache.get("759979415584636928")

	// botMgmt.send("Hey there, I'm new to these parts")
	// botMgmt.send("Oh yeah, and Nishant's gay")


})

client.on('message', function (message){
	if (message.author.bot) return;
	/*
	var msgSplit = message.split(" ");
	if (msgSplit[0] == "!bitch" && msgSplit.length > 1){
		botMgmt.send("testing complete")
		*/
		//console.log(message);
		
		if (message.content.split(' ').length != 0){
			var msgSplitUndefined = message.content.split(' ');
			var msgSplit = msgSplitUndefined.filter(word => word != undefined);
		}
		else
			return;
		
		if (msgSplit[0] == "nice")
			message.channel.send("nice");
		else if (msgSplit[0] == '!bitch'){
			// console.log(msgSplit.length);
			//console.log(message);
			if (msgSplit.length == 1){
				message.channel.send("Looks like you've summoned bitchBot.\nTry using \"!bitch help\" for help with commands.");
				// console.log("bitch command was summoned, but no other command here");
			}
			else{
				const fs = require("fs"); // filesystem
				var numPhotos = 0; // scope number of photos for each person
				var chosenPhotoNumber = 0; // number of the selected photo
				switch(String(msgSplit[1])){
					case "help":
						help(message.channel);
						break;

					case "Nishant":
						
						fs.readdir("Name/Nishant", (err, files) => {
							numPhotos = files.length;
						})
						chosenPhotoNumber = Math.floor((Math.random() * numPhotos) + 1); //Choose a number between 1 and numPhotos
						console.log(chosenPhotoNumber);
						message.channel.send({files: [`Name/Nishant/${chosenPhotoNumber}.PNG`]});
						break;

					case "Vincent":

						fs.readdir("Name/Vincent", (err, files) => {
							numPhotos = files.length;
						})
						chosenPhotoNumber = Math.floor((Math.random() * numPhotos) + 1); //Choose a number between 1 and numPhotos
						//console.log(chosenPhotoNumber);
						message.channel.send({files: [`Name/Vincent/${chosenPhotoNumber}.PNG`]});
						break;

					case "dayssince":
						if (msgSplit.length == 2)
							message.channel.send("Usage: Ask how many days since:```!bitch dayssince <tag a user>```\nSet how many days since: ```!bitch dayssince <tag a user> <number of days>```\nToday's the big day: ```!bitch dayssince <tag a user> reset```")
						else{
							var who;
							// console.log(msgSplit[2].substring(3, msgSplit[2].length - 1));
							if (msgSplit.length == 3 || msgSplit.length == 4){
								if (msgSplit[2].length == 22){
									who = msgSplit[2].substring(3, msgSplit[2].length - 1);
									if (isNaN(who))
										message.channel.send("You must tag someone as your 3rd argument. Please try again");
									else if (msgSplit.length == 3){
										daysSince(who, -1, fs, message);
									}
									else if (msgSplit.length == 4){
										if (msgSplit[3] == "reset")
											daysSince(who, 0, fs, message);
										else if (!isNaN(msgSplit[3]))
											daysSince(who, msgSplit[3], fs, message);
										else
											message.channel.send("There was a problem with the 4th argument entered. Please try again");
									}
								}
								else{
									message.channel.send("You must tag someone as your 3rd argument. Please try again");
								}
							}
							else
								message.channel.send("There was a problem with the arguments you entered. Please try again");
						}
						break;
					
					case "clip":
						if (msgSplit.length == 2)
							message.channel.send("Usage: Play a clip:```!bitch clip <clip name>```\nUpload a clip: ```!bitch clip upload <clip name>```\nList all available clips that can be sent: ```!bitch clip list```")
						else{
							/*
							var voiceChannel = message.member.voice.channel;
							voiceChannel.join().then(connection =>
							{
							   const dispatcher = connection.playFile('Clips/bitch_chris.mp3');
							   dispatcher.on("end", end => {
								 voiceChannel.leave();
								 });
							 }).catch(err => console.log(err));
							 */
						}
						break;
				} // switch end


			} // end else statement determining that !bitch is followed with command
			//client.channels.cache.get(channelID).send("Pong");
			//console.log("message")




			// porn sounds
		}
		/*
		client.uploadFile({
		to: botMgmt,
		file: "nishGay/1.PNG"
	
	
	})
	*/


	



})

function help(channel){
	channel.send("Welcome to bitchBot, created by Alex.\nHere are some commands that could be useful:\n\n \
	```bitch [NAME]``` - Sends a random, gay photo of the person");
}



function daysSince(who, indicator, fs, msg){
	let data = JSON.parse(fs.readFileSync("dayssince.json"));
	var userExists = false;
	var date;
	// console.log(data);

	// var temp = "403355889253220351";

	/*
	console.log(data[who]);
	var prevDate = new Date(data[who].date);

	var today = new Date();
	var todayString = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
	var todaysDate = new Date(todayString);

	var Difference_In_Time = todaysDate.getTime() - prevDate.getTime(); 
	var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

	//console.log(Object.keys(dictionary));
	//console.log(Difference_In_Days);
	*/
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

			//console.log("today: " + today);
			//console.log("prevDate: " + prevDate);

			var Difference_In_Time = today.getTime() - prevDate.getTime(); 
			var Difference_In_Days = parseInt( (Difference_In_Time / (1000 * 3600 * 24) ), 10) ;
			if (Difference_In_Days == 0)
				msg.channel.send(`It's been about ${Difference_In_Days} day since <@${who}> had sex. Good shit...`);
			else if (Difference_In_Days == 1)
				msg.channel.send(`It's been about ${Difference_In_Days} day since <@${who}> had sex. Pretty recent...`);
			else if (Difference_In_Days <= 45)
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
		fs.writeFileSync('dayssince.json', JSON.stringify(data));
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
		fs.writeFileSync('dayssince.json', JSON.stringify(data));
		msg.channel.send(`Ok, set the last sex date for <@${who}> to ${bigDayStr}.`);

	}
}


client.login(login);
