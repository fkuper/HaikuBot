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
const Commands = { randomHaiku: '!haiku', topHaiku: '!haiku-top', search: '!haiku-search', help: '!haiku-help' };
Object.freeze(Commands);

discordClient.login(auth.token);

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

discordClient.on('message', msg => {

  const args = msg.content.split(' ');
  const command = args.shift().toLowerCase();
  const joinedArgs = args.join(' ');

  switch (command) {
    case Commands.randomHaiku:
      getRandomSubmission('YoutubeHaiku')
        .then((submission) => {
          msg.reply(submission.url);
          msg.react('👌');
        });
      break;
    case Commands.topHaiku:
      if (args[0] === 'hour' || args[0] === 'week' || args[0] === 'month' || args[0] === 'year' || args[0] === 'all') {
        getRandomTopSubmission('YoutubeHaiku', args[0])
          .then((submission) => {
            msg.reply(submission.url);
            msg.react('👌');
          });
      } else {
        getRandomTopSubmission('YoutubeHaiku', 'day')
          .then((submission) => {
            msg.reply(submission.url);
            msg.react('👌');
          });
      }
      break;
    case Commands.search:
      searchSubredditAndGetRandomSubmission('YoutubeHaiku', joinedArgs)
        .then((submission) => {
          msg.reply(submission.url);
          msg.react('👌');
        });
      break;
    case Commands.help:
      msg.author.send(helpText);
      break;
  }
});

function getRandomSubmission(subreddit) {
  return reddit.getSubreddit(subreddit).getRandomSubmission();
}

function getRandomTopSubmission(subreddit, time) {
  return reddit.getSubreddit(subreddit)
    .getTop({ time: time })
    .then((topPosts) => {
      const postIndex = getRandomInt(topPosts.length);
      return topPosts[postIndex];
    });
}

function searchSubredditAndGetRandomSubmission(subreddit, searchString) {
  return reddit.getSubreddit(subreddit)
    .search({ query: searchString })
    .then((searchResults) => {
      const postIndex = getRandomInt(searchResults.length);
      return searchResults[postIndex];
    });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const helpText =
  `Hey there!

This simple bot provides you with funny or interesting short videos from reddit.com/r/YoutubeHaiku.

The definition for 'Youtube Haiku' from the subreddit itself is as follows:
'Youtube Haiku: Any almost poetic video under 14 seconds. Don't ask me why 14 seconds;
it's just a number I have learned from experience.
Videos can still be poetic after 15 or longer, but no longer than 30 seconds.'

To use the bot type one of the following commands into your Discord server:
\`\`\`markdown
'!haiku' will prompt the bot to reply with a random video from /r/YoutubeHaiku.
'!haiku-top' will get you a random video out of the top videos of the day.
'!haiku-search [your text]' will let you search /r/YoutubeHaiku and get a random video from the results.
\`\`\``;