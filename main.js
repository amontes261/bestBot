// ============= //
// INITIAL SETUP //
// ============= //
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require("fs"); // filesystem
let login = JSON.parse(fs.readFileSync('Data_Management/loginToken.json')).token;
const youtubeDL = require('ytdl-core');
const youtubeScraper = require("scrape-yt");
const math = require('mathjs');
const tts = require('google-tts-api');

const mediaData = new Map();
const ttsData = new Map();

// ============= //
// FILE READ-INS //
// ============= //
const errFile = require('./JS\ Helpers/errMessages.js');
const passive = require('./JS\ Helpers/passiveMonitors.js');

const amongusCmd = require('./Commands/amongus.js');
const authCmd = require('./Commands/auth.js');
const avatarCmd = require('./Commands/avatar.js');
const cheggCmd = require('./Commands/chegg.js');
const clipCmd = require('./Commands/clip.js');
const coinflipCmd = require('./Commands/coinflip.js');
const dayssinceCmd = require('./Commands/dayssince.js');
const deafCmd = require('./Commands/deaf.js');
const depressionCmd = require('./Commands/depression.js');
const earrapeCmd = require('./Commands/earrape.js');
const feedbackCmd = require('./Commands/feedback.js');
const gayCmd = require('./Commands/gay.js');
const googleCmd = require('./Commands/google.js');
const idCmd = require('./Commands/id.js');
const inviteCmd = require('./Commands/invite.js');
const isolateCmd = require('./Commands/isolate.js');
const leaveCmd = require('./Commands/leave.js')
const mathCmd = require('./Commands/math.js');
const mediaControlCmds = require('./Commands/mediaControl.js');
const moderationCmds = require('./Commands/moderation.js');
const nickCmd = require('./Commands/nick.js');
const picCmd = require('./Commands/pic.js');
const pingCmd = require('./Commands/ping.js');
const pollCmd = require('./Commands/poll.js');
const repoCmd = require('./Commands/repo.js');
const restartCmd = require('./Commands/restart.js');
const restoreCmd = require('./Commands/restore.js');
const roleCmd = require('./Commands/role.js');
const rpsCmd = require('./Commands/rockpaperscissors.js');
const sayCmd = require('./Commands/say.js');
const shutdownCmd = require('./Commands/shutdown.js');
const silenceCmd = require('./Commands/silence.js');
const summonCmd = require('./Commands/summon.js');
const ttsCmd = require('./Commands/tts.js');

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

	client.user.setActivity('so many cmds || !help');

	// ======================== //
	// STREAM LAUNCH TO CONSOLE //
	// ======================== //
	console.log("\n==============================");
	console.log("bestBot is now online.\n")

	let numServers = client.guilds.cache.size;
	if (numServers == 1)
		console.log(`Deployed on ${numServers} server:`);
	else
		console.log(`Deployed on ${numServers} servers:`);

	client.guilds.cache.forEach((guild) => {
		console.log(' • ' + guild.name);
	})
	console.log("==============================");

	// ========================= //
	// PREPARE MEDIA FEATURE MAP //
	// ========================= //

	client.guilds.cache.forEach((guild) => {
		const mediaDataEntry = {
			mostRecentTextChannel: null,
			activeVoiceChannel: null,
			activeConnection: null,
			activeDispatcher: null,
			songQueue: [],
			clipQueue: [],
			volume: 100,
			nowPlayingMessageID: null,
			playingMusic: false,
			playingClip: false,
			mediaPlaybackType: null
		};
		
		const ttsDataEntry = {
			enabled: false,
			groupTTS: false,
			targetTTSChannel: null,
			sentenceQueue: [],
			targetUser: null,
		};

		mediaData.set(guild.id, mediaDataEntry);
		ttsData.set(guild.id, ttsDataEntry);
	})
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

client.on("messageUpdate", function(oldMsg, newMsg){
	if (newMsg.content.split(' ').length != 0){
		var msgSplitUndefined = newMsg.content.split(' ');
		var msgSplitUpper = msgSplitUndefined.filter(word => word != undefined);
		var msgSplit = [];
		msgSplitUpper.forEach((word) => {
			msgSplit.push(word.toLowerCase() );
		})
		passive.containsGay(newMsg, msgSplit);
		passive.filterSayCommand(newMsg, msgSplit);
	}
	else
		return;
});

client.on("voiceStateUpdate", function(oldState, newState){
	if (newState.id == "502354442054664192"){ // client either joined or disconnected //
		if(newState.channelID == null){ // client disconnected //
			if (mediaData.get(newState.guild.id)['activeDispatcher'] != null)
				mediaData.get(newState.guild.id)['activeDispatcher'].destroy();
			
			// Clear playback media data //
			mediaData.get(newState.guild.id)['activeConnection'] = null;
			mediaData.get(newState.guild.id)['activeVoiceChannel'] = null;
			mediaData.get(newState.guild.id)['activeDispatcher'] = null;
			mediaData.get(newState.guild.id)['songQueue'] = [];
			mediaData.get(newState.guild.id)['clipQueue'] = [];
			mediaData.get(newState.guild.id)['nowPlayingMessageID'] = null;
			mediaData.get(newState.guild.id)["playingMusic"] = false;
			mediaData.get(newState.guild.id)["playingClip"] = false;
			mediaData.get(newState.guild.id)["mediaPlaybackType"] = null;

			// Clear stored TTS data //
			ttsData.get(newState.guild.id)['enabled'] = false;
			ttsData.get(newState.guild.id)['groupTTS'] = false;
			ttsData.get(newState.guild.id)['targetTTSChannel'] = null;
			ttsData.get(newState.guild.id)['sentenceQueue'] = [];
			ttsData.get(newState.guild.id)['targetUser'] = null;
		}
	}

	if (ttsData.get(newState.guild.id)['enabled']){
		if (ttsData.get(newState.guild.id)["targetUser"] == newState.id){
			if(newState.channelID == null){ // TTS User Disconnected //
				const embeddedMsg = new Discord.MessageEmbed().setTimestamp()
				embeddedMsg.setColor('A724A8'); // dark purple
				embeddedMsg.setTitle(`Disconnecting TTS Session`);
				embeddedMsg.setDescription(`The target TTS user has disconnected from the voice channel.`);
				embeddedMsg.setFooter(`Automatically disconnected`);
			
				newState.guild.channels.cache.get(ttsData.get(newState.guild.id)['targetTTSChannel']).send(embeddedMsg);

				// Clear playback media data //
				if (mediaData.get(newState.guild.id)['activeDispatcher'] != null)
					mediaData.get(newState.guild.id)['activeDispatcher'].destroy();

				if (mediaData.get(newState.guild.id)['activeConnection'] != null)
					mediaData.get(newState.guild.id)['activeConnection'].disconnect();

				// Clear stored TTS data //
				ttsData.get(newState.guild.id)['enabled'] = false;
				ttsData.get(newState.guild.id)['groupTTS'] = false;
				ttsData.get(newState.guild.id)['targetTTSChannel'] = null;
				ttsData.get(newState.guild.id)['sentenceQueue'] = [];
				ttsData.get(newState.guild.id)['targetUser'] = null;
			}
		}
	}
});


// ===========================================================
// CLIENT ON: MESSAGE GETS SENT
// ===========================================================

client.on('message', async message => {
	//console.log(mediaData.get(message.guild.id)['activeDispatcher']);
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
		passive.blockKenbotClip(message, Discord, msgSplit);
		passive.codeMessage(message, msgSplit);
		passive.containsGay(message, msgSplit);
		passive.containsLmao(message, msgSplit);
		passive.ensureCorrectMemberCount(message);
		if (passive.filterSayCommand(message, msgSplit) ) return;
		if (passive.onewordChecks(message, msgSplit) ) return;
		passive.ttsMonitor(message, msgSplit, mediaData, ttsData, tts);
		

		if (msgSplit[0][0] == '!'){
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
						clipCmd.clipSwitch(message, Discord, fs, msgSplit, errFile, mediaData, client);
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
					case "deaf":
						deafCmd.deafSwitch(message, Discord, fs, msgSplit, errFile, client);
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
						runFocsCmd(message);
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
					case "id":
						idCmd.idSwitch(message, Discord, fs, msgSplit, errFile);
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
					case "leave":
						leaveCmd.leaveSwitch(message, Discord, fs, msgSplit, errFile, client);
					break;

					// ==================================== //
					// ==================================== //
					case "math":
						mathCmd.mathSwitch(message, Discord, msgSplit, errFile, math);
					break;

					// ==================================== //
					// ==================================== //
					case "nick":
						nickCmd.nickSwitch(message, Discord, fs, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "nowplaying":
						mediaControlCmds.nowPlayingSwitch(message, Discord, msgSplit, errFile, mediaData, client);
					break;

					// ==================================== //
					// ==================================== //
					case "pause":
						mediaControlCmds.pauseSwitch(message, Discord, msgSplit, errFile, mediaData, client);
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
						mediaControlCmds.playSwitch(message, Discord, fs, msgSplit, msgSplitUpper, errFile, client, youtubeDL, youtubeScraper, mediaData);
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
					case "skip":
						mediaControlCmds.skipSwitch(message, Discord, msgSplit, errFile, youtubeDL, mediaData, client);
					break;

					// ==================================== //
					// ==================================== //
					case "stop":
						mediaControlCmds.stopSwitch(message, Discord, msgSplit, errFile, mediaData, ttsData, client);
					break;

					// ==================================== //
					// ==================================== //
					case "summon":
						summonCmd.summonSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "tts":
						ttsCmd.ttsSwitch(message, Discord, msgSplit, errFile, tts, mediaData, ttsData);
					break;

					// ==================================== //
					// ==================================== //
					case "unban":
						moderationCmds.unbanSwitch(message, Discord, fs, msgSplit, errFile, client);
					break;

					// ==================================== //
					// ==================================== //
					case "volume":
						mediaControlCmds.volumeSwitch(message, Discord, msgSplit, errFile, mediaData, client);
					break;

					


				} // switch end


			} // end else statement determining that !bitch is followed with command
			//client.channels.cache.get(channelID).send("Pong");
			
		}
		
})


// ===========================================================
// BEGIN HELPER FUNCTIONS FOR ABOVE MAIN
// ===========================================================

function runFocsCmd(message){
	if (message.author.id != "403355889253220352")
		return;
	
	var CSVreturn = ""
	for (var n = 2; n < 25; n++){
		var ans = 0;
		for (var i = 0; i <= n; i++){
			for (var j = 0; j <= i; j++){
				ans += (i * Math.pow(2, j) );
			}
		}
		CSVreturn += `${ans},`
	}
	message.channel.send(CSVreturn);
}


client.login(login);
