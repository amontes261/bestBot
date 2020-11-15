
function picSwitch(message, Discord, fs, msgSplit, errFile){
    if (msgSplit.length == 1){
        errFile.pic(message, Discord);
    }
    else if (msgSplit.length == 2){ // send pic
        if (msgSplit[1].length == 'help')
            errFile.pic(message, Discord);
        else if (msgSplit[1].length == 22)
            showRandPic(msgSplit[1].substring(3, msgSplit[1].length - 1), fs, message);
        else
            errFile.tagSecondArg(message);
    }
    else if (msgSplit.length == 3){ // upload
        uploadPic(msgSplit[1].substring(3, msgSplit[1].length - 1), fs, message);
    }
    else{
        message.channel.send("You have entered too many arguments. Please try again.");
    }
}

function showRandPic(name, fs, msg){
	try{
		var userExists = false;
		const allFiles = fs.readdirSync("./Pics");
		if (allFiles.includes(name) )
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
		errFile.unexpectedErr(message, msgSplit);
	}
}

function uploadPic(name, fs, msg){
	errFile.missingNewFeature(msg);
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { picSwitch };