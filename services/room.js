'use strict';

var _ = require('lodash');
var debug = require('debug')('me');
var randomWord = require('random-word');
var giphyService = require('./giphy');
var giphyModelService = require('./giphyModel');
var rooms = [];
var queries = [];

function query (options, done) {
  var cachedRoom = _.find(rooms, { room: options.room });
  var cachedQuery = _.find(queries, { query: options.query });

  if (!options.query) {
    if (cachedRoom) {
      debug('No query, cached room', options.room);
      store(cachedRoom.gifs);
    } else {
      debug('No query, new room', options.room);
      store([]);
    }
  } else {
    if (cachedQuery) {
      debug('Cached query', options.query);
      store(cachedQuery.gifs);
    } else {
      debug('Uncached query', options.query);
      giphyService.query(options, read);
    }
  }

  function read (err, result) {
    if (err) {
      done(err); return;
    }
    var gifs = result.map(giphyModelService.toModel);
    store(gifs);
  }

  function store (gifs) {
    var newRoom;
    if (options.query) {
      if (cachedRoom) {
        updateRoom();
      } else {
        saveRoom();
      }
    }
    if (cachedQuery) {
      updateQuery();
    } else {
      saveQuery();
    }
    var room = cachedRoom || { history: [], gifs: [] };
    done(null, {
      gifs: room.gifs,
      history: room.history
    });

    function updateRoom () {
      debug('Updating cached room', options.room, options.query);
      if (cachedRoom.history[cachedRoom.history.length - 1] !== options.query) {
        cachedRoom.history.push(options.query);
      }
      if (gifs.length) {
        cachedRoom.query = options.query;
        cachedRoom.gifs = gifs;
      }
    }
    function saveRoom () {
      debug('Caching room', options.room, options.query);
      cachedRoom = {
        room: options.room,
        query: options.query,
        gifs: gifs,
        history: [options.query]
      };
      rooms.push(cachedRoom);
    }
    function updateQuery () {
      debug('Updating cached query', options.query);
      cachedQuery.gifs = gifs;
    }
    function saveQuery () {
      debug('Caching query', options.query);
      queries.push({ query: options.query, gifs: gifs });
    }
  }
}

function getTerms (room) {
  var cachedRoom = _.find(rooms, { room: room });
  if (cachedRoom) {
    return cachedRoom.query;
  }
  return null;
}

function random () {
  var room = rooms[Math.floor(Math.random() * rooms.length)];
  return room ? room.room : 'home';
}

function create () {
  var room;
  do {
    room = randomWord();
  } while (_.find(rooms, { room: room }));
  return room;
}

module.exports = {
  query: query,
  getTerms: getTerms,
  random: random,
  create: create
};
