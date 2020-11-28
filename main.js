// ============= //
// INITIAL SETUP //
// ============= //
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require("fs"); // filesystem
let login = JSON.parse(fs.readFileSync('Data_Management/auth.json')).token;
const youtube = require('ytdl-core');
const math = require('mathjs');

// ============= //
// FILE READ-INS //
// ============= //
const errFile = require('./JS\ Helpers/errMessages.js');
const passive = require('./JS\ Helpers/passiveMonitors.js');
const gayCmd = require('./Commands/gay.js');
const depressionCmd = require('./Commands/depression.js');
const pollCmd = require('./Commands/poll.js');
const picCmd = require('./Commands/pic.js');
const clipCmd = require('./Commands/clip.js');
const summonCmd = require('./Commands/summon.js');
const dayssinceCmd = require('./Commands/dayssince.js');
const coinflipCmd = require('./Commands/coinflip.js');
const googleCmd = require('./Commands/google.js');
const shutdownCmd = require('./Commands/shutdown.js');
const amongusCmd = require('./Commands/amongus.js');
const sayCmd = require('./Commands/say.js');
const silenceCmd = require('./Commands/silence.js');
const isolateCmd = require('./Commands/isolate.js');
const avatarCmd = require('./Commands/avatar.js');
const pingCmd = require('./Commands/ping.js');
const roleCmd = require('./Commands/role.js');
const inviteCmd = require('./Commands/invite.js');
const earrapeCmd = require('./Commands/earrape.js');
const playCmd = require('./Commands/play.js');
const feedbackCmd = require('./Commands/feedback.js');
const mathCmd = require('./Commands/math.js');
const rpsCmd = require('./Commands/rockpaperscissors.js');
const moderationCmds = require('./Commands/moderation.js');
const restartCmd = require('./Commands/restart.js');
const guildCmd = require('./Commands/guild.js');

// ===========================================================
// CLIENT ON: READY
// ===========================================================

client.on('ready', () => {
	var chromozone = client.guilds.cache.get("404413479915880448");
	
	// =========================== //
	// CHROMOZONE RELATED COMMANDS //
	// =========================== //
	if (chromozone != undefined && chromozone != null){
		var memberCountChannel = chromozone.channels.cache.get("759968169015902249");
		var numMembers = chromozone.memberCount;
		memberCountChannel.setName(`Members: ${numMembers}`);
		
		var clientLogChannel = chromozone.channels.cache.get("772647489798537236");
		const logStartupMsg = new Discord.MessageEmbed()
			.setColor('00C500') //green 
			.setTitle('Bot Online')
			.setTimestamp()

		clientLogChannel.send(logStartupMsg);
	}
	
	// ======================== //
	// STREAM LAUNCH TO CONSOLE //
	// ======================== //
	client.user.setActivity('everything | use !help');
	console.log("\n==============================");
	console.log("bestBot is now online.\n")

	let numServers = client.guilds.cache.size;
	if (numServers == 1)
		console.log(`Running on ${numServers} server:`);
	else
		console.log(`Running on ${numServers} servers:`);

	client.guilds.cache.forEach((guild) => {
		console.log(guild.name);
	})
	console.log("==============================");
})

// ===========================================================
// CLIENT ON: MEMBER JOINS THE SERVER
// ===========================================================

client.on("guildMemberAdd", function(member){
	var chromozoneID = "404413479915880448";
	if (client.guild.id != chromozoneID)
		return;

	var dashboardID = "759971676418605066";
	var memberCountChannelID = "759968169015902249";
	
	if (member.user.bot)
		member.roles.add("759959255083384872"); // BOT role
	else{
		member.roles.add("759960911682732042"); // Un-Approved role
		member.send(`Welcome to **THE CHROMOZONE 2.0**. You've been provided with the **Un-approved** role– please DM <@403355889253220352> or any other admin to become approved`);
	}

	var numMembers = client.guilds.cache.get(chromozoneID).memberCount;
	if (member.user.bot)
		client.guilds.cache.get(chromozoneID).channels.cache.get(dashboardID).send(`Discord Bot <@${member.id}> has been added to the server. There are now ${numMembers} server members.`)
	else
		client.guilds.cache.get(chromozoneID).channels.cache.get(dashboardID).send(`Member <@${member.id}> has joined the server. There are now ${numMembers} server members.`)

	client.guilds.cache.get(chromozoneID).channels.cache.get(memberCountChannelID).setName(`Members: ${numMembers}`);
});

// ===========================================================
// CLIENT ON: MEMBER LEAVES THE SERVER
// ===========================================================

client.on("guildMemberRemove", function(member){
	var chromozoneID = "404413479915880448";
	if (client.guild.id != chromozoneID)
		return;
	
	var dashboardID = "759971676418605066";
	var memberCountChannelID = "759968169015902249";
	
	var numMembers = client.guilds.cache.get(chromozoneID).memberCount;
	if (member.user.bot)
		client.guilds.cache.get(chromozoneID).channels.cache.get(dashboardID).send(`Discord Bot **@${member.user.tag.substring(0, member.user.tag.length - 5)}** has been removed from the server. There are now ${numMembers} members remaining.`)
	else
		client.guilds.cache.get(chromozoneID).channels.cache.get(dashboardID).send(`The member **@${member.user.tag.substring(0, member.user.tag.length - 5)}** has left or been removed from the server. There are now ${numMembers} members remaining.`)

	client.guilds.cache.get(chromozoneID).channels.cache.get(memberCountChannelID).setName(`Members: ${numMembers}`);
});


// ===========================================================
// CLIENT ON: MESSAGE GETS SENT
// ===========================================================

client.on('message', async message => {
	// client.guilds.cache.get("404413479915880448").members.cache.get("403355889253220352").send(`test`);
	// console.log(message.member.voice);
	passive.assertActivity(client);
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
		passive.containsLmao(message, msgSplit);
		if (passive.filterSayCommand(message, msgSplit) ) return;
		if (passive.onewordChecks(message, msgSplit) ) return;

		else if (msgSplit[0][0] == '!'){
			// console.log(msgSplit.length);
			//console.log(message);
			if (msgSplit[0].length == 1){
				errFile.nocmd(message, Discord);
			}
			else{
				const fs = require("fs"); // filesystem
				//var numPhotos = 0; // scope number of photos for each person
				// var chosenPhotoNumber = 0; // number of the selected photo
				switch(String(msgSplit[0].substring(1, msgSplit[0].length))){

					case "help":
						errFile.help(message, Discord, message.guild.id);
						break;

					// ==================================== //
					// ==================================== //
					case "amongus":
						amongusCmd.amongusSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "avatar":
						avatarCmd.avatarSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "ban":
						moderationCmds.banSwitch(message, Discord, fs, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "clip":
						clipCmd.clipSwitch(message, Discord, fs, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "coinflip":
						coinflipCmd.coinflipSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "dayssince":
						dayssinceCmd.dayssinceSwitch(message, fs, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "depression":
						depressionCmd.depressionSwitch(message, client, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "earrape":
						earrapeCmd.earrapeSwitch(message, Discord, fs, msgSplit, errFile);
					break

					// ==================================== //
					// ==================================== //
					case "feedback":
						feedbackCmd.feedbackSwitch(message, Discord, fs, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "gay":
						gayCmd.gaySwitch(message, msgSplit, errFile, Discord);
					break;
					
					// ==================================== //
					// ==================================== //
					case "google":
						googleCmd.googleSwitch(message, Discord, msgSplitUpper, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "guild":
						guildCmd.guildSwitch(message, Discord, fs, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "invite":
						inviteCmd.inviteSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "isolate":
						isolateCmd.isolateSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "kick":
						moderationCmds.kickSwitch(message, Discord, fs, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "math":
						mathCmd.mathSwitch(message, Discord, msgSplit, errFile, math);
					break;

					// ==================================== //
					// ==================================== //
					case "pic":
						picCmd.picSwitch(message, Discord, fs, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "ping":
						pingCmd.pingSwitch(message, Discord);
					break;

					// ==================================== //
					// ==================================== //
					case "play":
						playCmd.playSwitch(message, Discord, youtube, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "poll":
						pollCmd.pollSwitch(message, msgSplit, Discord, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "restart":
						errFile.depreciated(message, Discord);
						return;
						restartCmd.restartSwitch(message, Discord, login, client);
					break;

					// ==================================== //
					// ==================================== //
					case "rps":
						rpsCmd.rpsSwitch(message, Discord, msgSplit, errFile);
					break;
					
					// ==================================== //
					// ==================================== //
					case "role":
						roleCmd.roleSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "say":
						sayCmd.saySwitch(message, msgSplitUpper);
					break;

					// ==================================== //
					// ==================================== //
					case "shutdown":
						shutdownCmd.shutdownSwitch(message, Discord, errFile, client);
					break;

					// ==================================== //
					// ==================================== //
					case "silence":
						silenceCmd.silenceSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "stop":
						Discord.StreamDispatcher.destroy();
					break;

					// ==================================== //
					// ==================================== //
					case "summon":
						summonCmd.summonSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "unban":
						moderationCmds.unbanSwitch(message, Discord, msgSplit, errFile);
					break;


					case "focs":
						errFile.depreciated(message);
						return;

						var highestAvg = 0;
						for (var i = 0; i < 10000; i++){
							if (10000 % i == 0){
								var avg = (0.5 * (i + 1) ) + (0.5 * 1);
								if (avg > highestAvg)
									highestAvg = avg;
								const focsEmbed = new Discord.MessageEmbed()
									.setColor('8140FF')
									.setTitle('Positive Test')
									.setDescription(`Avg Tests: ${avg}
									Batch Size: ${i}
									Group Count: ${10000 / i}
									Batch Size - Test Avg: ${i - avg}`)
								message.channel.send(focsEmbed);
							}
						}
						message.channel.send(`Testing Complete: Largest Average is ${highestAvg}`);
					break;

					


				} // switch end


			} // end else statement determining that !bitch is followed with command
			//client.channels.cache.get(channelID).send("Pong");

		}
})


// ===========================================================
// BEGIN HELPER FUNCTIONS FOR ABOVE MAIN
// ===========================================================



client.login(login);
