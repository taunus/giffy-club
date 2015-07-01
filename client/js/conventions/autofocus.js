'use strict';

var $ = require('dominus');
var taunus = require('taunus');

function autofocus () {
  taunus.on('change', changed);
}

function changed () {
  $('[autofocus]', taunus.state.container).focus();
}

module.exports = autofocus;
