'use strict';

var taunus = require('taunus');
var skyrocket = require('skyrocket');
var client = require('socket.io-client');
var io = client('');

io.on('connect', connect);
io.on('disconnect', disconnect);

function connect () {
  setup.id = io.io.engine.id;
}

function disconnect () {
  setup.id = null;
}

function setup () {
  skyrocket.configure({
    revolve: revolve
  });

  taunus.gradual.on('data', skyrocket.react);
  io.on('/skyrocket/update', skyrocket.react);

  function revolve (type, rooms) {
    io.emit('/skyrocket/' + type, { rooms: rooms });
  }
}

setup.id = null;
module.exports = setup;
