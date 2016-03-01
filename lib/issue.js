var nconf = require('nconf');
var axios = require('axios');
var Github = require('./github');
nconf.env();

var GithubIssue = function (token, options) {
  this.token = token;
  this.options = options;
}

function fetchIssue (repo, number, response_url) {
  Github.authenticate({
    type: "token",
    token: nconf.get('GITHUB_TOKEN'),
  });

  Github.issues.getRepoIssue({
    user: nconf.get('GITHUB_LOGIN'),
    repo: repo,
    number: number
  }, function (err, data) {
    if (err) {
      axios.post(response_url, {
        "text": "Error: " + JSON.stringify(err, '\n', 4)
      });
    } else {
      var issue = data;
      var text = "<" + issue.html_url + "|" + issue.title ">";
      axios.post(response_url, {
        "text": text
      });
    }
  });
}

GithubIssue.prototype.handle = function (req, handleCb) {
  var params = req.body.text.split('#');
  fetchIssue(params[0], params[1], req.body.response_url);

  handleCb(null, {
    isDelayedResponse: true,
    text: 'Fetching all repos of ' + nconf.get('GITHUB_LOGIN')
  });
};


module.exports = GithubIssue;
