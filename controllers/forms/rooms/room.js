'use strict';

var taunus = require('taunus');

function search (req, res, next) {
  var roomname = req.params.room || 'home';
  var room = '/rooms/' + roomname;
  taunus.redirect(req, res, room + '?q=' + req.body.q);
}

module.exports = search;
