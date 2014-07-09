var _ = require('lodash'),
    card = require('./card'),
    deck = require('./deck'),
    rank = require('./rank');

exports.initialize = function() {
  var result = {};
  var stockPile = result.stockPile = deck.create({ shuffle: true });
  var discardPile = result.discardPile = [];
  var playerHand = result.playerHand = [];
  var opponentHand = result.opponentHand = [];

  [
    playerHand,
    opponentHand
  ].forEach(function(hand) {
    for (var i = 0; i < 10; i++) {
      hand.push(stockPile.shift());
    }

    hand.sort(card.compare);
  });

  discardPile.unshift(stockPile.shift());

  result.playerMelds = exports.getMelds(result, { player: true });
  return result;
};

/**
 * Options:
 *
 *   (Boolean) discard - whether drawing from discard pile.
 *   (Boolean) player - whether human player is active.
 */
exports.draw = function(game, options) {
  var pile = options.discard ? game.discardPile : game.stockPile;
  var hand = options.player ? game.playerHand : game.opponentHand;
  hand.push(pile.shift());
};

/**
 * Options:
 *
 *   (Number) index - index of card to discard.
 *   (Boolean) player - whether human player is active.
 */
exports.discard = function(game, options) {
  var hand = options.player ? game.playerHand : game.opponentHand;
  var removed = hand.splice(options.index, 1);
  game.discardPile.unshift(removed[0]);
  hand.sort(card.compare);
};

/**
 * Options:
 *
 *   (Boolean) player - whether human player is active.
 */
exports.getMelds = function(game, options) {
  var hand = options.player ? game.playerHand : game.opponentHand;

  // Rank melds.
  var rankToCount = _.countBy(hand, function(handCard) {
    return handCard.rank;
  });

  var rankMelds = [];
  Object.keys(rankToCount).forEach(function(rank) {
    var count = rankToCount[rank];
    if (count === 3) {
      rankMelds.push(
        hand.filter(function(handCard) {
          return handCard.rank === rank;
        })
      );
    } else if (count === 4) {
      // [[C, D, H], [C, D, S], [C, H, S], [D, H, S], [C, D, H, S]]
      var clubs = { rank: rank, suite: 'clubs' };
      var diamonds = { rank: rank, suite: 'diamonds' };
      var hearts = { rank: rank, suite: 'hearts' };
      var spades = { rank: rank, suite: 'spades' };
      rankMelds.push([clubs, diamonds, hearts]);
      rankMelds.push([clubs, diamonds, spades]);
      rankMelds.push([clubs, hearts, diamonds]);
      rankMelds.push([diamonds, hearts, spades]);
      rankMelds.push([clubs, diamonds, hearts, spades]);
    }
  });

  // Suite melds.
  var suiteMelds = [];
  var suiteSorted = _.clone(hand, true /* isDeep */).sort(card.suiteCompare);
  var curr = [], prev;
  suiteSorted.forEach(function(handCard) {
    if (!prev) {
      prev = handCard;
      return curr.push(handCard);
    }

    if (prev.suite !== handCard.suite /* suite change */ ||
        rank.indexOf(handCard.rank) !== rank.indexOf(prev.rank) + 1 /* non-consecutive */) {
      if (curr.length >= 3) {
        suiteMelds.push(curr);
      }

      curr = [];
    }

    prev = handCard;
    curr.push(handCard);
  });

  // suiteMelds now has all of the longest runs,
  // but we need to also include the shorter ones.
  suiteMelds.forEach(function(meld) {
    for (var k = 3; k < meld.length; k++) {
      for (var i = 0; i < meld.length - k; i++) {
        // Add the meld of length k starting at index i
        suiteMelds.push(meld.slice(i, k));
      }
    }
  });

  return rankMelds.concat(suiteMelds);
};

exports.checkForBigGin = function(game, options) {
  options.big = true;
  return exports.checkForGin(game, options);
};

/**
 * Options:
 *
 *   (Boolean) big - whether should check for big gin.
 *   (Boolean) player - whether human player is active.
 */
exports.checkForGin = function(game, options) {
  var melds = options.player ? game.playerMelds : game.opponentMelds;
  var meldPowerset = powerset(melds);
  return meldPowerset.some(function(meldSet) {
    meldSet = _.unique(meldSet, false /* isSorted */, function(meldCard) {
      return card.stringify(meldCard);
    });

    var len = meldSet.length;
    if (len < 10) {
      // Gin needs at least 10 cards.
      return false;
    }
    if (options.big && len < 11) {
      // Big gin needs 11 cards.
      return false;
    }

    return true;
  });
};

/**
 * The owls are not what they seem.
 */
function powerset(arr) {
  var result = [[]];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0, len = result.length; j < len; j++) {
      result.push(result[j].concat(arr[i]));
    }
  }

  return result;
}
