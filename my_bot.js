/* eslint-disable max-len */
const Discord = require('discord.js');

const client = new Discord.Client({ partials: ['CHANNEL'] });
const cron = require('cron');

// IMPORT RESPONSES
const {
  msgmorning, msgevening, noresponses, cutethingy, cutereminder, responseday, responsenight, hungry,
} = require('./responses');

const botSecretToken = 'Nzk0MTYzMDI5OTE3ODI3MTE0.X-2z9Q.WyM16r4rJDz6aAqsfTy64YpkXUM';
let timedecider = 0;
let channel;
var feeded = false
const prefix = '!'

client.on('ready', async () => {
  channel = client.channels.cache.get('794163238425722881');
  console.log(`Connected as ${client.user.tag}`);
  const scheduledMessage1 = new cron.CronJob('00 00 10 * * *', () => {
    // This runs every day at 10:00:00
    timedecider = 2;
    channel.send(msgevening);
  });
  const scheduledMessage2 = new cron.CronJob('00 00 22 * * *', () => {
    // This runs every day at 22:00:00
    timedecider = 1;
    channel.send(msgmorning);
  });
  const scheduledMessage3 = new cron.CronJob('00 06 01 * * *', () => {
    // This runs every day at 14:00:00
    timedecider = 1;
    channel.send(cutereminder);
  });
  let hungrymsg = new cron.CronJob('00 00 23 * * *', () => {
    // This runs every day at 14:00:00
    channel.send(hungry)
    feeded = false
  });
  scheduledMessage1.start();
  scheduledMessage2.start();
  scheduledMessage3.start();
  hungrymsg.start();
});

const filter = (reaction) => (reaction.emoji.name === '👍');

const checkMessageContains = () => {
  channel.send(cutethingy[Math.floor(Math.random() * 4)])
    .then((newMessage) => {
      const collector = newMessage.createReactionCollector(filter, { time: 1800000 });
      collector.on('collect', (reaction, user) => {
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        checkMessageContains();
      });
      collector.on('end', (collected, user) => {
        console.log(`Collected ${collected.size} items`);
      });
    });
};

client.on('message', (message) => {
  if (message.channel.id !== '792053531384610860') return;
  if (message.author.bot) return;
  if (message.content === cutereminder) {
    const collector = message.createReactionCollector(filter, { time: 1800000 });
    collector.on('collect', (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
      channel.send(cutethingy[Math.floor(Math.random() * 4)]);
    });
    collector.on('end', (collected, user) => {
      console.log(`Collected ${collected.size} items`);
    });
  }

  if (message.content === cutethingy[0] || message.content === cutethingy[1] || message.content === cutethingy[2] || message.content === cutethingy[3]) {
    const collector = message.createReactionCollector(filter, { time: 1800000 });
    collector.on('collect', (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
      channel.send(cutethingy[Math.floor(Math.random() * 4)]);
    });
    collector.on('end', (collected, user) => {
      console.log(`Collected ${collected.size} items`);
    });
  }

  // FUNCTION LOOP HERE
  if ((message.content.toLowerCase().includes('no') || message.content.toLowerCase().includes('deny') || message.content.toLowerCase().includes('false') || message.content.toLowerCase().includes("n't") || message.content.toLowerCase().includes(':x:')) && (message.author.id === "234108953297027073") ) {
    checkMessageContains();
  }

  // check if message is the one i want to react to
  if (message.content === msgmorning || message.content === msgevening) {
    message.react('👍')
    .then((newMessage) => {
      const collector = newMessage.createReactionCollector(filter, { time: 1800000 });
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
      const collector = newMessage.createReactionCollector(filter, { time: 1800000 });
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

  if ((message.content.startsWith(prefix + "poke")) && (message.author.id === "234108953297027073")){
    message.reply("myon!! who poked me!!! *looks around* <@234108953297027073> was that you???")
  }

  if ((message.content.startsWith(prefix + "feed")) && (message.author.id === "234108953297027073")){
    if (feeded = false) {
      message.reply("omnomnom it's yum! thanks for feeding nya~")
      .then(() => feeded = true)
    }
    else message.reply("thanks but im full, i'll let you know when im hungry again!!! >w<")      
  }

});

client.login(botSecretToken);
