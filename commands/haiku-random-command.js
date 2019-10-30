const redditUtil = require('../util/reddit');
const logger = require('../util/logging');

function handle(args, msg) {
  logger.info('Handling !haiku command...');
  const joinedArgs = args.join(' ');

  redditUtil.searchSubredditAndGetRandomSubmission('YoutubeHaiku', joinedArgs)
    .then((submission) => {
      if (submission != undefined) {
        msg.reply(submission.url);
        msg.react('👌');
      } else {
        msg.reply("Could not find any haikus using your search terms.");
        msg.react('👎');
      } 
    });
}

module.exports = {
  handle,
}