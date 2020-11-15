
function saySwitch(message, msgSplitUpper){
    var newMsg = '';
    msgSplitUpper.forEach((word) => {
        if (word != '!say'){
            newMsg += word;
            newMsg += ' ';
        }
    })
    message.channel.send(newMsg);
    message.delete();
}  


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { saySwitch };