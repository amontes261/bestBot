



// ================== //
// ALL USAGE MESSAGES //
// ================== //

function gayUsage(message){
    message.channel.send("Usage: Are you gay? ```!gay```\nIs another user gay?: ```!gay <Tag a User>```\nDeclare another user as gay: ```!gay <Tag a User> immediate```\nDeclare another user as straight: ```!gay <Tag a User> remove```");
}

function picUsage(message){
    message.channel.send("Usage: ```!pic <Tag a user>```\nUpload a pic: ```!pic add <Tag a User>```");
}

function daysSince(message){
    message.channel.send("Usage: Ask how many days since:```!dayssince <tag a user>```\nSet how many days since: ```!dayssince <tag a user> <number of days>```\nToday's the big day: ```!dayssince <tag a user> reset```")
}

function clip(message){
    message.channel.send("Usage: Play a clip:```!clip <clip name>```\nUpload a clip: ```!bitch clip upload <clip name>```\nList all available clips that can be sent: ```!bitch clip list```")
}

function coinflip(message){
    message.channel.send("Usage: Flip a coin: ```!coinflip```");
}

function summon(message){
    message.channel.send("Usage: Get user's attention here: ```!summon <Tag a user> <(Optional) Num. of Pings, Max: 5>```\nGet a user's attention via DM: ```!summon <Tag a user> DM <(Optional) Num. of Pings, Max: 5>```");
}




// =============================== //
// INVALID ARGUMENT ERROR MESSAGES //
// =============================== //

function nocmd(message){
    message.channel.send("Looks like you've summoned bitchBot.\nTry \"!bitch help\" for commands.");
}

function tagSecondArg(message){
    message.channel.send("You must tag someone as your 2nd argument. Please try again");
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

function permissionDenied(message, roleName){
    message.channel.send(`<@${message.author.id}> you're not authorized to run this command. You must have the \"${roleName}\" role.`)
}




// ============== //
// MODULE EXPORTS //
// ============== //

module.exports = { 
    
    //usage msg exports:
    gayUsage, picUsage, daysSince, clip, coinflip, summon, 
    
    // invalid argument msg exports:
    nocmd, tagSecondArg, generalArgProblem, secondArgProblem, thirdArgProblem, fourthArgProblem, 

    //unexpected error msg exports:
    unexpectedErr, missingNewFeature, onlyOnChromozone, permissionDenied

};