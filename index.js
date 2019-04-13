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


// Gets called after the Discord Bot comes online
discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

// Gets called after a message is typed in the discord server
discordClient.on('message', msg => {
  switch (msg.content) {
    case '!haiku':
      getRandomSubmission('YoutubeHaiku')
        .then((submission) => {
          msg.reply(submission.url);
          msg.react('👌');
        });
      break;
    case '!haiku-top':
      getRandomTopDailySubmission('YoutubeHaiku')
        .then((topPost) => {
          msg.reply(topPost.url);
        });
      break;
  }
});

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
   
discordClient.login(auth.token);