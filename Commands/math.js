
function mathSwitch(message, Discord, msgSplit, errFile, math){


    if (msgSplit.length == 1){
        errFile.math(message, Discord);
    }
    else{
        var equation = '';
        for (var i = 1; i < msgSplit.length; i++){
            if (msgSplit[i] != '')
                equation += msgSplit[i];
        }

        var refinedEquation = '';
            for (var i = 0; i < equation.length; i++){
                if (equation[i] == '*')
                    refinedEquation += '•';
                else
                    refinedEquation += equation[i];
            }
        
        // console.log("equation: " + equation);
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
            message.delete();
        }
        else{
            try{
                var answer = math.evaluate(equation).toString();
            }
            catch (e) {
                

                message.channel.send("nishant = gay (error occurred- this will be coded soon)");
                return;
            }

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
                else if (answer == "Infinity"){
                    refinedAnswer = "Infinity (Insanely Large Number)";
                }
                else{
                    if (counter % 3 == 0 && counter != 0){
                        counter = 0;
                        refinedAnswer = ',' + refinedAnswer;
                    }
                    refinedAnswer = answer[i] + refinedAnswer;
                    counter++;
                }  
            }

            const embeddedMsg = new Discord.MessageEmbed()
                .setColor('00C500') // green
                .setTitle(`Answer: ${refinedAnswer}`)
                .setDescription(`Equation: ${refinedEquation}`)
                .setTimestamp()
                .setFooter(`Computation requested by ${message.guild.members.cache.get(message.author.id).displayName}`);

            message.channel.send(embeddedMsg);
            message.delete();
        }
    }

}

// =========================================================

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