const Discord = require('discord.js')
const client = new Discord.Client()
const cron = require('cron')
const bot_secret_token = "Nzk0MTYzMDI5OTE3ODI3MTE0.X-2z9Q.WyM16r4rJDz6aAqsfTy64YpkXUM";
const msgmorning = 'Good morning! It\'s now time to take your estrogen~ <@234108953297027073>, Click the 👍 emote if you have done so owo'
const msgevening = 'Good evening! It\'s now time to take your estrogen~ <@234108953297027073>, Click the 👍 emote if you have done so owo'
const noresponses = 'No responses, I will remind you in another 30 minutes~ <@234108953297027073> Click the 👍 emote if you have taken your estrogen owo'
var cutethingy = ["nope i deny your deny, you're so cute that i am honored to be your personal bot!", "abababa nope you're definitely cute", "yesssssssssssssssssssss you're cute", "see, this cutie blushes, so cute!! >w<"]
var timedecider = 0
//794163238425722881
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    let scheduledMessage1 = new cron.CronJob('00 00 10 * * *', () => {
        // This runs every day at 10:00:00
        let channel = client.channels.cache.get('794163238425722881');
        timedecider = 2
        channel.send(msgevening);
    });
    let scheduledMessage2 = new cron.CronJob('00 00 22 * * *', () => {
        // This runs every day at 22:00:00
        let channel = client.channels.cache.get('794163238425722881');
        timedecider = 1
        channel.send(msgmorning);
    });
    let scheduledMessage3 = new cron.CronJob('00 13 23 * * *', () => {
        // This runs every day at 14:00:00
        let channel = client.channels.cache.get('794163238425722881');
        timedecider = 1
        channel.send("I'm back! Try to deny me once more you cutie <@234108953297027073>");
    });
    scheduledMessage1.start()
    scheduledMessage2.start()
    scheduledMessage3.start()
});


    client.on('message', message => {
        let channel = client.channels.cache.get('794163238425722881');
        if ((message.content.toLowerCase().includes("no") || message.content.toLowerCase().includes("deny")) && (message.author.id === "234108953297027073")) {
            channel.send(cutethingy[Math.floor(Math.random() * 4)])
            const collector = message.createReactionCollector(filter, { time: 1800000 });
            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                if (user.tag === 'Quibby#3159'){channel.send(cutethingy[Math.floor(Math.random() * 4)])}
            })
        };
        //check if message is the one i want to react to
        if (message.content === msgmorning || message.content === msgevening ) {
            message.react('👍')
            .then(() => {
            const filter = (reaction) => (reaction.emoji.name === '👍')
            const collector = message.createReactionCollector(filter, { time: 1800000 });
            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                if (user.tag === 'Quibby#3159' && timedecider === 1){channel.send('Response received! Have a good day cutie!')}
                if (user.tag === 'Quibby#3159' && timedecider === 2){channel.send('Response received! Have a good evening cutie!')}
            });
            
            collector.on('end', (collected, user) => {
                console.log(`Collected ${collected.size} items`);
                if (collected.size === 0) {
                    channel.send(noresponses)
                    .then(() => {
                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error))})
                }
            });
        }) 
    }; //first if ends here
        
        if (message.content === noresponses){
            message.react('👍')
            .then(() => {
            const filter = (reaction) => (reaction.emoji.name === '👍')
            const collector = message.createReactionCollector(filter, { time: 1800000 });
            

            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                if (user.tag === 'Quibby#3159' && timedecider === 1){channel.send('Response received! Have a good day cutie!')}
                if (user.tag === 'Quibby#3159' && timedecider === 2){channel.send('Response received! Have a good evening cutie!')}
            });
            
            collector.on('end', (collected, user) => {
                console.log(`Collected ${collected.size} items`);
                if (collected.size === 0) {
                    channel.send(noresponses)
                    .then(() => {
                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error))})
                }
            });
        }) 
        }//second if ends here
})



client.login(bot_secret_token);