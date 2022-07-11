// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');

// ------------------------------------------------- //
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const REGEX_DICE = /^[1-9][0-9]*d[1-9][0-9]*$/;

dotenv.config();
client.login(process.env.TOKEN);



client.on('ready', () => {
    console.log('Connected to the bot');
});

client.on('message', msg => {
    if (msg.content[0] === '!') {
        var roll = msg.content.substring(1);
        if (REGEX_DICE.test(roll)) {
            var diceInfo = roll.split('d')
            msg.reply(rollDice(diceInfo[0], diceInfo[1]));
        }
    }
    pollMessage(msg);

});

function rollDice(nb, diceValue) {
    var total = 0;
    if (diceValue === 0) {
        return 0;
    }
    for (let index = 0; index < nb; index++) {
        total = total + Math.ceil(Math.random() * diceValue);
    }
    return total;
}

function pollMessage(msg) {
    var list_emoji = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
 
    if (msg.content.startsWith('!poll ')) {
        pollText = msg.content.substr(6);
        pollStruct = pollText.split('|');
        if (pollStruct.length > 10) {
            msg.channel.send('Trop de choix (Maximum 9)');
        }
        else if (pollStruct.length === 1) {
            var reponses = '\n' +
                '🟢 Oui\n🔴 Non\n';
            const poll = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(pollText)
                    .setDescription(reponses);
            msg.channel.send(poll).then(function (msg) {
                msg.react("🟢")
                msg.react("🔴")
              }).catch(function() {
                //Something
               });
            }
            else {
                responses=''
                for (let i = 0; i < pollStruct.length-1; i++) {
                    const choice = pollStruct[i+1];
                    responses=responses+'\n'+list_emoji[i]+ ' '+choice
                }
                reponses= responses+'\n';
                const poll = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(pollStruct[0])
                    .setDescription(reponses);
                    msg.channel.send(poll).then(function (msg) {
                        for (let i = 0; i < pollStruct.length-1; i++) {
                            msg.react(list_emoji[i])
                        }
                      }).catch(function() {
                        //Something
                       });
            }
    }
}