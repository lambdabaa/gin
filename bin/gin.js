#!/usr/bin/env node

// Oh god.
require('colors');

var gin = require('../lib');

var ui = new gin.UI();
ui.on('input', function(event) {
  var data = event.data;
  data = data.toLowerCase();

  switch (game.state) {
    case 'draw':
      gin.game.draw(game, {
        discard: /y/g.test(data),
        player: true
      });

      game.playerMelds = gin.game.getMelds(game, { player: true });
      game.playerGin = gin.game.checkForGin(game, { player: true });
      game.state = 'discard';
      break;
    case 'discard':
      gin.game.discard(game, {
        index: parseInt(data.replace(/\s+/, ''), 10) - 1,
        player: true
      });

      game.playerMelds = gin.game.getMelds(game, { player: true });
      game.playerGin = gin.game.checkForBigGin(game, { player: true });
      game.playerBigGin = gin.game.checkForGin(game, { player: true });
      game.state = 'draw';
      break;
  }

  ui.render(game);
});

// Start the game.
var game = gin.game.initialize();
game.state = 'draw';
ui.render(game);
