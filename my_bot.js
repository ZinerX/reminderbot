const Discord = require('discord.js')
const client = new Discord.Client()
const cron = require('cron')
const bot_secret_token = "Nzk0MTYzMDI5OTE3ODI3MTE0.X-2z9Q.WyM16r4rJDz6aAqsfTy64YpkXUM";
//794163238425722881
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    let scheduledMessage1 = new cron.CronJob('45 07 14 * * *', () => {
        // This runs every day at 10:00:00
        let channel = client.channels.cache.get('794163238425722881');
        channel.send('You message');
    });
    let scheduledMessage2 = new cron.CronJob('00 00 22 * * *', () => {
        // This runs every day at 10:00:00
        let channel = client.channels.cache.get('794163238425722881');
        channel.send('You message');
    });
    scheduledMessage.start()
});


    client.on('message', message => {
        let channel = client.channels.cache.get('794163238425722881');
        //check if message is the one i want to react to
        if (message.content === 'You message') {
            message.react('👍')
            .then(() => {
            const filter = (reaction) => (reaction.emoji.name === '👍')
            const collector = message.createReactionCollector(filter, { time: 15000 });
            

            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                if (user.tag === 'ZinerX#4827'){channel.send('response received!')}
            });
            
            collector.on('end', (collected, user) => {
                console.log(`Collected ${collected.size} items`);
                if (collected.size === 0) {channel.send('no responses')}
            });
        }) 
    };
})



client.login(bot_secret_token);