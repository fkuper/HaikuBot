const auth = require("../auth.json");
const snoowrap = require("snoowrap");
const mathUtil = require('./math');

const reddit = new snoowrap({
  userAgent: auth.redditApiToken.userAgent,
  clientId: auth.redditApiToken.clientId,
  clientSecret: auth.redditApiToken.clientSecret,
  refreshToken: auth.redditApiToken.refreshToken
})

function getRandomTopSubmission(subreddit, time) {
  return reddit.getSubreddit(subreddit)
    .getTop({ time: time })
    .then((topPosts) => {
      const postIndex = mathUtil.getRandomInt(topPosts.length);
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
        const postIndex = mathUtil.getRandomInt(searchResults.length);
        return searchResults[postIndex];
      });
  }
}

module.exports = {
  getRandomTopSubmission,
  searchSubredditAndGetRandomSubmission,
}