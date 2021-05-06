const discord = require('discord.js');
const express = require('express');

const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


// ------------------------------------------------- //
const client = new discord.Client();
const REGEX_DICE= /^[1-9][0-9]*d[1-9][0-9]*$/;

client.login(process.env['TOKEN']);

function rollDice(nb,diceValue){
    var total = 0;
    if (diceValue === 0){
        return 0;
    }
    for (let index = 0; index < nb; index++) {
        total = total + Math.ceil(Math.random()*diceValue);
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
            msg.reply(rollDice(diceInfo[0],diceInfo[1]));
        }
    }
     
});