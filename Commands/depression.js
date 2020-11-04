
async function depressionSwitch(message, client, msgSplit, errFile){
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
                    message.member.voice.channel.leave();
                });

                dispatcher.on('error', () => {
                    errFile.unexpectedErr(message, msgSplit)
                });
            }
        }
        else
            errFile.permissionDenied(message, 'quad');
    }
}

// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { depressionSwitch };