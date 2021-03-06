'use strict';

var taunus = require('taunus');
var roomService = require('../../services/room');

function random (req, res, next) {
  taunus.redirect(req, res, '/r/' + roomService.random(req.query.from));
}

module.exports = random;
