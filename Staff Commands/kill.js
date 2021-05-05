
//////////////////////////////////////////
//// kill.js – JavaScript x DiscordJS ////
//// Alex Montes  –  @a.montes28#4501 ////
//////////////////////////////////////////

async function killSwitch(message, Discord, fs, msgSplit, errFile, client){
    
    /* - Asynchronous function shutdownSwitch() was designed to ONLY be called from file main.js
    
        - Meant to be able to remotely shut the bot down
    
        - Was designed to be triggered via command: !shutdown
    
        - Only Master Users can use this command */
    
        var data;
        try{ // Attempt to read "database" JSON file //
            data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
        }
        catch (e){
            errFile.unexpectedErr(message, Discord, msgSplit, "kill", client);
            return;
        }
    
        var isMaster = data["Master"].hasOwnProperty(message.author.id);
    
        if (!isMaster){ // Ensure user has proper permission to use this command //
            errFile.permissionDenied(message, Discord, "kill");
            return;
        }
        else{
            const killMsg = new Discord.MessageEmbed()
                .setColor('00C500') //green 
                .setTitle('Bot Shutdown')
                .setTimestamp()
                .setFooter(`Runtime killed by ${message.guild.members.cache.get(message.author.id).displayName}`);

            await message.channel.send(killMsg);
            await message.delete();

            var chromozone = client.guilds.cache.get("404413479915880448");
            if (chromozone != undefined && chromozone != null){
                
                var clientLogChannel = chromozone.channels.cache.get("772647489798537236");
                const logShutdownMsg = new Discord.MessageEmbed()
                    .setColor('C80000') // red 
                    .setTitle('Bot Shutdown via Kill command')
                    .setTimestamp()
                    
                await clientLogChannel.send(logShutdownMsg);
            }
            client.destroy();
        }
    }
    
    
    // ============= //
    // MODULE EXPORT //
    // ============= //
    
    module.exports = { killSwitch };