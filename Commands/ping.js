
function pingSwitch(message, Discord){
    var time = new Date().getTime();
    var ping = time - message.createdTimestamp;

    const embeddedMsg = new Discord.MessageEmbed()
    .setColor('#00C500') // green
    .setTitle('Pong!')
    .setDescription(`Your message was recieved in ${ping}ms.\nServer Region: ${message.guild.region}`)
    .setTimestamp()
    .setFooter(`Ping sent by ${message.guild.members.cache.get(message.author.id).displayName}`);
    message.channel.send(embeddedMsg);
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { pingSwitch };