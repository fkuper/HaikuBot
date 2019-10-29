const Discord = require("discord.js");
const auth = require("./auth.json");
const logger = require('./util/logging');

const helpCommand = require('./commands/help-command');
const haikuTopCommand = require('./commands/haiku-top-command');
const haikuRandomCommand = require('./commands/haiku-random-command');
const haikuTextCommand = require('./commands/haiku-text-command');

const discordClient = new Discord.Client();

const Commands = { 
  randomHaiku: '!haiku', 
  topHaiku: '!haiku-top',
  textHaiku: '!haiku-text',
  help: '!haiku-help',
};

Object.freeze(Commands);

discordClient.login(auth.token);

discordClient.on('ready', () => {
  logger.info(`Logged in as ${discordClient.user.tag}!`);
});

discordClient.on('disconnect', () => {
  logger.warn('Disconnected!');
});

discordClient.on('message', msg => {
  // block messages by the bot itself
  if (msg.author.tag === discordClient.user.tag) {
    return;
  }
  
  logger.debug('Received message...');
  
  const args = msg.content.split(' ');
  const command = args.shift().toLowerCase();

  switch (command) {
    case Commands.randomHaiku:
      haikuRandomCommand.handle(args, msg);
      break;
    case Commands.topHaiku:
      haikuTopCommand.handle(args, msg);
      break;
    case Commands.textHaiku:
      haikuTextCommand.handle(args, msg);
      break;
    case Commands.help:
      helpCommand.handle(args, msg);
      break;
  }
});