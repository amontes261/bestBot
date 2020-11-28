
function rpsSwitch(message, Discord, msgSplit, errFile){
    if (msgSplit.length == 1){
        var result = parseInt( Math.random() * 3 , 10);

        const embeddedMsg = new Discord.MessageEmbed()
            .setColor('00C500') // green
            .setTimestamp()
            .setFooter(`Rock, paper, scissors turn requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

        if (result == 0){
            embeddedMsg.setTitle('Rock');
            embeddedMsg.attachFiles(['./RPS_clipart/rock.png'])
                .setImage('attachment://rock.png');
            embeddedMsg.setDescription("My selection was **ROCK**.");
        }
        else if (result == 1){
            embeddedMsg.setTitle('Paper');
            embeddedMsg.attachFiles(['./RPS_clipart/paper.png'])
                .setImage('attachment://paper.png');
            embeddedMsg.setDescription("My selection was **PAPER**.");
        }
        else{
            embeddedMsg.setTitle('Scissors');  
            embeddedMsg.attachFiles(['./RPS_clipart/scissors.png'])
                .setImage('attachment://scissors.png'); 
            embeddedMsg.setDescription("My selection was **SCISSORS**.");
        }
        
        message.channel.send(embeddedMsg);
        message.delete();
    }
    else if (msgSplit.length == 2){
        if (msgSplit[1] != 'rock' && msgSplit[1] != 'paper' && msgSplit[1] != 'scissors'){
            errFile.rps(message, Discord);
            return;
        }
        var result = parseInt( Math.random() * 3 , 10);
        const embeddedMsg = new Discord.MessageEmbed()
            .setTimestamp()
            .setFooter(`Rock, paper, scissors turn requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

        var computerSelection = '';

        if (result == 0){
            computerSelection = 'rock';
            embeddedMsg.attachFiles(['./RPS_clipart/rock.png'])
                .setImage('attachment://rock.png');
        }
        else if (result == 1){
            computerSelection = 'paper';
            embeddedMsg.attachFiles(['./RPS_clipart/paper.png'])
                .setImage('attachment://paper.png');
        }
        else{
            computerSelection = 'scissors';
            embeddedMsg.attachFiles(['./RPS_clipart/scissors.png'])
                .setImage('attachment://scissors.png');
        }

        var outcome = determineWinner(computerSelection, msgSplit[1]); // 0 on author win, 1 on author loss, 2 on draw

        if (outcome == -1){
            errFile.unexpectedErr(message, msgSplit);
            return;
        }
        if (outcome == 0){
            embeddedMsg.setColor('00C500') // green
            embeddedMsg.setTitle('You Win');
            embeddedMsg.setDescription(`My selection was **${computerSelection}**, but your selection was **${msgSplit[1]}**.`);
        }
        else if (outcome == 1){
            embeddedMsg.setColor('C80000') // red
            embeddedMsg.setTitle('You Lose');
            embeddedMsg.setDescription(`Your selection was **${msgSplit[1]}**, but my selection was **${computerSelection}**.`);
        }
        else{
            embeddedMsg.setColor('EFEF00') // yellow
            embeddedMsg.setTitle("Draw");
            embeddedMsg.setDescription(`It's a draw. We both selected **${msgSplit[1]}**.`);
        }
        message.channel.send(embeddedMsg);
        message.delete();
    }
    else{
        errFile.rps(message, Discord);
    }
}

function determineWinner(computerSelection, authorSelection){
    // 0 on author win, 1 on author loss, 2 on draw
    if (computerSelection == authorSelection)
        return 2;
    else if (computerSelection == 'rock'){
        if (authorSelection == 'paper')
            return 0;
        else if (authorSelection == 'scissors')
            return 1;
    }
    else if (computerSelection == 'paper'){
        if (authorSelection == 'scissors')
            return 0;
        else if (authorSelection == 'rock')
            return 1; 
    }
    else if (computerSelection == 'scissors'){
        if (authorSelection == 'rock')
            return 0;
        else if (authorSelection == 'paper')
            return 1; 
    }
    else
        return -1;
}



// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { rpsSwitch };