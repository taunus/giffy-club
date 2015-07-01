'use strict';

var $ = require('dominus');
var taunus = require('taunus');
var wiring = require('../../.bin/wiring');
var analyticsService = require('./services/google-analytics');
var main = $.findOne('main');

require('./conventions/forms')();
require('./conventions/realtime')();
require('./thirdparty/google-analytics')();

function track () {
  analyticsService.pageView();
}

taunus.on('change', track);
taunus.mount(main, wiring);
