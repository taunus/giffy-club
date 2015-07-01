'use strict';

var doc = document;
var tag = 'script';

function loadScript (url) {
  var first = doc.getElementsByTagName(tag)[0];
  var script = doc.createElement(tag);
  script.async = true;
  script.src = url;
  first.parentNode.insertBefore(script, first);
}

module.exports = loadScript;
