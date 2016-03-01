var nconf = require('nconf');
var Github = require('./github');
nconf.env();

var GithubRepos = function (token, options) {
  this.token = token;
  this.options = options;
}

function fetchRepos (callback) {
  Github.authenticate({
    type: "token",
    token: nconf.get('GITHUB_TOKEN'),
  });

  Github.repos.getAll({ user: nconf.get('GITHUB_LOGIN') }, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(data);
    }
  });
}

GithubRepos.prototype.handle = function (req, callback) {
  fetchRepos(callback);
};

module.exports = GithubRepos;






// or if you want to respond with a Slack attachment
// GH.prototype.handle = function (req, handleCb) {
//   var bodyText = req.body.text;
//   handleCb(null, {
//     text: 'Received commmand with text: ' + bodyText,
//     attachments: [
//       {
//         'text': 'Handling slash command'
//       }
//     ]
//   });
// };

// or if your response is delayed and should post to response_url instead
// GH.prototype.handle = function (req, handleCb) {
//   var bodyText = req.body.text;
//   handleCb(null, {
//     isDelayedResponse: true,
//     text: 'Received commmand with text: ' + bodyText,
//     attachments: [{ 'text': 'Handling slash command' }]
//   });
// };
