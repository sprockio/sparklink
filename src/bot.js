const Discord = require('discord.js');
const {
    Client,
    GatewayIntentBits,
    ActivityType
} = require('discord.js');

const sparkRegex = /.*(?<!sprock\.io\/)spark:\/\/([jsc]\/[-0-9A-F]{36}).*/gi;

require('dotenv').config();

const targetDate = new Date('2023-08-01T00:00:00.000-07:00');

function timerString() {

    const now = new Date();
    const diffMs = targetDate - now;
    const diffDays = Math.floor(diffMs / 86400e3);
    const diffHours = Math.floor((diffMs % 86400e3) / 3600e3);
    const diffMinutes = Math.floor((diffMs % 3600000) / 60e3);
    const diffSeconds = Math.floor((diffMs % 60e3) / 1e3);
    const statusText = '';

  if (diffMs < 0) { // countdown
    if (diffDays > 0) { // more than a day
      statusText = `for ${diffDays} more days`;
    } else {
      if (diffHours > 0) {
        statusText = `for ${diffHours} more hours`;
      } else {
        statusText = `for ${diffMinutes} more minutes`;
      }
    }
  } else { // timer
    statusText = "on borrowed time...";
  }

  return statusText
}



const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('ready', () => {
    client.user.setStatus('available')

    function setActivity() {
        client.user.setPresence({
            activities: [{
                name: timerString(),
                type: ActivityType.Streaming,
                url: "https://sprock.io/sparklink/addbot"
            }]
        });

    }

    setActivity();

    setInterval(() => {
        setActivity();
    }, 60e3);


})

client.on('messageCreate', msg => {
    if (!msg.author.bot) {

        if (sparkRegex.test(msg.content)) {

            console.log(msg.content.replace(sparkRegex, '<https://sprock.io/spark://$1>'), msg)

            client.channels.cache.get(msg.channelId).send(msg.content.replace(sparkRegex, '<https://sprock.io/spark://$1>'))
        }
    }
});

client.login(process.env.CLIENT_TOKEN);
