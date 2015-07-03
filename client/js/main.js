'use strict';

var $ = require('dominus');
var taunus = require('taunus');
var wiring = require('../../.bin/wiring');
var realtime = require('./conventions/realtime');
var analyticsService = require('./services/google-analytics');
var main = $.findOne('main');

require('./conventions/forms')();
require('./conventions/realtime')();
require('./conventions/autofocus')();
require('./thirdparty/google-analytics')();

function track () {
  analyticsService.pageView();
}

function generateQueryString () {
  return realtime.id ? { sid: realtime.id } : {};
}

taunus.on('change', track);
taunus.mount(main, wiring, {
  qs: generateQueryString
});
