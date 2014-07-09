var rank = require('./rank'),
    suite = require('./suite');

/**
 * For sorting hands.
 */
exports.rankCompare = exports.compare = function(card, other) {
  if (card.rank === other.rank) {
    return suite.indexOf(card.suite) - suite.indexOf(other.suite);
  }

  return rank.indexOf(card.rank) - rank.indexOf(other.rank);
};

exports.suiteCompare = function(card, other) {
  if (card.suite === other.suite) {
    return rank.indexOf(card.rank) - rank.indexOf(other.rank);
  }

  return suite.indexOf(card.suite) - suite.indexOf(other.suite);
};

/**
 * Options:
 *
 *   rainbow - ???
 */
exports.stringify = function(card, options) {
  var text = '(' + abbr(card) + ') ' + card.rank + ' of ' + card.suite;

  if (options && options.rainbow) {
    return text.rainbow;
  }

  switch (card.suite) {
    case 'clubs':
      return text.white;
    case 'diamonds':
      return text.magenta;
    case 'hearts':
      return text.red;
    case 'spades':
      return text.blue;
  }
};

exports.value = function(card) {
  switch (card.rank) {
    case 'ace':
      return 1;
    case 'two':
      return 2;
    case 'three':
      return 3;
    case 'four':
      return 4;
    case 'five':
      return 5;
    case 'six':
      return 6;
    case 'seven':
      return 7;
    case 'eight':
      return 8;
    case 'nine':
      return 9;
    case 'ten':
    case 'jack':
    case 'queen':
    case 'king':
      return 10;
  }
};

function abbr(card) {
  var r;
  var value = exports.value(card);
  if (value === 1 || value === 10) {
    r = card.rank === 'ten' ? '10' : card.rank[0];
  } else {
    r = value.toString();
  }

  return (r + card.suite[0]).toUpperCase();
}
