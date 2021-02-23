
///////////////////////////////////////////
//// pic.js – JavaScript x DiscordJS //////
//// Alex Montes –– @a.montes28#4501 //////
///////////////////////////////////////////

function picSwitch(message, Discord, fs, msgSplit, errFile, client){

 /* - Function picSwitch() was designed to ONLY be called from file main.js

	=== THIS IS A SPECIAL COMMAND– it will only work on authorized servers. Need to use !auth command to authorize ===

	- Was designed to be triggered via command: !pic

	- Try !pic help to have the bot to provide a usage message */
   
    var data;
    try{ // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
    }
    catch (e){
        errFile.unexpectedErr(message, Discord, msgSplit, "clip", client);
        return;
    }
    var allCommandsUnlocked = false;
    if (data["Guilds"].hasOwnProperty(message.guild.id) )
		allCommandsUnlocked = data["Guilds"][message.guild.id]["All Command Access"]["Activated"];
	
	if (!allCommandsUnlocked) // Ignore command entirely if server is not authorized to use it //
        return;
        
    if (msgSplit.length == 2){
		if (msgSplit[1] == 'random')
			errFile.missingNewFeature(message, Discord, "pic random");
        else if (msgSplit[1].length == 22 && message.mentions.members.size != 0) // Execute send photo commandd //
            showRandUserPic(message, Discord, fs, msgSplit, errFile, client, message.mentions.members.first().user.id);
        else // Command usage message requested OR Incorrect command usage message //
			errFile.pic(message, Discord);
    }
    else if (msgSplit.length == 3 && message.mentions.members.size != 0 && msgSplit[2] == 'upload'){ // Execute upload photo command //
        uploadPic(message, Discord, fs, msgSplit, errFile, client, message.mentions.members.first().user.id);
    }
    else // Incorrect command usage message //
		errFile.pic(message, Discord);
}

function showRandUserPic(message, Discord, fs, msgSplit, errFile, client, id){
	try{
		var userExists = false;
		const allFiles = fs.readdirSync("./Pics");
		if (allFiles.includes(id) ) // Verify user ID folder exists //
            userExists = true;
            
		if (userExists){
			const everything = fs.readdirSync(`./Pics/${id}`); // Read pictures of specified user //
			var allPics = everything.filter(file => file[0] != ".");

			if (allPics.length != 0){ // Photos exist for user: Select one to send //
				chosenPhotoNumber = parseInt( ((Math.random() * allPics.length)) + 1 , 10); //Choose a number between 1 and numPhotos
				message.channel.send({files: [`Pics/${id}/${chosenPhotoNumber}.jpeg`]});
			}
			else{ // Case: No photos exist for specified user //
				const embeddedMsg = new Discord.MessageEmbed()
					.setColor('C80000') // red
					.setTitle(`Pic Fetch Failed`)
					.setDescription(`There don't seem to be any pictures stored for ${message.guild.members.cache.get(id).displayName}.`)
					.setTimestamp()
					.setFooter(`Random picture requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
				message.channel.send(embeddedMsg);
				return;
			}
		}
		else{ // Case: User folder does not exist //
			const embeddedMsg = new Discord.MessageEmbed()
				.setColor('C80000') // red
				.setTitle(`Pic Fetch Failed`)
				.setDescription(`There don't seem to be any pictures stored for ${message.guild.members.cache.get(id).displayName}.`)
				.setTimestamp()
				.setFooter(`Random picture of ${message.guild.members.cache.get(id).displayName} requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
			message.channel.send(embeddedMsg);
			return;
		}
	}
	catch (e){
		errFile.unexpectedErr(message, Discord, msgSplit, "pic", client);
	}
}

function uploadPic(message, Discord, fs, msgSplit, errFile, client, id){
	errFile.missingNewFeature(message, Discord, "pic");
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { picSwitch };