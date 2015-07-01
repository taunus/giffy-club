'use strict';

var _ = require('lodash');

function toModel (giphyItem) {
  return _.pick(giphyItem.images.downsized, ['url', 'width', 'height']);
}

module.exports = {
  toModel: toModel
};
