const { Console } = require('console');
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require("fs"); // filesystem
const { cli } = require('winston/lib/winston/config');
let login = JSON.parse(fs.readFileSync('auth.json')).token;
const dir = './directory';
var google = require('google');

// ===========================================================
// CLIENT ON: READY
// ===========================================================

client.on('ready', () => {
	var chromozoneID = "404413479915880448";
	var dashboardID = "759971676418605066";
	var memberCountChannelID = "759968169015902249";
	var clientLogsChannelID = "772647489798537236";

	console.log("bitchBot is now online.")
	// client.guilds.cache.get(chromozoneID).channels.cache.get(clientLogsChannelID).send("bitchBot is now online.")


	// ensure proper number of members is listed //
	var numMembers = client.guilds.cache.get(chromozoneID).memberCount;
	client.guilds.cache.get(chromozoneID).channels.cache.get(memberCountChannelID).setName(`Members: ${numMembers}`);

	client.user.setActivity("with Nishant's feelings")

	console.log("Running on the following server(s):")
	client.guilds.cache.forEach((guild) => {
		console.log(guild.name);
		/*
		guild.channels.cache.forEach((channel) => {
			console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
		})
		*/
	})

})

// ===========================================================
// CLIENT ON: MEMBER JOINS THE SERVER
// ===========================================================

client.on("guildMemberAdd", function(member){
	var chromozoneID = "404413479915880448";
	var dashboardID = "759971676418605066";
	var memberCountChannelID = "759968169015902249";
	
	member.roles.add("759960911682732042");
	member.send(`Welcome to **THE CHROMOZONE 2.0**. You've been provided with the **Un-approved** role– please DM <@403355889253220352> or any other admin to become approved`);


	var numMembers = client.guilds.cache.get(chromozoneID).memberCount;
	if (member.user.bot)
		client.guilds.cache.get(chromozoneID).channels.cache.get(dashboardID).send(`Discord Bot **@${member.user.tag.substring(0, member.user.tag.length - 5)}** has been added to the server.\nThere are now ${numPeopleLeft} members.`)
	else
		client.guilds.cache.get(chromozoneID).channels.cache.get(dashboardID).send(`The member **@${member.user.tag.substring(0, member.user.tag.length - 5)}** has been removed or left the server.\nThere are now ${numPeopleLeft} members.`)

	client.guilds.cache.get(chromozoneID).channels.cache.get(memberCountChannelID).setName(`Members: ${numMembers}`);
});

// ===========================================================
// CLIENT ON: MEMBER LEAVES THE SERVER
// ===========================================================

client.on("guildMemberRemove", function(member){
	var chromozoneID = "404413479915880448";
	var dashboardID = "759971676418605066";
	var memberCountChannelID = "759968169015902249";
	
	var numMembers = client.guilds.cache.get(chromozoneID).memberCount;
	if (member.user.bot)
		client.guilds.cache.get(chromozoneID).channels.cache.get(dashboardID).send(`Discord Bot **@${member.user.tag.substring(0, member.user.tag.length - 5)}** has been removed from the server.\nThere are now ${numPeopleLeft} members remaining.`)
	else
		client.guilds.cache.get(chromozoneID).channels.cache.get(dashboardID).send(`The member **@${member.user.tag.substring(0, member.user.tag.length - 5)}** has been removed or left the server.\nThere are now ${numPeopleLeft} members remaining.`)

	client.guilds.cache.get(chromozoneID).channels.cache.get(memberCountChannelID).setName(`Members: ${numMembers}`);
});


// ===========================================================
// CLIENT ON: MESSAGE GETS SENT
// ===========================================================

client.on('message', async message => {
	// client.guilds.cache.get("404413479915880448").members.cache.get("403355889253220352").send(`test`);
	// console.log(message.member.voice);
	if (message.author.bot) return;

	//console.log(message.author.id);
	// console.log(client.guilds.cache.get("404413479915880448").members.cache.get("403355889253220352").voice);
	// return;

	/*
	var msgSplit = message.split(" ");
	if (msgSplit[0] == "!bitch" && msgSplit.length > 1){
		botMgmt.send("testing complete")
		*/
		//console.log(message);
		
		if (message.content.split(' ').length != 0){
			var msgSplitUndefined = message.content.split(' ');
			var msgSplitUpper = msgSplitUndefined.filter(word => word != undefined);
			var msgSplit = [];
			msgSplitUpper.forEach((word) => {
				msgSplit.push(word.toLowerCase() );
			})
		}
		else
			return;
		// console.log(msgSplit[0]);
		// console.log(msgSplit[1]);
		var containsLMAO = false;

		msgSplit.forEach((word) => {
			if (word.indexOf("lmao") != -1)
				containsLMAO = true;
		})
		if (containsLMAO)
			message.react("🍑");

		/*
		message.channel.send({embed: {
			color: "C80000",
			author: {
				name: client.user.username,
				icon_url: client.user.avatarURL
			},
			title: "This is an embed",
			url: "http://google.com",
			description: "This is a test embed to showcase what they look like and what they can do.",
			fields: [{
				name: "Fields",
				value: "They can have different fields with small headlines."
				},
				{
				name: "Masked links",
				value: "You can put [masked links](http://google.com) inside of rich embeds."
				},
				{
				name: "Markdown",
				value: "You can put all the *usual* **__Markdown__** inside of them."
				}
			],
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: "© Example"
			}
			}
		});
		*/


		if (msgSplit[0] == "nice")
			message.channel.send("nice");
		else if (msgSplit[0][0] == '!'){
			// console.log(msgSplit.length);
			//console.log(message);
			if (msgSplit[0].length == 1){
				message.channel.send("Looks like you've summoned bitchBot.\nTry \"!bitch help\" for commands.");
			}
			else{
				const fs = require("fs"); // filesystem
				//var numPhotos = 0; // scope number of photos for each person
				var chosenPhotoNumber = 0; // number of the selected photo
				switch(String(msgSplit[0].substring(1, msgSplit[0].length))){
					// =======================
					// HELP SWITCH
					// =======================
					case "help":
						help(message.channel);
					break;
					
					// =======================
					// GAY SWITCH
					// =======================
					case "gay":
						var gayID = "759958809140789310";
						var hasGayRole = false;
						if (msgSplit.length == 1){
							message.member.roles.cache.forEach((role) => {
								if (role.toString().substring(3, role.toString().length - 1) == gayID)
									hasGayRole = true;
							})
						}
						else if (msgSplit.length == 2 || msgSplit.length == 3){
							if (msgSplit.length == 2 && msgSplit[1].length == 22){
								message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).roles.cache.forEach((role) => {
									if (role.toString().substring(3, role.toString().length - 1) == gayID)
									hasGayRole = true;
								})
							}
							else if (msgSplit.length == 2){
								message.channel.send("You must tag someone as your 2nd argument. Please try again");
								return;
							}
							else if (msgSplit.length == 3 && msgSplit[2] == "immediate"){
								message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).roles.cache.forEach((role) => {
									if (role.toString().substring(3, role.toString().length - 1) == gayID)
									hasGayRole = true;
								})
								if (hasGayRole){
									message.channel.send("It seems this user is already gay...");
								}
								else{
									if (msgSplit[1].substring(3, msgSplit[1].length - 1) == "403355889253220352" ){ // me
										message.channel.send(`Unable to assign ${msgSplit[1]} as gay: it is impossible for this user to be gay.`);
									}
									else{
										message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).roles.add(gayID);
										message.channel.send(`Assigned ${msgSplit[1]} as gay.`);
									}
								}
								return;

							}
							else if (msgSplit.length == 3 && msgSplit[2] == "remove"){
								var removerIsGay = false;
								message.guild.members.cache.get(message.author.id).roles.cache.forEach((role) => {
									if (role.toString().substring(3, role.toString().length - 1) == gayID)
									removerIsGay = true;
								})

								if (removerIsGay){
									message.channel.send(`Unable to assign ${msgSplit[1]} as straight: the role remover must NOT be gay.`);
								}
								else{
									message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).roles.remove(gayID);
									message.channel.send(`Great, ${msgSplit[1]} has been declared as straight!`);
								}
								return;
							}
							else{
								message.channel.send("Usage: Are you gay? ```!gay```\nIs another user gay?: ```!gay <Tag a User>```\nDeclare another user as gay: ```!gay <Tag a User> immediate```\nDeclare another user as straight: ```!gay <Tag a User> remove```");
								return;
							}
						}
						else{
							message.channel.send("Usage: Are you gay? ```!gay```\nIs another user gay?: ```!gay <Tag a User>```\nDeclare another user as gay: ```!gay <Tag a User> immediate```\nDeclare another user as straight: ```!gay <Tag a User> remove```");
							return;
						}

						if (hasGayRole){
							if (msgSplit.length == 1){
								message.channel.send("Unfortunately, it would appear that you, indeed, are gay.");
							}
							else{
								message.channel.send(`Unfortunately, it would appear that ${msgSplit[1]} is, in fact, gay.`);
							}
						}
						else{
							if (msgSplit.length == 1){
								message.channel.send("Fortunately, you are NOT gay.");
							}
							else{
								message.channel.send(`Fortunately, ${msgSplit[1]} is NOT gay.`);
							}
						}
					break;
					
					// =======================
					// DEPRESSION CMD SWITCH
					// =======================
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

					// =======================
					// PIC SWITCH
					// =======================
					case "pic":
						// console.log(msgSplit[1]);
						if (msgSplit.length == 1){
							message.channel.send("Usage: ```!pic <Tag a user>```\nUpload a pic: ```!pic add <Tag a User>```");
						}
						else if (msgSplit.length == 2){ // send pic
							showRandPic(msgSplit[1].substring(3, msgSplit[1].length - 1), fs, message);
						}
						else if (msgSplit.length == 3){ // upload
							uploadPic(msgSplit[1].substring(3, msgSplit[1].length - 1), fs, message);
						}
						else{
							message.channel.send("You have entered too many arguments. Please try again.");
						}
					break;

					// =======================
					// DAYS SINCE SWITCH
					// =======================
					case "dayssince":
						if (msgSplit.length == 1)
							message.channel.send("Usage: Ask how many days since:```!dayssince <tag a user>```\nSet how many days since: ```!dayssince <tag a user> <number of days>```\nToday's the big day: ```!dayssince <tag a user> reset```")
						else{
							var who;
							// console.log(msgSplit[1].substring(3, msgSplit[1].length - 1));
							if (msgSplit.length == 2 || msgSplit.length == 3){
								if (msgSplit[1].length == 22){
									who = msgSplit[1].substring(3, msgSplit[1].length - 1);
									if (isNaN(who))
										message.channel.send("You must tag someone as your 3rd argument. Please try again");
									else if (msgSplit.length == 2){
										daysSince(who, -1, fs, message);
									}
									else if (msgSplit.length == 3){
										if (msgSplit[2] == "reset")
											daysSince(who, 0, fs, message);
										else if (!isNaN(msgSplit[2]))
											daysSince(who, msgSplit[2], fs, message);
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

					// =======================
					// CLIP SWITCH
					// =======================
					case "clip":
						if (msgSplit.length == 1)
							message.channel.send("Usage: Play a clip:```!clip <clip name>```\nUpload a clip: ```!bitch clip upload <clip name>```\nList all available clips that can be sent: ```!bitch clip list```")
						else if (msgSplit.length >= 2){
							if (msgSplit.length == 2 && msgSplit[1] == "list"){
								message.channel.send("Here's a list of the available clips:");

								fs.readdir(`Clips/`, (err, files) => {
									if (err)
										message.channel.send(`An unexpected error has occurred... (Tagging <@403355889253220352> to get his attention)`);
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
							else if (msgSplit.length == 2 && msgSplit[1] == "upload"){
								message.channel.send("This command isn't supported yet. Coming soon.");
							}
							else if (msgSplit.length == 2){
								fs.readdir(`Clips/`, (err, files) => {
									if (err)
										message.channel.send(`An unexpected error has occurred... (Tagging <@403355889253220352> to get his attention)`);
									else{
										var exists = false;
										files.forEach(file => {
											if (msgSplit[1] == file.substring(0, file.length - 4)){
												exists = true;
											}
										});
										if (exists){
											message.react("▶️");
											playAudioClip(msgSplit[1], message);
										}
										else{
											message.channel.send(`Hmm... Looks like there are no clips with the name "${msgSplit[1]}". Try again with a different clip or upload one.`);
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

					// =======================
					// COIN FLIP SWITCH
					// =======================
					case "coinflip":
						if (msgSplit.length != 1){
							message.channel.send("Usage: Flip a coin: ```!coinflip```")
						}
						else{
							var coin = parseInt( Math.random() * 2 , 10);
							// console.log(coin);

							if (coin == 0)
								message.channel.send({embed: {
									color: "00C500",
									title: "Heads",
									description: "The result of the requested coinflip is **heads**.",
									footer: {
										text: `Coinflip requested by ${message.guild.members.cache.get(message.author.id).displayName}`
									}
								}});
							else
								message.channel.send({embed: {
									color: "C80000",
									title: "Tails",
									description: "The result of the requested coinflip is **tails**.",
									footer: {
										timestamp: new Date(),
										text: `Coinflip requested by ${message.guild.members.cache.get(message.author.id).displayName}`
									}
								}});
							message.delete();
						}
					break;

					// =======================
					// GOOGLE SWITCH
					// =======================
					case "google":
						message.channel.send("This implementation is under construction.........");
						return;
						var textToSearch = '';
						for (var i = 1; i < msgSplitUpper.length; i++){
							textToSearch += msgSplitUpper[i];
							if (i != msgSplitUpper.length - 1)
								textToSearch += ' ';
						}

						//message.channel.send("Returning Debug: " + textToSearch);

						google.resultsPerPage = 50;
						var nextCounter = 0;
						google(textToSearch, function (err, res){
							if (err) console.error(err)
						   
							for (var i = 0; i < res.links.length; i++) {
							  var link = res.links[i];
							  console.log (res.links);
							  console.log(link.title + ' - ' + link.href)
							  console.log(link.description + "\n")
							}
						   
							if (nextCounter < 4) {
							  nextCounter += 1
							  if (res.next) res.next()
							}
						  })
					break;

					// =======================
					// SUMMON SWITCH
					// =======================
					case "summon":
						if (msgSplit.length == 1){
							message.channel.send("Usage: Get user's attention here: ```!summon <Tag a user> <(Optional) Num. of Pings, Max: 5>```\nGet a user's attention via DM: ```!summon <Tag a user> DM <(Optional) Num. of Pings, Max: 5>```");
						}
						else if (msgSplit.length == 2){
							if (msgSplit.length == 2 && msgSplit[1].length == 22){
								if (message.author.id == msgSplit[1].substring(3, msgSplit[1].length - 1) ){
									message.channel.send("Seems like you've summoned yourself here...");
									return;
								}
								message.channel.send(`${msgSplit[1]} ------ Member <@${message.author.id}> wants your attention`);
								if (message.guild.members.cache.get(message.author.id).voice.channelID != null){
									if (message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).voice.channelID != message.guild.members.cache.get(message.author.id).voice.channelID){ // if user searching for isnt in same channel
										let invite = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
										message.channel.send("Join here: discord.gg/" + invite);
									}
								}
								message.delete();
							}
							else
								message.channel.send("Usage: Get user's attention here: ```!summon <Tag a user> <(Optional) Num. of Pings, Max: 5>```\nGet a user's attention via DM: ```!summon <Tag a user> DM <(Optional) Num. of Pings, Max: 5>```");
						}
						else if (msgSplit.length == 3 && msgSplit[1].length == 22){
							if (message.author.id == msgSplit[1].substring(3, msgSplit[1].length - 1) )
								message.channel.send("Seems like you've summoned yourself here...");
							else if (msgSplit[2] == "dm"){
								message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).send(`<@${message.author.id}> from the CHROMOZONE Discord Server wants your attention.`);
								if (message.guild.members.cache.get(message.author.id).voice.channelID != null){
									if (message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).voice.channelID != message.guild.members.cache.get(message.author.id).voice.channelID){ // if user searching for isnt in same channel
										let invite = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
										message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).send("Join here: discord.gg/" + invite);
									}
								}
								message.delete();
								message.channel.send(`<@${message.author.id}> ==> Successfully summoned ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName}.`);
							}
							else if (!isNaN(msgSplit[2]) && msgSplit[2] > 0){
								if (msgSplit[3] > 5)
									message.channel.send("The maximum number of pings that can be sent is 5. Please enter a valid number, or no number to ping once.");
								else{
									for (var i = 0; i < msgSplit[2] - 1; i++){
										message.channel.send(msgSplit[1]);
									}
									message.channel.send(`${msgSplit[1]} ------ Member <@${message.author.id}> wants your attention`);

									if (message.guild.members.cache.get(message.author.id).voice.channelID != null){
										if (message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).voice.channelID != message.guild.members.cache.get(message.author.id).voice.channelID){ // if user searching for isnt in same channel
											let invite = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
											message.channel.send("Join here: discord.gg/" + invite);
										}
									}
									message.delete();
								}
							}
							else{
								message.channel.send("Usage: Get user's attention here: ```!summon <Tag a user> <(Optional) Num. of Pings, Max: 5>```\nGet a user's attention via DM: ```!summon <Tag a user> DM <(Optional) Num. of Pings, Max: 5>```");
							}
						}

						else if(msgSplit.length == 4 && msgSplit[1].length == 22 && msgSplit[2] == "dm" && (!isNaN(msgSplit[3]) && msgSplit[3] > 0) ){
							if (message.author.id == msgSplit[1].substring(3, msgSplit[1].length - 1) )
								message.channel.send("Seems like you've summoned yourself here...");
							else if (msgSplit[3] > 5)
								message.channel.send("The maximum number of pings that can be sent is 5. Please enter a valid number, or no number to ping once.");
							else{
								for (var i = 0; i < msgSplit[3] - 1; i++){
									message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).send(`${msgSplit[1]}`);
									
								}
								message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).send(`<@${message.author.id}> from the CHROMOZONE Discord Server wants your attention.`);


								if (message.guild.members.cache.get(message.author.id).voice.channelID != null){
									if (message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).voice.channelID != message.guild.members.cache.get(message.author.id).voice.channelID){ // if user searching for isnt in same channel
										let invite = await message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).createInvite();
										message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1)).send("Join here: discord.gg/" + invite);
									}
								}
								message.delete();
								if (msgSplit[3] != 1)
									message.channel.send(`<@${message.author.id}> ==> Successfully summoned ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName} ${msgSplit[3]} times.`)
								else
									message.channel.send(`<@${message.author.id}> ==> Successfully summoned ${message.guild.members.cache.get(msgSplit[1].substring(3, msgSplit[1].length - 1) ).displayName}.`)
							}
						}
						else
							message.channel.send("Usage: Get user's attention here: ```!summon <Tag a user> <(Optional) Num. of Pings, Max: 5>```\nGet a user's attention via DM: ```!summon <Tag a user> DM <(Optional) Num. of Pings, Max: 5>```");
						break;
				} // switch end


			} // end else statement determining that !bitch is followed with command
			//client.channels.cache.get(channelID).send("Pong");

		}
})


// ===========================================================
// BEGIN HELPER FUNCTIONS FOR ABOVE MAIN
// ===========================================================


function help(channel){
	channel.send("Welcome to bitchBot, created by Alex.\nHere are some commands that could be useful:\n\n \
	```!pic [Tag a Person]``` - Sends a random, gay photo of the person");
}

function showRandPic(name, fs, msg){
	try{
		var userExists = false;
		const allFiles = fs.readdirSync("./Pics");
		if (allFiles.includes(name))
			userExists = true;

		if (userExists){
			const everything = fs.readdirSync(`./Pics/${name}`);
			var allPics = everything.filter(file => file[0] != ".");

			if (allPics.length != 0){
				chosenPhotoNumber = parseInt( ((Math.random() * allPics.length)) + 1 , 10); //Choose a number between 1 and numPhotos
				msg.channel.send({files: [`Pics/${name}/${chosenPhotoNumber}.jpeg`]});
				msg.delete();
			}
			else
				msg.channel.send(`There don't seem to be any pictures for <@${name}>.`);
		}
		else
			msg.channel.send(`There don't seem to be any pictures for <@${name}>.`);
	}
	catch (e){
		msg.channel.send(`An unexpected error has occurred... (Tagging <@403355889253220352> to get his attention)`);
	}
}

function uploadPic(name, fs, msg){
	msg.channel.send(`<@${name}> this hasn't been implemented yet.`);
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
