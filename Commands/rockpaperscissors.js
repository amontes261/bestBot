
///////////////////////////////////////////////////////
//// rockpaperscissors.js – JavaScript x DiscordJS ////
//// Alex Montes  ––––––––––––––  @a.montes28#4501 ////
///////////////////////////////////////////////////////

function rpsSwitch(message, Discord, fs, msgSplit, errFile, client){

/* - Function rpsSwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic command – usable on any server

    - Was designed to be triggered via command: !rps

    - Try !rps help to have the bot to provide a usage message */
    
    var data;
    try { // Attempt to read "database" JSON file //
        data = JSON.parse(fs.readFileSync("Data_Management/rpsData.json"));
    }
    catch (e) {
        errFile.unexpectedErr(message, Discord, msgSplit, "rps", client);
        return;
    }

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
    }
    else if (msgSplit.length == 2 && msgSplit[1] == 'scoreboard'){
        const embeddedMsg = new Discord.MessageEmbed();
        if (!data["Guilds"].hasOwnProperty(message.guild.id)) { // Case: Guild never registered into database //
            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('C80000') // red
                .setTitle('Scoreboard Unavailable') 
                .setDescription('There is no **rps** data available for this server.')
                .setTimestamp()
                .setFooter(`Failed rps scoreboard by ${message.guild.members.cache.get(message.author.id).displayName}`);

            message.channel.send(embeddedMsg);
            return;
        }
        else{
            var leaderboard = [];

            for (var user in data["Guilds"][message.guild.id]["Users"]){
                var ctr = 0;
                if (leaderboard.length == 0)
                    leaderboard.push(user);
                else{
                    while(ctr != leaderboard.length){
                        if (data["Guilds"][message.guild.id]["Users"][leaderboard[ctr]]['Longest Winstreak'] < data["Guilds"][message.guild.id]["Users"][user]['Longest Winstreak']){
                            leaderboard.splice(ctr, 0, user);
                            break;
                        }
                        else if(data["Guilds"][message.guild.id]["Users"][leaderboard[ctr]]['Longest Winstreak'] == data["Guilds"][message.guild.id]["Users"][user]['Longest Winstreak']){
                            if (data["Guilds"][message.guild.id]["Users"][leaderboard[ctr]]["Display Name"] > data["Guilds"][message.guild.id]["Users"][user]["Display Name"]){
                                leaderboard.splice(ctr, 0, user);
                                break;
                            }
                        }
                        else if (ctr == (leaderboard.length - 1) ){
                            leaderboard.splice(ctr + 1, 0, user);
                            break;
                        }
                        ctr++;
                    }
                }
            }

            var topFiveNames = '';
            var topFiveStreaks = '';
            var topFivePlayed = '';

            var showLimit = 10;
            if (leaderboard.length < showLimit){
                showLimit = leaderboard.length;
            }
            for(var i = 0; i < showLimit; i++){
                if (i == showLimit - 1){
                    topFiveNames += data["Guilds"][message.guild.id]["Users"][leaderboard[i]]["Display Name"]
                    topFiveStreaks += data["Guilds"][message.guild.id]["Users"][leaderboard[i]]["Longest Winstreak"]
                    topFivePlayed += data["Guilds"][message.guild.id]["Users"][leaderboard[i]]["Games Played"]
                }
                else{
                    topFiveNames += data["Guilds"][message.guild.id]["Users"][leaderboard[i]]["Display Name"] + "\n"
                    topFiveStreaks += data["Guilds"][message.guild.id]["Users"][leaderboard[i]]["Longest Winstreak"] + "\n"
                    topFivePlayed += data["Guilds"][message.guild.id]["Users"][leaderboard[i]]["Games Played"] + "\n"
                }
            }
          
              const embed = new Discord.MessageEmbed()
                .setAuthor(`RPS Leaderboard for ${message.guild.name}`, message.guild.iconURL())
                .setColor('00CBFF') // baby blue
                .addFields({ name: 'Display Name', value: topFiveNames, inline: true },
                  { name: 'Longest Streak', value: topFiveStreaks, inline: true },
                  { name: 'Games Played', value: topFivePlayed, inline: true } )
                .setTimestamp()
                .setFooter(`Rock, paper, scissors scoreboard summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

            embeddedMsg.setColor('C80000') // red
            embeddedMsg.setTitle('**bruh**');

            embeddedMsg.addFields(
                { name: '**Simulate a turn of rock paper scissors**', value: '!rps', inline: false },
                { name: '**Play a game of rock paper scissors against me**', value: '!rps <rock, paper or scissors>', inline: false },
                { name: '**Show the server scoreboard**', value: '!rps scoreboard', inline: false }
            )

            embeddedMsg.setTimestamp()
            embeddedMsg.setFooter(`Command usage summoned by ${message.guild.members.cache.get(message.author.id).displayName}`);

            message.channel.send(embed);
        }
    }
    else if (msgSplit.length == 2 && msgSplit[1] != 'help'){
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
        storeData(message, fs, computerSelection, msgSplit[1], message.author.id, data, outcome);

        if (outcome == -1){
            errFile.unexpectedErr(message, Discord, msgSplit, "rps", client);
            return;
        }
        if (outcome == 0){

            embeddedMsg.setColor('00C500') // green
            embeddedMsg.setTitle('You Win');
            embeddedMsg.setDescription(`My selection was **${computerSelection}**, but your selection was **${msgSplit[1]}**.\nYour winstreak: ${data["Guilds"][message.guild.id]["Users"][message.author.id]["Current Winstreak"]}\nYour longest winstreak: ${data["Guilds"][message.guild.id]["Users"][message.author.id]["Longest Winstreak"]}`);
        }
        else if (outcome == 1){
            embeddedMsg.setColor('C80000') // red
            embeddedMsg.setTitle('You Lose');
            embeddedMsg.setDescription(`Your selection was **${msgSplit[1]}**, but my selection was **${computerSelection}**.\nYour longest winstreak: ${data["Guilds"][message.guild.id]["Users"][message.author.id]["Longest Winstreak"]}`);
        }
        else{
            embeddedMsg.setColor('EFEF00') // yellow
            embeddedMsg.setTitle("Draw");
            embeddedMsg.setDescription(`It's a draw. We both selected **${msgSplit[1]}**.`);
        }
        message.channel.send(embeddedMsg);
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

function storeData(message, fs, computerSelection, authorSelection, authorID, data, gameOutcome){
    if (!data["Guilds"].hasOwnProperty(message.guild.id)) { // Case: Guild never registered into database //
        data["Guilds"][message.guild.id] = {
            "Server Name": message.guild.name,
            "Users": {}
        }
        data["Guilds"][message.guild.id]["Users"][authorID] = {
            "Display Name" : message.guild.members.cache.get(authorID).displayName,
            "Current Winstreak" : 0,
            "Longest Winstreak": 0,
            "Number of Rock Picks": 0,
            "Number of Paper Picks": 0,
            "Number of Scissors Picks": 0,
            "Games Played": 0
        }

    }
    else if (!data["Guilds"][message.guild.id]["Users"].hasOwnProperty(authorID)) { // Case: Author never registered into database //
        data["Guilds"][message.guild.id]["Users"][authorID] = {
            "Display Name" : message.guild.members.cache.get(authorID).displayName,
            "Current Winstreak" : 0,
            "Longest Winstreak": 0,
            "Number of Rock Picks": 0,
            "Number of Paper Picks": 0,
            "Number of Scissors Picks": 0,
            "Games Played": 0
        }
    }
    
    data["Guilds"][message.guild.id]["Users"][authorID]["Games Played"]++;

    if (authorSelection == 'rock')
        data["Guilds"][message.guild.id]["Users"][authorID]["Number of Rock Picks"]++;
    else if (authorSelection == 'paper')
        data["Guilds"][message.guild.id]["Users"][authorID]["Number of Paper Picks"]++;
    else if (authorSelection == 'scissors')
        data["Guilds"][message.guild.id]["Users"][authorID]["Number of Scissors Picks"]++;

    if (gameOutcome == 0){
        data["Guilds"][message.guild.id]["Users"][authorID]["Current Winstreak"]++;
        if (data["Guilds"][message.guild.id]["Users"][authorID]["Current Winstreak"] > data["Guilds"][message.guild.id]["Users"][authorID]["Longest Winstreak"])
            data["Guilds"][message.guild.id]["Users"][authorID]["Longest Winstreak"] = data["Guilds"][message.guild.id]["Users"][authorID]["Current Winstreak"];
    }
    else if (gameOutcome == 1)
        data["Guilds"][message.guild.id]["Users"][authorID]["Current Winstreak"] = 0;

    fs.writeFileSync('Data_Management/rpsData.json', JSON.stringify(data));
    // Shouldn't fail if it's already gotten this far //
}



// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { rpsSwitch };