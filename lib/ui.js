var EventEmitter = require('events').EventEmitter,
    card = require('./card'),
    inherits = require('util').inherits;

function UI() {
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    return chunk && this.emit('input', { data: chunk.toString() });
  }.bind(this));
}
inherits(UI, EventEmitter);
module.exports = UI;

UI.prototype.render = function(game) {
  // Clear the screen.
  console.log('\033[2J\033[;H');

  switch (game.state) {
    case 'draw':
      return draw(game);
    case 'discard':
      return discard(game);
  }
};

function draw(game) {
  // Discard pile.
  var discard = game.discardPile[0];
  console.log('Discard pile:'.bold.underline);
  console.log();
  console.log(card.stringify(discard));
  console.log();

  // Player hand.
  console.log('Hand:'.bold.underline);
  console.log();
  console.log(game.playerHand.map(card.stringify).join('\n'));
  console.log();

  // Melds.
  console.log('Melds:'.bold.underline);
  console.log();
  game.playerMelds.forEach(function(meld) {
    console.log(meld.map(card.stringify).join(', '));
    console.log();
  });

  // Gin.
  console.log('Gin:'.bold.underline + ' ' + !!game.playerGin);
  console.log();

  // Prompt.
  process.stdout.write('Would you like to take the ' +
                       card.stringify(discard) +
                       ' from the discard pile [y/N]? ');
};

function discard(game) {
  // Player hand.
  console.log('Hand:'.bold.underline);
  console.log();
  game.playerHand.forEach(function(handCard, index) {
    var options = {};
    if (index === 10) {
      console.log();
      options.rainbow = true;
    }

    console.log('(' + (index + 1) + ') ' + card.stringify(handCard, options));
  });
  console.log();

  // Melds.
  console.log('Melds:'.bold.underline);
  console.log();
  game.playerMelds.forEach(function(meld) {
    console.log(meld.map(card.stringify).join(', '));
    console.log();
  });

  // Gin.
  console.log('Gin:'.bold.underline + ' ' + !!game.playerGin);
  console.log();

  // Big gin.
  console.log('Big Gin:'.bold.underline + ' ' + !!game.playerBigGin);
  console.log();

  // Prompt.
  process.stdout.write('Select a card (1-11) to discard: ');
}
