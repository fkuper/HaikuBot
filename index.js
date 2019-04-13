const snoowrap = require("snoowrap");
const Discord = require("discord.js");
const auth = require("./auth.json");

const client = new Discord.Client();

const r = new snoowrap({
  userAgent: auth.redditApiToken.userAgent,
  clientId: auth.redditApiToken.clientId,
  clientSecret: auth.redditApiToken.clientSecret,
  refreshToken: auth.redditApiToken.refreshToken
})


// Gets called after the Discord Bot comes online
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Gets called after a message is typed in the discord server
client.on('message', msg => {
  if (msg.content === '!haiku') {
    r.getSubreddit('YoutubeHaiku')
      .getRandomSubmission()
      .then((submission) => {
        msg.reply(submission.url);
        msg.react('👌');
      });
  }
});
   
client.login(auth.token);