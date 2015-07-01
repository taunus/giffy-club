'use strict';

var client = require('socket.io-client');
var skyrocket = require('skyrocket');
var gradual = require('gradual');
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

  gradual.on('data', skyrocket.react);
  io.on('/skyrocket/update', skyrocket.react);

  function revolve (type, rooms) {
    io.emit('/skyrocket/' + type, { rooms: rooms });
  }
}

setup.id = null;
module.exports = setup;
