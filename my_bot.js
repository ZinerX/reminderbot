const Discord = require('discord.js')
const client = new Discord.Client()
const cron = require('cron')
const bot_secret_token = "Nzk0MTYzMDI5OTE3ODI3MTE0.X-2z9Q.WyM16r4rJDz6aAqsfTy64YpkXUM";
const msgmorning = 'Good morning <@234108953297027073>! Can I have a pat myon? A morning pat would make me happy!'
const msgevening = 'Good evening <@234108953297027073>! How was your day? If you are tired, take a rest~'
const responseday = 'myon~~~~ have a good day cutie!'
const responsenight = 'ababa you are cute! Have a good evening cutie!'
const prefix = '!'
//const validcommand = (message, cmd) => message.content.toLowerCase().startsWith(prefix + cmd)
let channel = client.channels.cache.get('794163238425722881');
const noresponses = 'ababababa notice me myonmyonmyon~'
var cutethingy = ["nope i deny your deny, you're so cute that i am honored to be your personal bot!", "abababa nope you're definitely cute", "yesssssssssssssssssssss you're cute", "see, this cutie blushes, so cute!! >w<"]
var timedecider = 0
var feeded = false
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
        feed = false
        channel.send(msgmorning);
    });
    let scheduledMessage3 = new cron.CronJob('00 00 14 * * *', () => {
        // This runs every day at 14:00:00
        let channel = client.channels.cache.get('794163238425722881');
        channel.send('daily reminder!!! attention all of you!!! i am here to say that <@234108953297027073> is cute! very cute!!!')
        
    });
    let hungrymsg = new cron.CronJob('00 00 23 * * *', () => {
        // This runs every day at 14:00:00
        let channel = client.channels.cache.get('794163238425722881');
        channel.send('<@234108953297027073> rawrrrr i am hungryyyyy feed me gasolineeeeeee!!!!!!!!!')
        feeded = false
        
    });
    scheduledMessage1.start()
    scheduledMessage2.start()
    scheduledMessage3.start()
    hungrymsg.start()
});


    client.on('message', message => {
        let channel = client.channels.cache.get('794163238425722881');
        if ((message.content.startsWith(prefix + "poke")) && (message.author.id === "234108953297027073")){
            message.reply("myon!! who poked me!!! *looks around* <@234108953297027073> was that you???")
        }
        if ((message.content.startsWith(prefix + "feed")) && (message.author.id === "234108953297027073")){
                if (feeded = false) {
                    message.reply("omnomnom it's yum! thanks for feeding nya~")
                    feeded = true
                }
                else{
                    message.reply("thanks but im full, i'll let you know when im hungry again!!! >w<") 
                }
        }

        if ((message.content.toLowerCase().includes("no") || message.content.toLowerCase().includes("deny") || message.content.toLowerCase().includes("false") || message.content.toLowerCase().includes("n't")) && (message.author.id === "234108953297027073")) {
            channel.send(cutethingy[Math.floor(Math.random() * 4)])
        };
        //check if message is the one i want to react to
        if (message.content === msgmorning || message.content === msgevening ) {
            message.react('👍')
            .then(() => {
            const filter = (reaction) => (reaction.emoji.name === '👍')
            const collector = message.createReactionCollector(filter, { time: 1800000 });
            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                if (user.tag === 'Quibby#3159' && timedecider === 1){channel.send(responseday)}
                if (user.tag === 'Quibby#3159' && timedecider === 2){channel.send(responsenight)}
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
                if (user.tag === 'Quibby#3159' && timedecider === 1){channel.send(responseday)}
                if (user.tag === 'Quibby#3159' && timedecider === 2){channel.send(responsenight)}
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