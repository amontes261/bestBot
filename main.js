// ============= //
// INITIAL SETUP //
// ============= //
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require("fs"); // filesystem
let login = JSON.parse(fs.readFileSync('Data_Management/loginToken.json')).token;
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
const authCmd = require('./Commands/auth.js');
const repoCmd = require('./Commands/repo.js');
const cheggCmd = require('./Commands/chegg.js');
const restoreCmd = require('./Commands/restore.js');

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

	client.user.setActivity('over 25 cmds: use !help');

	// ======================== //
	// STREAM LAUNCH TO CONSOLE //
	// ======================== //\
	console.log("\n==============================");
	console.log("bestBot is now online.\n")

	let numServers = client.guilds.cache.size;
	if (numServers == 1)
		console.log(`Running on ${numServers} server:`);
	else
		console.log(`Running on ${numServers} servers:`);

	client.guilds.cache.forEach((guild) => {
		console.log(' •' + guild.name);
	})
	console.log("==============================");
})

// ===========================================================
// CLIENT ON: MEMBER JOINS THE SERVER
// ===========================================================

client.on("guildMemberAdd", function(member){
	var chromozoneID = "404413479915880448";
	if (member.guild.id != chromozoneID)
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
	if (member.guild.id != chromozoneID)
		return;
	
	var dashboardID = "759971676418605066";
	var memberCountChannelID = "759968169015902249";
	
	var numMembers = client.guilds.cache.get(chromozoneID).memberCount;
	if (member.user.bot)
		client.guilds.cache.get(chromozoneID).channels.cache.get(dashboardID).send(`Discord Bot **@${member.user.tag.substring(0, member.user.tag.length - 5)}** has been removed from the server. There are now ${numMembers} members remaining.`)
	else
		client.guilds.cache.get(chromozoneID).channels.cache.get(dashboardID).send(`Member **@${member.user.tag.substring(0, member.user.tag.length - 5)}** has left or been removed from the server. There are now ${numMembers} members remaining.`)

	client.guilds.cache.get(chromozoneID).channels.cache.get(memberCountChannelID).setName(`Members: ${numMembers}`);
});


// ===========================================================
// CLIENT ON: MESSAGE GETS SENT
// ===========================================================

client.on('message', async message => {
	// client.guilds.cache.get("404413479915880448").members.cache.get("403355889253220352").send(`test`);
	
	// SPLIT UP MESSAGE INTO ARRAY //
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

	// PASSIVE CHECKS (Also checks bot messages) //
	passive.assertActivity(client);
	if (passive.deleteVincentBruh(message, msgSplit, Discord) ) return;

	if (message.author.bot) return;
		// PASSIVE CHECKS (DOES NOT check bot messages) //
		passive.containsGay(message, msgSplit);
		passive.containsLmao(message, msgSplit);
		passive.ensureCorrectMemberCount(message);
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

					default:
						errFile.invalidCmd(message, Discord, msgSplit[0].substring(1, msgSplit[0].length) );
					break;

					// ==================================== //
					// ==================================== //
					case "amongus":
						amongusCmd.amongusSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "auth":
						authCmd.authSwitch(message, Discord, fs, msgSplit, errFile, client);
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
					case "chegg":
						cheggCmd.cheggSwitch(message, Discord, msgSplitUpper, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "clip":
						clipCmd.clipSwitch(message, Discord, fs, msgSplit, errFile, client);
					break;

					// ==================================== //
					// ==================================== //
					case "coinflip":
						coinflipCmd.coinflipSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "dayssince":
						dayssinceCmd.dayssinceSwitch(message, Discord, fs, msgSplit, errFile, client);
					break;

					// ==================================== //
					// ==================================== //
					case "depression":
						depressionCmd.depressionSwitch(message, Discord, msgSplit, errFile, client);
					break;

					// ==================================== //
					// ==================================== //
					case "earrape":
						earrapeCmd.earrapeSwitch(message, Discord, fs, msgSplit, errFile, client);
					break

					// ==================================== //
					// ==================================== //
					case "feedback":
						feedbackCmd.feedbackSwitch(message, Discord, fs, msgSplit, errFile, client);
					break;

					case "focs":
						var output = 0;
						for (var i = 1; i <= 20000000; i++){
							output += (1/i);
						}
						message.channel.send(output);
					break;

					// ==================================== //
					// ==================================== //
					case "gay":
						gayCmd.gaySwitch(message, Discord, msgSplit, errFile, client);
					break;
					
					// ==================================== //
					// ==================================== //
					case "google":
						googleCmd.googleSwitch(message, Discord, msgSplitUpper, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "help":
						errFile.help(message, Discord, fs);
					break;

					// ==================================== //
					// ==================================== //
					case "invite":
						inviteCmd.inviteSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "isolate":
						isolateCmd.isolateSwitch(message, Discord, fs, msgSplit, errFile, client);
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
						picCmd.picSwitch(message, Discord, fs, msgSplit, errFile, client);
					break;

					// ==================================== //
					// ==================================== //
					case "ping":
						pingCmd.pingSwitch(message, Discord, msgSplit);
					break;

					// ==================================== //
					// ==================================== //
					case "play":
						playCmd.playSwitch(message, Discord, msgSplit, errFile, client, youtube);
					break;

					// ==================================== //
					// ==================================== //
					case "poll":
						pollCmd.pollSwitch(message, msgSplit, Discord, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "repo":
						repoCmd.repoSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "restart":
						restartCmd.restartSwitch(message, Discord, errFile, login, client);
					break;

					// ==================================== //
					// ==================================== //
					case "restore":
						restoreCmd.restoreSwitch(message, Discord, fs, msgSplit, errFile, client);
					break;
					
					// ==================================== //
					// ==================================== //
					case "role":
						roleCmd.roleSwitch(message, Discord, fs, msgSplit, errFile, client);
					break;

					// ==================================== //
					// ==================================== //
					case "rps":
						rpsCmd.rpsSwitch(message, Discord, fs, msgSplit, errFile, client);
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
						silenceCmd.silenceSwitch(message, Discord, fs, msgSplit, errFile, client);
					break;

					// ==================================== //
					// ==================================== //
					case "stop":
						errFile.missingNewFeature(message, Discord);
						return;
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
						moderationCmds.unbanSwitch(message, Discord, fs, msgSplit, errFile, client);
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
