
async function clipSwitch(message, Discord, fs, msgSplit, errFile){
    if (msgSplit.length == 1)
        errFile.clip(message, Discord);
    else if (msgSplit.length >= 2){
        if (msgSplit.length == 2 && msgSplit[1] == "list"){
            message.channel.send("Here's a list of the available clips:");

            fs.readdir(`Clips/`, (err, files) => {
                if (err)
                    errFile.unexpectedErr(message, msgSplit);
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
            errFile.missingNewFeature(message);
        }
        else if (msgSplit.length == 2){
            fs.readdir(`Clips/`, (err, files) => {
                if (err)
                    errFile.unexpectedErr(message, msgSplit);
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
            errFile.thirdArgProblem(message);
        }
    }
    else{
        errFile.generalArgProblem(message);
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
            msg.reactions.removeAll();
            msg.react("✅");
            msg.member.voice.channel.leave();
        });
        
		dispatcher.on('error', console.error);
	}
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { clipSwitch };