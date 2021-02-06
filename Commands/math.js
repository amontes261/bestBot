
////////////////////////////////////////////
//// math.js – JavaScript x DiscordJS //////
//// Alex Montes ––– @a.montes28#4501 //////
////////////////////////////////////////////

function mathSwitch(message, Discord, msgSplit, errFile, math){

 /* - Function mathSwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic, ease-of-life command – usable on any server

    - Was designed to be triggered via command: !math

    - Try !math help to have the bot to provide a usage message */
       
    if (msgSplit.length == 1) // Incorrect command usage message //
        errFile.math(message, Discord);
    else if (msgSplit.length == 2 && msgSplit[1] == "help") // Command usage message requested //
        errFile.math(message, Discord);
    else{
        // Strip entire equation of any whitespace //
        var equation = '';
        for (var i = 1; i < msgSplit.length; i++){
            if (msgSplit[i] != '')
                equation += msgSplit[i];
        }

        // Create refined equation for output back to user //
        var refinedEquation = '';
            for (var i = 0; i < equation.length; i++){
                if (equation[i] == '*')
                    refinedEquation += '•';
                else
                    refinedEquation += equation[i];
            }

        // Ensure no variables exist in the equation // 
        if (hasVariable(equation) ){
            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('C80000') // red
                .setTitle(`Computation Failed`)
                .setDescription(`The math feature does not support variables.\nPlease check your entry and try again.`)
                .addField('**Equation entered:**', `${refinedEquation}`, false)
                .setTimestamp()
                .setFooter(`Flawed equation entered by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg);
            return;
        }

        // Ensure only allowed symbols are used // 
        if (!properSymbols(equation) ){
            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('C80000') // red
                .setTitle(`Computation Failed`)
                .setDescription(`The equation you entered has improper symbols in it.\nPlease check your entry and try again.`)
                .addField('**Equation entered:**', `${refinedEquation}`, false)
                .setTimestamp()
                .setFooter(`Flawed equation entered by ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send(embeddedMsg);
            return;
        }
        
        // Ensure all opened parentheses are closed, output error if not all are closed // 
        if (parenthesesMatch(equation) != 0){
            var parenthesesOffset = parenthesesMatch(equation);

            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('C80000') // red
                .setTitle(`Computation Failed`)
                .addField('Equation entered:', `${refinedEquation}`, false)
                .setTimestamp()
                .setFooter(`Flawed equation entered by ${message.guild.members.cache.get(message.author.id).displayName}`);
            
            if (parenthesesOffset == -1)
                embeddedMsg.setDescription(`There is ${Math.abs(parenthesesOffset)} opening parenthesis missing\nPlease check your entry and try again.`)
            else if (parenthesesOffset == 1)
                embeddedMsg.setDescription(`There is ${Math.abs(parenthesesOffset)} closing parenthesis missing\nPlease check your entry and try again.`)
            else if (parenthesesOffset < 0)
                embeddedMsg.setDescription(`There are ${Math.abs(parenthesesOffset)} opening parentheses missing\nPlease check your entry and try again.`)
            else
                embeddedMsg.setDescription(`There are ${Math.abs(parenthesesOffset)} closing parentheses missing\nPlease check your entry and try again.`)

            message.channel.send(embeddedMsg);
        }
        else{
            try{ // Attenpt to evaluate equation //
                var answer = math.evaluate(equation).toString();
            }
            catch(e){ // Case: Evaluation Failed //
                const embeddedMsg = new Discord.MessageEmbed()
                    .setColor('C80000') // red
                    .setTitle(`Computation Failed`)
                    .setDescription(`Eithre you've entered an invalid equation or something went wrong.\nPlease check your entry and try again.`)
                    .addField('**Equation entered:**', `${refinedEquation}`, false)
                    .setTimestamp()
                    .setFooter(`Flawed equation entered by ${message.guild.members.cache.get(message.author.id).displayName}`);
                message.channel.send(embeddedMsg);
                return;
            }

            // Will only get this far if "valid" answer calculated //
            var refinedAnswer = '';
            var counter = 0;
            var decimalReached = (answer.indexOf('.') == -1 );
            for (var i = answer.length - 1; i >= 0; i--){

                if (answer[i] == '.'){
                    decimalReached = true;
                    refinedAnswer = '.' + refinedAnswer;
                }
                else if (!decimalReached){
                    refinedAnswer = answer[i] + refinedAnswer;
                }
                else if (answer == "Infinity"){ // Case: Answer is extremely large //
                    refinedAnswer = "Very, Very Large Number";
                    break;
                }
                else if (answer == "NaN"){ // Case: Number DNE //
                    refinedAnswer = "Not A Number...";
                    break;
                }
                else{ // Adds commas to answers greater than 999 //
                    if (counter % 3 == 0 && counter != 0){
                        counter = 0;
                        refinedAnswer = ',' + refinedAnswer;
                    }
                    refinedAnswer = answer[i] + refinedAnswer;
                    counter++;
                }  
            }

            const embeddedMsg = new Discord.MessageEmbed()
                if (answer == 'NaN' || answer == "Infinity"){
                    embeddedMsg.setTitle(`${refinedAnswer}`)
                        .setColor('EFEF00') // yellow
                }
                else{
                    embeddedMsg.setTitle(`Answer: ${refinedAnswer}`)
                    .setColor('00C500') // green
                }
                embeddedMsg.setDescription(`Equation: ${refinedEquation}`)
                .setTimestamp()
                .setFooter(`Computation requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

            message.channel.send(embeddedMsg);
        }
    }

}

// =========================================================

function hasVariable(equation){
    for (var i = 0; i < equation.length; i++){
        if (equation[i].toLowerCase() != equation[i].toUpperCase())
            return true;
    }
    return false;
}

function parenthesesMatch(equation){
    var numOpen = 0;
    for (var i = 0; i < equation.length; i++){
        if (equation[i] == '(')
        numOpen++;
        else if (equation[i] == ')')
        numOpen--;
    }
    return numOpen;
}

function properSymbols(equation){
    var charCleared = false;
    var allowedSymbols = ['(', ')', '+', '-', '*','/', '^', '.'];
    for (var i = 0; i < equation.length; i++){
        if (!isNaN(equation[i]) )
            continue;
        for (var j = 0; j < allowedSymbols.length; j++){
            if (equation[i] == allowedSymbols[j]){
                charCleared = true;
                break;
            }
        }
        if (!charCleared)
            return false;
        else
            charCleared = false;
    }
    return true;
}



// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { mathSwitch };