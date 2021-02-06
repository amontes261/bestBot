
//////////////////////////////////////////////////
//// depression.js – JavaScript x DiscordJS //////
//// Alex Montes  ––––––  @a.montes28#4501 ///////
//////////////////////////////////////////////////

async function depressionSwitch(message, Discord, msgSplit, errFile, client){
    
 /* - Function depressionSwitch() was designed to ONLY be called from file main.js

    === THIS FUNCTION WAS NOT DESIGNED TO WORK ON 3RD PARTY DISCORD SERVERS ===

    - Was designed to be triggered via command: !amongus

    - Try !amongus help to have the bot to provide a usage message */

    if (message.guild.id != '404413479915880448'){ // Ensure not running on a 3rd party server //
        errFile.onlyOnChromozone(message, Discord, "depression");
        return;
    }
    else if( !message.guild.members.cache.get(message.author.id).roles.member._roles.includes('758827953781080125') ){ // Case: User does not have the 'quad' role //
        errFile.permissionDeniedRole(message, Discord, 'depression', 'quad');
        return;
    }
    else if (message.member.voice.channelID == null) { // Case: User not in voice channel //
        const embeddedMsg = new Discord.MessageEmbed();
            embeddedMsg.setColor('C80000'); // red
            embeddedMsg.setTitle(`Depresso Command Failed`);
            embeddedMsg.setDescription(`You must be in a voice channel in order for the command to execute.`);
            embeddedMsg.setTimestamp();
            embeddedMsg.setFooter(`${message.guild.members.cache.get(message.author.id).displayName} failed to be depressed`);
            message.channel.send(embeddedMsg); // Send final output message //
    }
    else{ // Execute move and play command //
        message.guild.member(message.author.id).voice.setChannel("769972737099169792"); // Move user to the Special Channel

        const embeddedMsg = new Discord.MessageEmbed();
        embeddedMsg.setTitle(`Depresso Time`)
            .setColor('00C500') // green
            .setTimestamp()
            .setFooter(`${message.guild.members.cache.get(message.author.id).displayName} is depressed...`);

        const connection = await client.channels.cache.get("769972737099169792").join();

        var dispatcher;
        if (message.author.id == "114081086065213443"){ // If the user's Nishant (friend) //
            embeddedMsg.setDescription(`Welcome to the Depression Corner, ${message.guild.members.cache.get(message.author.id).displayName}.\nPlaying your favorite sad song.`);
            dispatcher = connection.play('Depresso/cant_help_20M.mp3');
        }
        else{
            embeddedMsg.setDescription(`Welcome to the Depression Corner, ${message.guild.members.cache.get(message.author.id).displayName}.`);
            dispatcher = connection.play('Depresso/robbery.mp3');
        }

        message.channel.send(embeddedMsg); // Send final output message //

        dispatcher.on('finish', () => {
            message.member.voice.channel.leave();
        });

        dispatcher.on('error', () => {
            errFile.unexpectedErr(message, Discord, msgSplit, "depression", client);
        });
    }
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { depressionSwitch };