var nconf = require('nconf');
var Github = require('./github');
nconf.env();

var GithubRepo = function (token, options) {
  this.token = token;
  this.options = options;
}

function fetchRepo (repo, callback) {
  Github.authenticate({
    type: "token",
    token: nconf.get('GITHUB_TOKEN'),
  });

  Github.repos.get({
    user: nconf.get('GITHUB_LOGIN'),
    repo: repo
  }, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(data);
    }
  });
}

GithubRepo.prototype.handle = function (req, callback) {
  fetchRepo(req.body.text, callback);
};

module.exports = GithubRepo;
