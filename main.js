// ============= //
// INITIAL SETUP //
// ============= //
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require("fs"); // filesystem
let login = JSON.parse(fs.readFileSync('auth.json')).token;
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
const stopCmd = require('./Commands/stop.js');
const amongusCmd = require('./Commands/amongus.js');
const sayCmd = require('./Commands/say.js');
const silenceCmd = require('./Commands/silence.js');
const isolateCmd = require('./Commands/isolate.js');
const avatarCmd = require('./Commands/avatar.js');
const pingCmd = require('./Commands/ping.js');
const roleCmd = require('./Commands/role.js');
const inviteCmd = require('./Commands/invite.js');
const invite = require('./Commands/invite.js');


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
		passive.containsLmao(message, msgSplit);
		if (passive.onewordChecks(message, msgSplit) )
			return;

		else if (msgSplit[0][0] == '!'){
			// console.log(msgSplit.length);
			//console.log(message);
			if (msgSplit[0].length == 1){
				errFile.nocmd(message, Discord);
			}
			else{
				const fs = require("fs"); // filesystem
				//var numPhotos = 0; // scope number of photos for each person
				var chosenPhotoNumber = 0; // number of the selected photo
				switch(String(msgSplit[0].substring(1, msgSplit[0].length))){

					case "help":
						errFile.help(message, Discord, message.guild.id);
						break;

					// ==================================== //
					// ==================================== //
					case "ping":
						pingCmd.pingSwitch(message, Discord);
					break;
					
					// ==================================== //
					// ==================================== //
					case "gay":
						gayCmd.gaySwitch(message, msgSplit, errFile, Discord);
					break;
					
					// ==================================== //
					// ==================================== //
					case "depression":
						depressionCmd.depressionSwitch(message, client, msgSplit, errFile);
						break;

					// ==================================== //
					// ==================================== //
					case "pic":
						picCmd.picSwitch(message, Discord, fs, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "dayssince":
						dayssinceCmd.dayssinceSwitch(message, fs, msgSplit, errFile);
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
					case "google":
						googleCmd.googleSwitch(msgSplitUpper, errFile, message);
					break;

					// ==================================== //
					// ==================================== //
					case "summon":
						summonCmd.summonSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "avatar":
						avatarCmd.avatarSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "poll":
						pollCmd.pollSwitch(message, msgSplit, Discord, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "stop":
						stopCmd.stopSwitch(message, Discord, errFile, client);
					break;

					// ==================================== //
					// ==================================== //
					case "amongus":
						amongusCmd.amongusSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "say":
						sayCmd.saySwitch(message, msgSplitUpper);
					break;

					// ==================================== //
					// ==================================== //
					case "silence":
						silenceCmd.silenceSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "isolate":
						isolateCmd.isolateSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "role":
						roleCmd.roleSwitch(message, Discord, msgSplit, errFile);
					break;

					// ==================================== //
					// ==================================== //
					case "invite":
						inviteCmd.inviteSwitch(message, Discord, msgSplit, errFile);
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
