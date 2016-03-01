
var GH = function (token, options) {
  this.token = token;
  this.options = options;
}

GH.prototype.handle = function (req, handleCb) {
  var bodyText = req.body.text;
  handleCb(null, 'Received commmand with text: ' + bodyText);
};

module.exports = GH;

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
