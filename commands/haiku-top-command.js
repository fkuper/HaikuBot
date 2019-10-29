const redditUtil = require('../util/reddit');
const logger = require('../util/logging');

function handle(args, msg) {
  logger.info('Handling !haiku-top command...');

  if (args[0] === 'week' || args[0] === 'month' || args[0] === 'year' || args[0] === 'all') {
    redditUtil.getRandomTopSubmission('YoutubeHaiku', args[0])
      .then((submission) => {
        msg.reply(submission.url);
        msg.react('👌');
      });
  } else {
    redditUtil.getRandomTopSubmission('YoutubeHaiku', 'day')
      .then((submission) => {
        msg.reply(submission.url);
        msg.react('👌');
      });
  }
}

module.exports = {
  handle,
}
