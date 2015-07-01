'use strict';

var request = require('request');
var giphyKey = process.env.GIPHY_KEY || 'dc6zaTOxFJmzC';
var giphyUrl = 'http://api.giphy.com/v1/gifs/search';

function query (options, done) {
  var options = {
    headers: {
      Accept: 'application/json'
    },
    url: giphyUrl,
    qs: {
      q: options.query,
      api_key: giphyKey,
      limit: 4
    },
    json: true
  };

  request(options, response);

  function response (err, res, body) {
    done(err, body && body.data || []);
  }
}
module.exports = {
  query: query
};
