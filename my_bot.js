/* eslint-disable max-len */
const Discord = require('discord.js');

const client = new Discord.Client({ partials: ['CHANNEL'] });
const cron = require('cron');

// IMPORT RESPONSES
const {
  msgmorning, msgevening, noresponses, cutethingy, cutereminder, responseday, responsenight, hungry,
} = require('./responses');

const botSecretToken = '';
let timedecider = 0;
let channel;
var feeded = 0
var poked = 0
const prefix = '!'

client.on('ready', async () => {
  channel = client.channels.cache.get('794163238425722881');
  console.log(`Connected as ${client.user.tag}`);
  const scheduledMessage1 = new cron.CronJob('00 00 09 * * *', () => {
    // This runs every day at 10:00:00
    timedecider = 2;
    channel.send(msgevening);
  });
  const scheduledMessage2 = new cron.CronJob('00 00 21 * * *', () => {
    // This runs every day at 22:00:00
    timedecider = 1;
    channel.send(msgmorning);
  });
  const scheduledMessage3 = new cron.CronJob('00 00 13 * * *', () => {
    // This runs every day at 14:00:00
    timedecider = 1;
    channel.send(cutereminder);
  });
  const hungrymsg = new cron.CronJob('00 00 22 * * *', () => {
    // This runs every day at 23:00:00
    feeded = 0;
    channel.send(hungry);
  });
  scheduledMessage1.start();
  scheduledMessage2.start();
  scheduledMessage3.start();
  hungrymsg.start();
});

const filter1 = (reaction) => (reaction.emoji.name === '👍');
const filter2 = (reaction) => (reaction.message.author.id != '234108953297027073');

const checkMessageContains = () => {
  if (poked === 0){
    channel.send(cutethingy[Math.floor(Math.random() * 4)])
    .then((newMessage) => {
      const collector = newMessage.createReactionCollector(filter2, { time: 1800000 });
      collector.on('collect', (reaction, user) => {
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        checkMessageContains();
       });
       collector.on('end', (collected, user) => {
        console.log(`Collected ${collected.size} items`);
      });
    });
  }
  else {
    channel.send('n--nya! I know it\'s you!!! hmph!! But you\'re cute so I don\'t mind~ >w<')
    .then(() => poked = 0)
  }
};

client.on('message', (message) => {
  channel = client.channels.cache.get('794163238425722881')
  if (message.channel.id !== '794163238425722881') return;
  if (message.content === cutereminder) {
    const collector = message.createReactionCollector(filter2, { time: 1800000 });
    collector.on('collect', (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
      channel.send(cutethingy[Math.floor(Math.random() * 4)]);
    });
    collector.on('end', (collected, user) => {
      console.log(`Collected ${collected.size} items`);
    });
  }

  if (message.content === cutethingy[0] || message.content === cutethingy[1] || message.content === cutethingy[2] || message.content === cutethingy[3]) {
    const collector = message.createReactionCollector(filter2, { time: 1800000 });
    collector.on('collect', (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
      channel.send(cutethingy[Math.floor(Math.random() * 4)]);
    });
    collector.on('end', (collected, user) => {
      console.log(`Collected ${collected.size} items`);
    });
  }

  // FUNCTION LOOP HERE
  if ((message.content.toLowerCase().includes('no') || message.content.toLowerCase().includes('deny') || message.content.toLowerCase().includes('false') || message.content.toLowerCase().includes("n't") || message.content.toLowerCase().includes('x') || message.content.toLowerCase().includes('n o')) && (message.author.id === "234108953297027073")) {
    checkMessageContains();
  }

  // check if message is the one i want to react to
  if (message.content === msgmorning || message.content === msgevening) {
    message.react('👍')
    .then((newMessage) => {
      const collector = newMessage.createReactionCollector(filter1, { time: 1800000 });
      collector.on('collect', (reaction, user) => {
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        if (user.tag === 'Quibby#3159' && timedecider === 1) { channel.send(responseday); }
        if (user.tag === 'Quibby#3159' && timedecider === 2) { channel.send(responsenight); }
      });
      collector.on('end', (collected, user) => {
        console.log(`Collected ${collected.size} items`);
        if (collected.size === 0) {
           channel.send(noresponses)
          .then(() => {
            message.reactions.removeAll().catch((error) => console.error('Failed to clear reactions: ', error));
          });
        }
      });
    });
  } // first if ends here

  if (message.content === noresponses) {
    message.react('👍')
    .then((newMessage) => {
      const collector = newMessage.createReactionCollector(filter1, { time: 1800000 });
      collector.on('collect', (reaction, user) => {
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        if (user.tag === 'Quibby#3159' && timedecider === 1) { channel.send(responseday); }
        if (user.tag === 'Quibby#3159' && timedecider === 2) { channel.send(responsenight); }
      });
      collector.on('end', (collected, user) => {
        console.log(`Collected ${collected.size} items`);
        if (collected.size === 0) {
          channel.send(noresponses)
          .then(() => {
            message.reactions.removeAll().catch((error) => console.error('Failed to clear reactions: ', error));
          });
        }
      });
    });
  }// second if ends here

  //commands grouping
  if ((message.content.startsWith(prefix + "poke")) && (message.author.id === "234108953297027073")){
    channel.send("myon!! who poked me!!! *looks around* <@234108953297027073> was that you???")
    poked = 1
  }

  if ((message.content.startsWith(prefix + "feed")) && (message.author.id === "234108953297027073")){
    if (feeded === 0) {
      message.reply("omnomnom it's yum! thanks for feeding nya~")
      .then(() => feeded = 1)
    }
    else message.reply("thanks but im full, i'll let you know when im hungry again!!! >w<")      
  }

  if ((message.content.startsWith(prefix + "pat")) && (message.author.id === "234108953297027073")){
    channel.send("*climb on your lap and starts rolling* abababa your pats are so comfy~") 
  }  
  //commands grouping end
});

client.login(botSecretToken);
