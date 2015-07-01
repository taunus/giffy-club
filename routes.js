'use strict';

var taunus = require('taunus');
var room = require('./controllers/forms/rooms/room');

function setup (app) {
  app.post('/', room);
  app.post('/rooms/:room', room);
}

module.exports = setup;
