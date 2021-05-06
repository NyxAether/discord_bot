const discord = require('discord.js');
const client = new discord.Client();
const REGEX_DICE= /^[0-9]+d[0-9]$/;

client.login('ODM5ODI5NzQ5MDcyNzg5NTE1.YJPWZw.hb6RuqZQE9qWt13g7662INYLzmI');

function rollDice(nb,diceValue){
    var total = 0;
    if (diceValue === 0){
        return 0;
    }
    for (let index = 0; index < nb; index++) {
        total = total + Math.ceil(Math.random()*diceValue);
        console.log(total);
    }
    return total;
}


client.on('ready', () => {
    console.log('Connected to the bot');
});
 
client.on('message', msg => {
    if (msg.content[0] === '!') {
        var roll=msg.content.substr(1);
        if (REGEX_DICE.test(roll)) {
            var diceInfo=roll.split('d')
            console.log(diceInfo)
            msg.reply(rollDice(diceInfo[0],diceInfo[1]));
        }
    }
     
});