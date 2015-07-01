'use strict';

var $ = require('dominus');
var taunus = require('taunus');
var skyrocket = require('skyrocket');
var main = $.findOne('main');

function roomController (viewModel, container, route) {
  var rocket = skyrocket.scope(container, viewModel);
  var roomname = viewModel.room;
  var room = '/rooms/' + roomname;

  taunus.navigate(room, { dry: true });
  rocket.on(room, reaction);

  function reaction (update) {
    taunus.state.model.title = update.model.title;
    taunus.partial(main, 'rooms/room', viewModel);
    taunus.navigate(room, { dry: true });
  }
}

module.exports = roomController;
