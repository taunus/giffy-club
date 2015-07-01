'use strict';

var loadScript = require('../lib/loadScript');
var property = 'UA-35043128-9';
var g = global;

function load () {
  loadScript('//www.google-analytics.com/analytics.js');

  g.GoogleAnalyticsObject = 'ga';

  var ga = g.ga = function () {
    (ga.q = ga.q || []).push(arguments);
  };
  ga.l = 1 * new Date();
  ga('create', property, 'auto');
}

module.exports = load;
