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
const Commands = { randomHaiku: '!haiku', topHaiku: '!haiku-top', help: '!haiku-help' };
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
      searchSubredditAndGetRandomSubmission('YoutubeHaiku', joinedArgs)
        .then((submission) => {
          if (submission != undefined) {
            msg.reply(submission.url);
            msg.react('👌');
          } else {
            msg.reply("Could not find any haikus using your search terms.");
            msg.react('👎');
          } 
        });
      break;
    case Commands.topHaiku:
      if (args[0] === 'week' || args[0] === 'month' || args[0] === 'year' || args[0] === 'all') {
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
    case Commands.help:
      msg.author.send(helpText);
      break;
  }
});

function getRandomTopSubmission(subreddit, time) {
  return reddit.getSubreddit(subreddit)
    .getTop({ time: time })
    .then((topPosts) => {
      const postIndex = getRandomInt(topPosts.length);
      return topPosts[postIndex];
    });
}

function searchSubredditAndGetRandomSubmission(subreddit, searchString) {
  if (searchString == '') {
    return reddit.getSubreddit(subreddit).getRandomSubmission();
  } else {
    return reddit.getSubreddit(subreddit)
      .search({ query: searchString })
      .then((searchResults) => {
        const postIndex = getRandomInt(searchResults.length);
        return searchResults[postIndex];
      });
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const helpText =
`Hey there!

This simple bot provides you with funny or interesting short videos from https://reddit.com/r/YoutubeHaiku.

The definition for 'Youtube Haiku' from the subreddit itself is as follows:
'Youtube Haiku: Any almost poetic video under 14 seconds. Don't ask me why 14 seconds;
it's just a number I have learned from experience.
Videos can still be poetic after 15 or longer, but no longer than 30 seconds.'

To use the bot type one of the following commands into your Discord server:
\`\`\`markdown
'!haiku':
This will prompt the bot to reply with a random video from /r/YoutubeHaiku.

'!haiku [search text]':
This will get a random video related to your search topic.

'!haiku-top':
This will get you a random video out of the top videos of the day.

'!haiku-top [time interval]':
Get a random top video of the: 'week', 'month', 'year' or of 'all' time.

'!haiku-help':
Gets you this lovely help dialogue!
\`\`\`
`;