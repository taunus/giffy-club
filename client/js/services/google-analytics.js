'use strict';

function pageView () {
  var ga = global.ga;
  if (ga === void 0) {
    return;
  }
  ga('send', 'pageview');
}

module.exports = {
  pageView: pageView
};
