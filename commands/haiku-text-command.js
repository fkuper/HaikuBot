const redditUtil = require('../util/reddit');
const logger = require('../util/logging');

function handle(args, msg) {
  logger.info('Handling !haiku-text command...');
  const joinedArgs = args.join(' ');

  redditUtil.searchSubredditAndGetRandomSubmission('haiku', joinedArgs)
    .then((submission) => {
      if (submission != undefined) {
        msg.reply(submission.title);
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