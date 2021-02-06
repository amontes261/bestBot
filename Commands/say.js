
/////////////////////////////////////////
//// say.js – JavaScript x DiscordJS ////
//// Alex Montes –– @a.montes28#4501 ////
/////////////////////////////////////////

function saySwitch(message, msgSplitUpper){

/* - Function saySwitch() was designed to ONLY be called from file main.js

    - Small, cosmetic command – usable on any server

    - Was designed to be triggered via command: !say */
       
    var simonSays = '';
    msgSplitUpper.forEach((word) => {
        if (word != '!say'){
            simonSays += word;
            simonSays += ' ';
        }
    })
    message.channel.send(simonSays);
    message.delete();
}  


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { saySwitch };