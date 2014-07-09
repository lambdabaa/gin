var _ = require('lodash'),
    rank = require('./rank'),
    suite = require('./suite');

/**
 * Options:
 *
 *   (Boolean) shuffle - whether or not to shuffle the deck.
 */
exports.create = function(options) {
  if (!options) {
    options = {};
  }

  var result = _.flatten(
    suite.map(function(cardSuite) {
      return rank.map(function(cardRank) {
        return { rank: cardRank, suite: cardSuite };
      });
    }),
    true /* isShallow */
  );

  if (options.shuffle) {
    result = _.shuffle(result);
  }

  return result;
};
