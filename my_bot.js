const Discord = require('discord.js')
const client = new Discord.Client()
const cron = require('cron')
const bot_secret_token = "Nzk0MTYzMDI5OTE3ODI3MTE0.X-2z9Q.WyM16r4rJDz6aAqsfTy64YpkXUM";
const msgmorning = 'Good morning! It\'s now time to take your estrogen~ <@234108953297027073>, Click the 👍 emote if you have done so owo'
const msgevening = 'Good evening! It\'s now time to take your estrogen~ <@234108953297027073>, Click the 👍 emote if you have done so owo'
const noresponses = 'No responses, I will remind you in another 15 minutes~ <@234108953297027073> Click the 👍 emote if you have taken your estrogen owo'
//794163238425722881
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    let scheduledMessage1 = new cron.CronJob('00 00 10 * * *', () => {
        // This runs every day at 10:00:00
        let channel = client.channels.cache.get('794163238425722881');
        channel.send(msgevening);
    });
    let scheduledMessage2 = new cron.CronJob('00 00 22 * * *', () => {
        // This runs every day at 22:00:00
        let channel = client.channels.cache.get('794163238425722881');
        channel.send(msgmorning);
    });
    scheduledMessage1.start()
    scheduledMessage2.start()
});


    client.on('message', message => {
        let channel = client.channels.cache.get('794163238425722881');
        //check if message is the one i want to react to
        if (message.content === msgmorning || message.content === msgevening ) {
            message.react('👍')
            .then(() => {
            const filter = (reaction) => (reaction.emoji.name === '👍')
            const collector = message.createReactionCollector(filter, { time: 1800000 });
            

            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                if (user.tag === 'Quibby#3159'){channel.send('Response received! Have a good day/night!')}
            });
            
            collector.on('end', (collected, user) => {
                console.log(`Collected ${collected.size} items`);
                if (collected.size === 0) {channel.send(noresponses)}
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
                if (user.tag === 'ZinerX#4827'){channel.send('response received!')}
            });
            
            collector.on('end', (collected, user) => {
                console.log(`Collected ${collected.size} items`);
                if (collected.size === 0) {channel.send(noresponses)}
            });
        }) 
        }//second if ends here
})



client.login(bot_secret_token);