'use strict';

var $ = require('dominus');
var taunus = require('taunus');
var skyrocket = require('skyrocket');

function roomController (viewModel, container, route) {
  var rocket = skyrocket.scope(container, viewModel);
  var roomname = viewModel.room;
  var room = '/r/' + roomname;

  taunus.navigate(room, { dry: true });
  rocket.on(room, reaction);

  function reaction (update) {
    var gifs = $.findOne('.gf-container');
    var history = $.findOne('.mg-container');

    taunus.state.model.title = update.model.title;
    taunus.partial(gifs, 'rooms/gifs', viewModel);
    taunus.partial(history, 'rooms/history', viewModel);
    taunus.navigate(room, { dry: true });
  }
}

module.exports = roomController;
