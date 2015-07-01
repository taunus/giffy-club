'use strict';

var util = require('util');
var titlecase = require('titlecase');
var roomService = require('../../services/room');
var socket = require('../../realtime');

function room (req, res, next) {
  var roomname = req.params.room || 'home';
  var room = '/r/' + roomname;
  var query = req.query.q;

  roomService.query({ room: roomname, query: query }, response);

  function response (err, result) {
    if (err) {
      next(err); return;
    }

    var terms = roomService.getTerms(roomname) || query;
    var searching = terms ? util.format('“%s” \u2014 ', terms) : '';
    var title = util.format('%s%s', searching, titlecase(roomname));
    var model = {
      title: title,
      room: roomname,
      terms: terms,
      gifs: result.gifs,
      history: result.history.reverse()
    };

    res.viewModel = {
      model: model
    };

    socket.io.to(room).emit('/skyrocket/update', {
      updates: [{
        rooms: [room],
        model: model
      }]
    });
    next();
  }
}

module.exports = room;
