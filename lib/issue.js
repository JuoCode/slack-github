var nconf = require('nconf');
var Github = require('./github');
nconf.env();

var GithubIssue = function (token, options) {
  this.token = token;
  this.options = options;
}

function fetchIssue (repo, number, callback) {
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
      callback(err);
    } else {
      callback(data);
    }
  });
}

GithubIssue.prototype.handle = function (req, callback) {
  var params = req.body.text.split('#');
  fetchIssue(params[0], params[1], callback);
};

module.exports = GithubIssue;
