var GitHubApi = require("github");

module.exports = new GitHubApi({
  version: "3.0.0",
  debug: true,
  protocol: "https",
  timeout: 10000,
  headers: {
    "user-agent": "Slack-Slash-Github" // GitHub is happy with a unique user agent
  }
});
