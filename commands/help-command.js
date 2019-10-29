const logger = require('../util/logging');

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

function handle(args, msg) {
  logger.info('Handling !haiku-help command...');
  msg.author.send(helpText);
}

module.exports = {
  handle,
}