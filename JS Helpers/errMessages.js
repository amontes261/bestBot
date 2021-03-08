
// ================== //
// ALL USAGE MESSAGES //
// ================== //

function help(message, Discord, fs){
    let data = JSON.parse(fs.readFileSync("Data_Management/authorization.json"));
    var allCommandsUnlocked = false;
    if (data["Guilds"].hasOwnProperty(message.guild.id) )
        allCommandsUnlocked = data["Guilds"][message.guild.id]["All Command Access"]["Activated"];

    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('EFEF00') // yellow
    embeddedMsg.setURL('https://amontes261.github.io/projects/bestBot.html')
    embeddedMsg.setTitle('bestBot Command List:')
    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Help menu requested by ${message.guild.members.cache.get(message.author.id).displayName}`);
    
    var description = "__General Comands__\n" +
                      "**!auth** - Authorize or De-Authorize a user or server for elevated command priveleges\n" +
                      "**!avatar** - Get a picture of a user's avatar\n" +
                      "**!ban** - Ban a user\n" +
                      "**!chegg** - Provide a search query and get a link that'll search the query on Chegg\n" +
                      "**!clip** - Play an audio clip\n" +
                      "**!coinflip** - Flip a coin\n" +
                      "**!deaf** - Toggle server deafen on a user\n" +
                      "**!feedback** - Provide feedback regarding bestBot\n" +
                      "**!google** - Provide a search query and get a link that'll search the query on Google\n" +
                      "**!id** - Get the ID of a User, a Channel or a Server \n" +
                      "**!invite** - Get a link to invite this bot to a server or links to different types of server-based invites \n" +
                      "**!isolate** - Toggle server deafen and server mute on a user\n" +
                      "**!kick** - Kick a user\n" +
                      "**!math** - Enter a math problem for the bot to solve\n" +
                      "**!nick** - Change the nickname of you or another user \n" +
                      "**!pause** - Pause any audio that bestBot is playing\n" +
                      "**!ping** - Check if the bot's online/check this server's response time\n" +
                      "**!play** - Play any audio from YouTube\n" +
                      "**!poll** - Construct and issue a poll in a text channel\n" +
                      "**!repo** - Get a link to the GitHub repository housing *most of* the files required by bestBot\n" +
                      "**!rps** - Play a game of rock paper scissors against bestBot\n" +
                      "**!say** - Have bestBot say a provided phrase\n" +
                      "**!shutdown** - Shut down bestBot (Only Authorized Users)\n" +
                      "**!silence** - Toggle server mute on a user\n" +
                      "**!stop** - Stop any audio that bestBot is playing & leave a voice channel\n" +
                      "**!summon** - Summon a user/get a user's attention\n" +
                      "**!unban** - Unban a user\n" +
                      "**!volume** - Play any audio from YouTube\n"

    if (allCommandsUnlocked){
        description += "\n__Special Commands__\n" +
                       "**!dayssince** - List how many days it's been since a user's had sex\n" +        
                       "**!earrape** - Play an extremely loud audio clip\n" +
                       "**!pic** - Send a random (probably funny) photo of a user\n"
    }
    if (message.guild.id == '404413479915880448'){
        description += "\n__Commands Specific to This Server__\n" +
                       "**!amongus** - Commands involving the Among US and Among Us (DEAD) voice channels\n" +
                       "**!depression** - (Only if you have the quad role) Move to the depression corner and play sad music\n" +
                       "**!gay** - Determine whether or not a user is gay\n" +
                       "**!restore** - If registered, you can restore your roles and whatever username you had before getting removed from the server\n" +
                       "**!role** - Provide or revoke a role from a user\n"
    }
    embeddedMsg.setDescription(description);

    message.channel.send(embeddedMsg);
    message.delete();
}

function amongus(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!amongus Command Usage:**');
    embeddedMsg.setDescription('*This command will only work on THIS server. This command is not supported on other servers.*');
    
    embeddedMsg.addFields(
        { name: '**Move everyone in the Among US (DEAD) channel to the Among US (Alive) channel & server-mute them**', value: '!amongus deadmove' },
        { name: '**Server mute anyone dead (Only authorized people can use this)**', value: '!amongus silence <Tagged User 1> <Tagged User 2> <Tagged User 3> ...' },
        { name: '**Move any server-muted user in the Among Us (Alive) channel to the Among Us (DEAD) channel & unmute them**', value: '!amongus deadmeeting' },
        { name: '**Unmute all server-muted members in ether of the Among Us channels**', value: '!amongus unmute' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function auth(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!auth Command Usage:**');
    embeddedMsg.setDescription("**This command only works for authorized users. If you are reading this usage menu, it means you are already authorized.**")
    embeddedMsg.addFields(
        { name: '**Authorize a user to use elevated commands**', value: '!auth grant <Tag a User>' },
        { name: '**Authorize a server to support all available commands**', value: '!auth grant server' },
        { name: '**Deauthorize a user from using elevated commands**', value: '!auth revoke <Tag a User>' },
        { name: '**Deauthorize a server from being able to use all available commands**', value: '!auth revoke server' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function avatar(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!avatar Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Get a picture of your own avatar**', value: '!avatar' },
        { name: '**Get a picture of a user on the server\'s avatar**', value: '!avatar <Tag a User>' }
    )
    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function ban(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!ban Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Ban a user from the server**', value: '!ban <Tag a User>' },
        { name: '**Ban a user from the sevrer and provide a reason**', value: '!ban <Tag a User> <reason>' }
    )
    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function chegg(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!chegg Command Usage:**');

    embeddedMsg.addFields(
        { name: '**__THIS DOES NOT GET ANSWERS TO CHEGG LINKS.__**\n**Get a link to click on that\'ll take you to whatever you wish to search on Chegg.**', value: '!chegg <Search Field>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function clip(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!clip Command Usage:**');

    embeddedMsg.addFields(
        { name: '**List all available clips**', value: '!clip list' },
        { name: '**Play a clip**', value: '!clip <Clip Name>' },
        { name: '**Upload a clip**', value: '!clip upload' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function coinflip(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!coinflip Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Flip a coin**', value: '!coinflip' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function daysSince(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!dayssince Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Determine how many days its been since you\'ve had sex**', value: '!dayssince' },
        { name: '**Reset how many days its been since you\'ve had sex**', value: '!dayssince reset' },
        { name: '**Set how many days its been since you\'ve had sex**', value: '!dayssince <Number of Days>' },
        { name: '**Set the date you\'ve last had sex**', value: '!dayssince <MM/DD/YYYY>' },
        { name: '**Determine how many days its been since a user\'s had sex**', value: '!dayssince <Tag a User>' },
        { name: '**Reset how many days its been since a user\'s had sex**', value: '!dayssince <Tag a User> reset' },
        { name: '**Set how many days its been since a user\'s had sex**', value: '!dayssince <Tag a User> <Number of Days>' },
        { name: '**Set the date a user\'s last had sex**', value: '!dayssince <Tag a User> <MM/DD/YY>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function deaf(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!deaf Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Toggle server deafen for a user**', value: '!deaf <Tag a User>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function earrape(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!earrape Command Usage:**');

    embeddedMsg.addFields(
        { name: '**List all available earrape clips**', value: '!earrape list' },
        { name: '**Play an earrape clip**', value: '!earrape <Clip Name>' },
        { name: '**Upload an earrape clip**', value: '!earrape upload' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function feedback(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!feedback Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Submit a new feature request**', value: '!feedback feature <Feature Description>' },
        { name: '**Submit a bug report**', value: '!feedback bug <Bug Description>' },
        { name: '**Submit a recommendation on something should be changed**', value: '!feedback change <Change Description>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function gay(message, Discord){

    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!gay Command Usage:**');
    embeddedMsg.setDescription('*This command will only work on THIS server. This command is not supported on other servers.*');
    embeddedMsg.addFields(
		{ name: '**Determine if you\'re gay**', value: '!gay' },
        { name: '**Determine if a user is gay**', value: '!gay <Tag a User>' },
        { name: '**Declare another user as gay**', value: '!gay <Tag a User> declare' },
		{ name: '**Declare another user as straight**', value: '!gay <Tag a User> remove' }
	)

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function google(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!google Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Get a link to click on that\'ll take you to whatever you wish to search on Google.**', value: '!google <Search Field>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function id(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!id Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Get your Discord User ID**', value: '!id' },
        { name: "**Get another user's Discord User ID**", value: '!id <Tag a User>' },
        { name: '**Get the Discord ID of a channel**', value: '!id channel' },
        { name: '**Get the Discord ID of a specified channel**', value: '!id channel <Channel Name>' },
        { name: '**Get the Discord ID of this Discord Server**', value: '!id server' },

    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function invite(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!invite Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Get a link to add this bot to another server**', value: '!invite' },
        { name: '**Get an invite link to the a voice channel (If you\'re in one)**', value: '!invite vc' },
        { name: '**Get an invite link to this text channel**', value: '!invite here' },
        { name: '**Get an invite link to this server**', value: '!invite toserver' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function isolate(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!isolate Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Toggle server mute AND server deafen for a user**', value: '!isolate <Tag a User>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function kick(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!kick Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Kick a user from the server**', value: '!kick <Tag a User>' },
        { name: '**Kick a user from the sevrer and provide a reason**', value: '!kick <Tag a User> <reason>' }
    )
    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function math(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!nick Command Usage:**');
    embeddedMsg.setDescription('**NOTE:**\nThis math command only recognizes the symbols ( ) + - * / ^')
    embeddedMsg.addFields(
        { name: '**Do a simple math equation**', value: '!math <Equation>' }
    )
    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function nick(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!nick Command Usage:**');
    
    embeddedMsg.addFields(
        { name: '**Set your own nickname/display name on the server**', value: '!nick <New name>' },
        { name: "**Set another user's nickname/display name on the server**", value: '!kick <Tag a User> <New name>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function nowPlaying(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!nowplaying Command Usage:**');
    
    embeddedMsg.addFields(
        { name: '**Bring up the playing media UI**', value: '!nowplaying' },
        { name: "**Set another user's nickname/display name on the server**", value: '!kick <Tag a User> <New name>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function pause(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!pause Command Usage:**');

    embeddedMsg.addFields(
        { name: "**Pause whatever's playing:**", value: '!pause' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function pic(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!pic Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Send a random picture of a person:**', value: '!pic <Tag a User>' },
        { name: '**Send a random picture of anyone in the database:**', value: '!pic random' },
        { name: '**Upload a picture of a person**', value: '!pic upload <Tag a User>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function ping(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!ping Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Get the time in milliseconds that it takes your message(s) to appear to others:**', value: '!ping' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function play(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!play Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Resume if player is paused:**', value: '!play' },
        { name: '**Play the audio from a video from YouTube:**', value: '!play <YouTube Link>' },
        { name: '**Search YouTube for a video to play the audio from:**', value: '!play <Search Query>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function poll(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!poll Command Usage:**');
    embeddedMsg.setDescription('**Create a poll**\n!poll { Title (optional) } [selection 1] [selection 2] [selection 3] etc...' + '\n\n **NOTE:** *There can only be one title, but multiple options (up to 26)*');
    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function repo(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!repo Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Get a link to the GitHubrepository housing all the files required by bestBot**', value: '!repo' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function restore(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!restore Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Restore your own username and roles**', value: '!restore' },
        { name: "**Restore another user's username and roles**", value: '!restore <Tag a User>' },
        { name: '**Register your own roles to be restored upon request**', value: '!restore register' },
        { name: "**Register another user's roles to be restored upon request**", value: '!restore register <Tag a User>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function role(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!role Command Usage:**');
    embeddedMsg.setDescription('*This command will only work on THIS server. This command is not supported on other servers.*');
    embeddedMsg.addFields(
        { name: '**Grant yourself a role**', value: '!role add <Role Name>' },
        { name: '**Remove a role from yourself**', value: '!role remove <Role Name>' },
        { name: '**Check if you already have a role**', value: '!role check <Role Name>' },
        { name: '**Grant a role to a user**', value: '!role add <Tag a User> <Role Name>' },
        { name: '**Remove a role from a user**', value: '!role remove <Tag a User> <Role Name>' },
        { name: '**Check if a user already has a role**', value: '!role check <Tag a User> <Role Name>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function rps(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!rps Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Simulate a turn of rock paper scissors**', value: '!rps' },
        { name: '**Play a game of rock paper scissors against me**', value: '!rps <rock, paper or scissors>' },
        { name: '**Show the server scoreboard**', value: '!rps scoreboard' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function silence(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!silence Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Toggle server mute for a user**', value: '!silence <Tag a User>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function stop(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!stop Command Usage:**');

    embeddedMsg.addFields(
        { name: "**Stop any audio that bestBot is playing & leave a voice channel:**", value: '!stop' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function summon(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!summon Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Summon a user user via tag & provide them a link to join a voice channel**', value: '!summon <Tag a User>' },
        { name: '**Summon a user user via tag more than once & provide them a link to join a voice channel**', value: '!summon <Tag a User> <Num of Pings (Max: 5)>' },
        { name: '**Summon a user user via DM & provide them a link to join a voice channel**', value: '!summon <Tag a User> DM' },
        { name: '**Summon a user user via DM more than once & provide them a link to join a voice channel**', value: '!summon <Tag a User> DM <Num of Pings (Max: 5)>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function tts(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!tts Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Start a personal text-to-speech session that reads out anything you write in a text channel**', value: '!tts start' },
        { name: '**Stop any active text-to-speech session**', value: '!tts stop' },
        { name: '**Start a text-to-speech session among all users in a text channel**', value: '!tts group' },
        { name: '**Write something for the bot to read out**', value: '!tts <Sentence>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function unban(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!unban Command Usage:**');
    if (message.guild.id == '404413479915880448'){
        embeddedMsg.addFields( 
            { name: '**Unban a user by username**', value: '!unban <Enter a Username>' },
            { name: '**Unban a user by username** __AND__ **discriminator**', value: '!unban <Enter a Username with a Discriminator>' },
            { name: '**Unban a user by their name (Only works with specific people)**', value: '!unban <Enter a Name>' }
        )
    }
    else{
        embeddedMsg.addFields( 
            { name: '**Unban a user by username**', value: '!unban <Enter a Username>' },
            { name: '**Unban a user by username ***AND*** discriminator**', value: '!unban <Enter a Username with its Discriminator>' }
        )
    }

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function volume(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!volume Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Get the current volume of any playing media**', value: '!volume' },
        { name: '**Change the volume of any playing media**', value: '!volume <0-200>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}



// =============================== //
// INVALID ARGUMENT ERROR MESSAGES //
// =============================== //

function nocmd(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('#0099ff') // light blue
    embeddedMsg.setTitle('**Hey!**');
    embeddedMsg.setDescription(`Looks like you've summoned me, ${message.guild.members.cache.get("502354442054664192").displayName}.\nMy commands are accessible using the **!** discriminator.\nTry **!help** to get started.`);
    embeddedMsg.setTimestamp();
    embeddedMsg.setFooter(`Awoken by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);
}

function tagSecondArg(message){
    message.channel.send("You must tag someone as your 2nd argument. Please try again");
}

function tagSecondArgServer(message){
    message.channel.send("You must tag someone ***from this server*** as your 2nd argument. Please try again");
}

function tagThirdArg(message){
    message.channel.send("You must tag someone as your 3rd argument. Please try again");
}

function generalArgProblem(message){
    message.channel.send("There was a problem with the arguments you entered. Please try again");
}

function secondArgProblem(message){
    message.channel.send("There was a problem with the 2nd argument entered. Please try again");
}

function thirdArgProblem(message){
    message.channel.send("There was a problem with the 3rd argument entered. Please try again");
}

function fourthArgProblem(message){
    message.channel.send("There was a problem with the 4th argument entered. Please try again");
}

function invalidCmd(message, Discord, command){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**Command Not Recognized**');
    embeddedMsg.setDescription(`I don't know how to react to the ***${command}*** command.\nTry **!help** to get started.`);
    embeddedMsg.setTimestamp();
    embeddedMsg.setFooter(`Invalid command called by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);
}


// ====================== //
// GENERAL ERROR MESSAGES //
// ====================== //

async function unexpectedErr(message, Discord, msgSplit, command, client){
    var fullMsg = '';
    for (var i = 0; i < msgSplit.length; i++){
        fullMsg += msgSplit[i];
        if (i != msgSplit.length - 1)
            fullMsg += ' ';
    }

    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**Unexpected Error**');
    embeddedMsg.setDescription(`An unexpected error has occurred while trying to run the **${command}** command.`);
    embeddedMsg.setTimestamp();
    embeddedMsg.setFooter(`Command ran by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);

    const logMsg = new Discord.MessageEmbed();
    logMsg.setColor('C80000') // red
    logMsg.setTitle('**Unexpected Error Detected**');
    logMsg.setDescription(`An unexpected error occurred in the server: ${message.guild.name}\n Command: ${fullMsg}`);
    logMsg.setTimestamp();
    logMsg.setFooter(`Command ran by ${message.guild.members.cache.get(message.author.id).displayName}`);

    var chromozone = client.guilds.cache.get("404413479915880448");
    if (chromozone != undefined && chromozone != null){
        var clientLogChannel = chromozone.channels.cache.get("772647489798537236");
        await clientLogChannel.send(logMsg);
    }

    var me = message.guild.members.cache.get('403355889253220352');
    if (me != undefined && me != null){
        message.guild.members.cache.get('403355889253220352').send(logMsg);
    }
}

function missingNewFeature(message, Discord, command){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**Command Not Available (Yet)**');
    embeddedMsg.setDescription(`This **${command}** command or feature of the command has not been implemented yet. It should be imlemented in the near future.`);
    embeddedMsg.setTimestamp();
    embeddedMsg.setFooter(`Unavailable command error message summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);
}

function onlyOnChromozone(message, Discord, command){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**Command Not Supported On This Server**');
    embeddedMsg.setDescription(`The **${command}** command was not designed to be supported on this server.`);
    embeddedMsg.setTimestamp();
    embeddedMsg.setFooter(`Unsupported server error message summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);
}

function permissionDenied(message, Discord, command){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**Permission Denied**');
    embeddedMsg.setDescription(`You are not authorized to use the **${command}** command.`);
    embeddedMsg.setTimestamp();
    embeddedMsg.setFooter(`Permission denied error message summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);
}

function permissionDeniedRole(message, Discord, command, roleName){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**Permission Denied**');
    embeddedMsg.setDescription(`You are not authorized to use the **${command}** command.\nYou must have the *${roleName}* role to use this command.`);
    embeddedMsg.setTimestamp();
    embeddedMsg.setFooter(`Permission denied error message summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);
}

function depreciated(message, Discord, command){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**Command Depreciated**');
    embeddedMsg.setDescription(`The **${command}** command has been depreciated, and will no longer be supported by bestBot.`);
    embeddedMsg.setTimestamp();
    embeddedMsg.setFooter(`Depreciated command error message summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);
}

function disabled(message, Discord, command){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**Command Disabled**');
    embeddedMsg.setDescription(`The **${command}** command has been temporarily disabled.`);
    embeddedMsg.setTimestamp();
    embeddedMsg.setFooter(`Disabled command error message summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);
}

function missingPermissions(message, Discord, command){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**Missing Permissions**');
    embeddedMsg.setDescription(`I am missing one or more required permissions to carry-out the **${command}** command.\nContact the server moderators for help with resolving this issue.`);
    embeddedMsg.setTimestamp();
    embeddedMsg.setFooter(`Missing permission error message summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);
}



// ============== //
// MODULE EXPORTS //
// ============== //

module.exports = { 
    
    //usage msg exports:
    help, amongus, auth, avatar, ban, chegg, clip, coinflip, daysSince, deaf, earrape, feedback, gay, google, id, invite,
    isolate, kick, math, nowPlaying, nick, pause, pic, ping, play, poll, repo, restore, role, rps, silence, stop, summon, tts, unban, volume,
    
    // invalid argument msg exports:
    nocmd, tagSecondArg, tagSecondArgServer, tagThirdArg, generalArgProblem, secondArgProblem, thirdArgProblem, fourthArgProblem, invalidCmd,

    //unexpected error msg exports:
    unexpectedErr, missingNewFeature, onlyOnChromozone, permissionDenied, permissionDeniedRole, depreciated, disabled, missingPermissions

};