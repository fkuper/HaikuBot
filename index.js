const snoowrap = require("snoowrap");
const Discord = require("discord.js");
const token = require("./auth.json").token;

const client = new Discord.Client();

// Gets called after the Discord Bot comes online
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Gets called after a message is typed in the discord server
client.on('message', msg => {
  if (msg.content === '!haiku') {
    msg.reply('OMEGALUL');
    msg.react('👌');
  }
});
   
client.login(token);