'use strict';

var $ = require('dominus');
var taunus = require('taunus');
var gradual = require('gradual');
var realtime = require('./realtime');

gradual.configure({
  taunus: taunus,
  qs: generateQueryString
});

function generateQueryString () {
  return realtime.id ? { sid: realtime.id } : {};
}

function forms () {
  taunus.on('render', render);
}

function render (container) {
  $('form', container).on('submit', gradual.hijack);
}

module.exports = forms;
