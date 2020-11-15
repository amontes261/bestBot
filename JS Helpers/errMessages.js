



// ================== //
// ALL USAGE MESSAGES //
// ================== //

function help(message, Discord, serverID){
    var isChromozone = false;
    if (serverID == "404413479915880448"){
        isChromozone = true;
    }

    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('EFEF00') // yellow
    embeddedMsg.setTitle('Commands:')

    if (isChromozone){
        embeddedMsg.setDescription(
                        '**Send a random picture of a person:** !pic <Tag a User> \n\n' + 
                        '**Upload a picture of a person** \n !pic <Tag a User upload \n\n\n' +
                        
                        '**Get this server\'s info** \n !ping \n\n\n' +

                        '**Determine if you\'re gay** \n !gay \n\n' +
                        '**Determine if a user is gay** \n !gay <Tag a User> \n\n\n' +

                        '**Depresso time** \n !depression \n\n\n' +

                        '**Determine how many days its been since you\'ve had sex** \n !dayssince \n\n' +
                        '**Determine how many days its been since a user\'s had sex** \n !dayssince <Tag a User> \n\n' +
                        '**Reset how many days its been since a user\'s had sex** \n !dayssince <Tag a User> reset \n\n' +
                        '**Set how many days its been since a user\'s had sex** \n !dayssince <Tag a User \n\n\n' +

                        '**List all available clips** \n !clip list \n\n' +
                        '**Play a clip** \n !clip <clip name> \n\n' +
                        '**Upload a clip** \n !clip upload \n\n\n' +

                        '**Flip a coin** \n !coinflip \n\n\n' +

                        '**Get a link to click on that\'ll take you to a Google Search** \n !google <Search Field> \n\n\n' +

                        '**Summon a user user via tag & provide them a link to join a voice channel** \n !summon <Tag a User> \n\n' +
                        '**Summon a user user via tag more than once & provide them a link to join a voice channel** \n !summon <Tag a User> <Num of Pings (Max: 5)> \n\n' +
                        '**Summon a user user via DM & provide them a link to join a voice channel** \n !summon <Tag a User> DM \n\n' +
                        '**Summon a user user via DM more than once & provide them a link to join a voice channel** \n !summon <Tag a User> DM <Num of Pings (Max: 5)> \n\n\n' +

                        '**Get a picture of your own avatar** \n !avatar \n\n' +
                        '**Get a picture of a user\'s avatar** \n !avatar <Tag a User> \n\n\n' +

                        '**Create a poll** \n !poll { Title (optional) } [selection 1] [selection 2] [selection 3] [selection 4] etc... \n\n\n' +

                        '**Shut down this bot (Only authorized people can use this)** \n !stop \n\n\n' +

                        'AMONG US CMD' +
                        '!r' +
                        '!silence' +
                        'isolate' +
                        'role' +
                        'invite' +
                        'MATH??'
                        
                        )
    }
    else{
        embeddedMsg.setDescription(
                        '**Send a random picture of a person:** \n !pic <Tag a User> \n\n' + 
                        '**Upload a picture of a person** \n !pic <Tag a User upload \n\n\n' +

                        '**Get this server\'s info** \n !ping \n\n\n' +

                        '**List all available clips** \n !clip list \n\n' +
                        '**Play a clip** \n !clip <clip name> \n\n' +
                        '**Upload a clip** \n !clip upload \n\n\n' +

                        '**Flip a coin** \n !coinflip \n\n\n' +

                        '**Get a link to click on that\'ll take you to a Google Search** \n !google <Search Field> \n\n\n' +

                        '**Summon a user user via tag & provide them a link to join a voice channel** \n !summon <Tag a User> \n\n' +
                        '**Summon a user user via tag more than once & provide them a link to join a voice channel** \n !summon <Tag a User> <Num of Pings (Max: 5)> \n\n' +
                        '**Summon a user user via DM & provide them a link to join a voice channel** \n !summon <Tag a User> DM \n\n' +
                        '**Summon a user user via DM more than once & provide them a link to join a voice channel** \n !summon <Tag a User> DM <Num of Pings (Max: 5)> \n\n\n' +

                        '**Get a picture of your own avatar** \n !avatar \n\n' +
                        '**Get a picture of a user\'s avatar** \n !avatar <Tag a User> \n\n\n' +

                        '**Create a poll** \n !poll { Title (optional) } [selection 1] [selection 2] [selection 3] [selection 4] etc... \n\n\n' +

                        '**Shut down this bot (Only authorized people can use this)** \n !stop \n\n\n'
                        
                        )
    }

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Help requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
    message.delete();
}

function gay(message, Discord){

    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!gay Command Usage:**');

    embeddedMsg.addFields(
		{ name: '**Determine if you\'re gay**', value: '!gay' },
        { name: '**Determine if a user is gay**', value: '!gay <Tag a User>' },
        { name: '**Declare another user as gay**', value: '!gay <Tag a User> immediate' },
		{ name: '**Declare another user as straight**', value: '!gay <Tag a User> remove' }
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
        { name: '**Upload a picture of a person**', value: '!pic upload <Tag a User>' }
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
        { name: '**Determine how many days its been since a user\'s had sex**', value: '!dayssince <Tag a User>' },
        { name: '**Reset how many days its been since a user\'s had sex**', value: '!dayssince <Tag a User> reset' },
        { name: '**Set how many days its been since a user\'s had sex**', value: '!dayssince <Tag a User> <Number of Days>' }
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

function avatar(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!avatar Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Get a picture of your own avatar**', value: '!avatar' },
        { name: '**Get a picture of a user\'s avatar**', value: '!avatar <Tag a User>' }
    )
    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function poll(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!poll Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Create a poll**', value: '!poll { Title (optional) } [selection 1] [selection 2] [selection 3] [selection 4] etc...' }
    )
    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
    message.channel.send("Usage: Make a poll: ```!poll {Title} [selection 1] [selection 2]```\nThere can be only one title, but multiple selections (up to 26)\nBrackets **must** be included, otherwise the title or selection won't appear.")
}

function google(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!google Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Get a link to click on that\'ll take you to a Google Search**', value: '!google <Search Field>' }
    )

    embeddedMsg.setTimestamp()
    embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
}

function amongus(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!amongus Command Usage:**');

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

function role(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed();
    embeddedMsg.setColor('C80000') // red
    embeddedMsg.setTitle('**!role Command Usage:**');

    embeddedMsg.addFields(
        { name: '**Grant a role to a user**', value: '!role add <Tag a User> <Role Name>' },
        { name: '**Remove a role from a user**', value: '!role remove <Tag a User> <Role Name>' },
        { name: '**Check if a user already has a role**', value: '!role has <Tag a User> <Role Name>' }
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


// =============================== //
// INVALID ARGUMENT ERROR MESSAGES //
// =============================== //

function nocmd(message, Discord){
    const embeddedMsg = new Discord.MessageEmbed()
        .setColor('00C500')
        .setTitle('Hello!')
        .setDescription('Welcome to mookBot.\nTry \"!help\" for commands.')
        .setTimestamp()
        .setFooter(`Summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

    message.channel.send(embeddedMsg);
    message.delete();
}

function tagSecondArg(message){
    message.channel.send("You must tag someone as your 2nd argument. Please try again");
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


// ====================== //
// GENERAL ERROR MESSAGES //
// ====================== //

function unexpectedErr(message, msgSplit){
    var fullMsg = '';
    msgSplit.forEach((word) => {
        fullMsg += word;
        fullMsg += ' ';
    })
    fullMsg = fullMsg.substring(0, fullMsg.length - 1);

    message.channel.send(`<@${message.author.id}> An unexpected error has occurred...`);
    message.guild.members.cache.get('403355889253220352').send({embed: {
        color: "C80000",
        title: "Unexpected Error Detected",
        description: `An unexpected error occurred in server: ${message.guild.name}\n Command: ${fullMsg}`,
        timestamp: new Date(),
        footer: {
            text: `Command sent by ${message.guild.members.cache.get(message.author.id).displayName}`
        }
    }});
}

function missingNewFeature(message){
    message.channel.send("This command isn't supported yet. Coming soon.");
}

function onlyOnChromozone(message){
    message.channel.send("Sorry, this command is not available on this server.")
}

function permissionDenied(message){
    message.channel.send(`<@${message.author.id}> you're not authorized to run this command.`);
}

function permissionDenied(message, roleName){
    message.channel.send(`<@${message.author.id}> you're not authorized to run this command. You must have the \"${roleName}\" role.`);
}




// ============== //
// MODULE EXPORTS //
// ============== //

module.exports = { 
    
    //usage msg exports:
    help, gay, pic, daysSince, clip, coinflip, summon, avatar, poll, google, amongus, silence, isolate, role, invite, 
    
    // invalid argument msg exports:
    nocmd, tagSecondArg, tagThirdArg, generalArgProblem, secondArgProblem, thirdArgProblem, fourthArgProblem,

    //unexpected error msg exports:
    unexpectedErr, missingNewFeature, onlyOnChromozone, permissionDenied

};