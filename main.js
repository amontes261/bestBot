console.log("Bot is starting...")

const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require("fs"); // filesystem
let login = JSON.parse(fs.readFileSync('auth.json')).token;
const dir = './directory';



client.on('ready', () => {
	console.log("Bot leading complete. " + client.user.tag + " is now online.")

	client.user.setActivity("with Nishant's feelings")

	client.guilds.cache.forEach((guild) => {
		console.log("Running on: " + guild.name)

		
		guild.channels.cache.forEach((channel) => {
			console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
		})
		
		
	})
	

	// Members Channel ID : 759968169015902249
	// var botMgmt = client.channels.cache.get("759979415584636928")

	// botMgmt.send("Hey there, I'm new to these parts")
	// botMgmt.send("Oh yeah, and Nishant's gay")


})

client.on('message', function (message) {
	// console.log(message.member.voice);
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
				//var numPhotos = 0; // scope number of photos for each person
				var chosenPhotoNumber = 0; // number of the selected photo
				switch(String(msgSplit[1])){
					case "help":
						help(message.channel);
						break;
					
					case "depression":
						var vcID = 769972737099169792;
						if (message.member.voice.channelID == null)
							message.channel.send(`${message.author} you must join a voice channel first.`);
						else{
							var quadID = 758827953781080125;
							var hasQuadRole = false;
							message.member.roles.cache.forEach((role) => {
								if (role.toString().substring(3, role.toString().length - 1) == quadID)
									hasQuadRole = true;
							})

							if (hasQuadRole){

								message.guild.member(message.author.id).voice.setChannel("769972737099169792");
								if (message.author.id == "114081086065213443"){
									message.channel.send(`Ok ${message.author}, its depression time. Got a special song picked out, just for you...`);
								}
								else{
									message.channel.send(`Ok ${message.author}, its depression time.`);
								}
								
								if (message.member.voice.channel) {
									const connection = await client.channels.cache.get("769972737099169792").join();

									if (message.author.id == "114081086065213443")
										var dispatcher = connection.play('Depresso/cant_help_20M.mp3');
									else{
										var dispatcher = connection.play('Depresso/robbery.mp3');
									}

									dispatcher.on('finish', () => {
										msg.member.voice.channel.leave();
									});

									dispatcher.on('error', console.error);
								}
							}
							else{
								message.channel.send(`${message.author} you're not authorized to run this command. You must have the \"quad\" role.`)
							}
						}
						
						break;

					case "Nishant":
						showRandPic("Nishant", fs, message);
						break;

					case "Vincent":
						showRandPic("Vincent", fs, message);
						break;

					case "Chris":
						showRandPic("Chris", fs, message);
						break;
					
					case "Alex":
						showRandPic("Alex", fs, message);
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
						else if (msgSplit.length >= 3){
							if (msgSplit.length == 3 && msgSplit[2] == "list"){
								message.channel.send("Here's a list of the available clips:");

								fs.readdir(`Clips/`, (err, files) => {
									if (err)
										message.channel.send(`An unexpected error has occurred... (Tagging <@${403355889253220352}> to get his attention)`);
									else{
										var pasteMsg = "";
										files.forEach(file => {
											if (file[0] != "."){
												pasteMsg += file.substring(0, file.length - 4);
												pasteMsg += "\n";
											}
										});

										message.channel.send(pasteMsg);
										message.channel.send("\n\nTo play a clip, try \"!bitch clip <clip name>\"");

									}
								});

							}
							else if (msgSplit.length == 3 && msgSplit[2] == "upload"){
								message.channel.send("This command isn't supported yet. Coming soon.");
							}
							else if (msgSplit.length == 3){
								fs.readdir(`Clips/`, (err, files) => {
									if (err)
										message.channel.send(`An unexpected error has occurred... (Tagging <@${403355889253220352}> to get his attention)`);
									else{
										var exists = false;
										files.forEach(file => {
											if (msgSplit[2] == file.substring(0, file.length - 4)){
												exists = true;
											}
										});
										if (exists){
											message.react("▶️");
											playAudioClip(msgSplit[2], message);
										}
										else{
											message.channel.send(`Hmm... Looks like there are no clips with the name "${msgSplit[2]}". Try again with a different clip or upload one.`);
										}
									}
								});
							}
							else{
								message.channel.send("There was a problem with the 3rd argument entered. Please try again");
							}
						}
						else{
							message.channel.send("There was a problem with the arguments you entered. Please try again");
						}
					break;
				} // switch end


			} // end else statement determining that !bitch is followed with command
			//client.channels.cache.get(channelID).send("Pong");
			//console.log("message")

		}
})

function help(channel){
	channel.send("Welcome to bitchBot, created by Alex.\nHere are some commands that could be useful:\n\n \
	```bitch [NAME]``` - Sends a random, gay photo of the person");
}

function showRandPic(name, fs, msg){
	fs.readdir(`Name/${name}`, (err, files) => { 
		if (err)
			msg.channel.send(`There was a problem loading ${name}'s pictures.`);
		else{
			if (files.length == 0)
				msg.channel.send(`There don't seem to be any pictures for ${name}.`);
			else{
				chosenPhotoNumber = parseInt( ((Math.random() * files.length)) + 1 , 10); //Choose a number between 1 and numPhotos
				msg.channel.send({files: [`Name/${name}/${chosenPhotoNumber}.jpeg`]});
			}
		}
	});
}


function daysSince(who, indicator, fs, msg){
	let data = JSON.parse(fs.readFileSync("dayssince.json"));
	var userExists = false;
	var date;

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

async function playAudioClip(clipName, msg){
	if (msg.member.voice.channel) {
		const connection = await msg.member.voice.channel.join();
	
		const dispatcher = connection.play(`Clips/${clipName}.mp3`);
		
		/*
		dispatcher.on('start', () => {
			console.log('audio.mp3 is now playing!');
		});
		*/

		dispatcher.on('finish', () => {
			msg.member.voice.channel.leave();
		});

		// Always remember to handle errors appropriately!
		dispatcher.on('error', console.error);
	}
}

client.login(login);
