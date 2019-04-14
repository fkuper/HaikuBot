const snoowrap = require("snoowrap");
const Discord = require("discord.js");
const auth = require("./auth.json");

const discordClient = new Discord.Client();
const reddit = new snoowrap({
  userAgent: auth.redditApiToken.userAgent,
  clientId: auth.redditApiToken.clientId,
  clientSecret: auth.redditApiToken.clientSecret,
  refreshToken: auth.redditApiToken.refreshToken
})
const Commands = {randomHaiku: '!haiku',
                  topHaiku: '!haiku-top',
                  help: '!haiku-help'};
Object.freeze(Commands);

// Emitted when the client becomes ready to start working.
discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

// Emitted whenever a message is created.
discordClient.on('message', msg => {
  switch (msg.content) {
    case Commands.randomHaiku:
      getRandomSubmission('YoutubeHaiku')
        .then((submission) => {
          msg.reply(submission.url);
          msg.react('👌');
        });
      break;
    case Commands.topHaiku:
      getRandomTopDailySubmission('YoutubeHaiku')
        .then((topPost) => {
          msg.reply(topPost.url);
          msg.react('👌');
        });
      break;
    case Commands.help:
      msg.author.send('henlo ugly');
      break;
  }
});

// Logs the client in, establishing a websocket connection to Discord.
discordClient.login(auth.token);

function getRandomTopDailySubmission(subreddit) {
  return reddit.getSubreddit(subreddit)
    .getTop({time: 'day'})
    .then((topPosts) => {
      const postIndex = getRandomInt(topPosts.length);
      return topPosts[postIndex];
    });
}

function getRandomSubmission(subreddit) {
  return reddit.getSubreddit(subreddit).getRandomSubmission();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}