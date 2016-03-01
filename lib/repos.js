var nconf = require('nconf');
var axios = require('axios');
var Github = require('./github');
nconf.env();

var GithubRepos = function (token, options) {
  this.token = token;
  this.options = options;
}

function fetchRepos (response_url) {
  Github.authenticate({
    type: "token",
    token: nconf.get('GITHUB_TOKEN'),
  });

  Github.repos.getAll({ user: nconf.get('GITHUB_LOGIN') }, function (err, data) {
    if (err) {
      axios.post(response_url, {
        "text": "Error: " + JSON.stringify(err, '\n', 4),
        "attachments": [
          { "text":"Partly cloudy today and tomorrow" }
        ]
      });
    } else {
      axios.post(response_url, {
        "text": JSON.stringify(data, '\n', 4),
        "attachments": [
          { "text":"Partly cloudy today and tomorrow" }
        ]
      });
    }
  });
}

// GithubRepos.prototype.handle = function (req, callback) {
//   fetchRepos(callback);
// };
GithubRepos.prototype.handle = function (req, handleCb) {
  var bodyText = req.body.text;
  fetchRepos(req.body.response_url);
  handleCb(null, {
    isDelayedResponse: true,
    text: 'Fetching all repos of ' + nconf.get('GITHUB_LOGIN'),
    attachments: [{ 'text': 'Handling slash command' }]
  });
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
