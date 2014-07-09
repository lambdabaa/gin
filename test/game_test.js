var assert = require('chai').assert,
    game = require('../lib').game;

suite('game', function() {
  test('#checkForGin gin', function() {
    assert.ok(
      game.checkForGin(
        {
          playerMelds: [
            [{ suite: 'clubs', rank: 'two' }, { suite: 'diamonds', rank: 'two' }, { suite: 'hearts', rank: 'two' }],
            [{ suite: 'clubs', rank: 'two' }, { suite: 'diamonds', rank: 'two' }, { suite: 'spades', rank: 'two' }],
            [{ suite: 'clubs', rank: 'two' }, { suite: 'hearts', rank: 'two' }, { suite: 'diamonds', rank: 'two' }],
            [{ suite: 'diamonds', rank: 'two' }, { suite: 'hearts', rank: 'two' }, { suite: 'spades', rank: 'two' }],
            [{ suite: 'clubs', rank: 'two' }, { suite: 'diamonds', rank: 'two' }, { suite: 'hearts', rank: 'two' }, { suite: 'spades', rank: 'two'}],
            [{ suite: 'clubs', rank: 'jack' }, { suite: 'diamonds', rank: 'jack' }, { suite: 'hearts', rank: 'jack' }],
            [{ suite: 'clubs', rank: 'jack' }, { suite: 'diamonds', rank: 'jack' }, { suite: 'spades', rank: 'jack' }],
            [{ suite: 'clubs', rank: 'jack' }, { suite: 'hearts', rank: 'jack' }, { suite: 'diamonds', rank: 'jack' }],
            [{ suite: 'diamonds', rank: 'jack' }, { suite: 'hearts', rank: 'jack' }, { suite: 'spades', rank: 'jack' }],
            [{ suite: 'clubs', rank: 'jack' }, { suite: 'diamonds', rank: 'jack' }, { suite: 'hearts', rank: 'jack' }, { suite: 'spades', rank: 'jack'}],
            [{ suite: 'diamonds', rank: 'two' }, { suite: 'diamonds', rank: 'three' }, { suite: 'diamonds', rank: 'four' }]
          ]
        },
        {
          player: true
        }
      )
    );
  });

  test('#checkForGin not gin', function() {
    assert.notOk(
      game.checkForGin(
        {
          playerMelds: [
            [{ suite: 'clubs', rank: 'two' }, { suite: 'diamonds', rank: 'two' }, { suite: 'hearts', rank: 'two' }],
            [{ suite: 'clubs', rank: 'two' }, { suite: 'diamonds', rank: 'two' }, { suite: 'spades', rank: 'two' }],
            [{ suite: 'clubs', rank: 'two' }, { suite: 'hearts', rank: 'two' }, { suite: 'diamonds', rank: 'two' }],
            [{ suite: 'diamonds', rank: 'two' }, { suite: 'hearts', rank: 'two' }, { suite: 'spades', rank: 'two' }],
            [{ suite: 'clubs', rank: 'two' }, { suite: 'diamonds', rank: 'two' }, { suite: 'hearts', rank: 'two' }, { suite: 'spades', rank: 'two'}],
            [{ suite: 'clubs', rank: 'jack' }, { suite: 'diamonds', rank: 'jack' }, { suite: 'hearts', rank: 'jack' }],
            [{ suite: 'clubs', rank: 'jack' }, { suite: 'diamonds', rank: 'jack' }, { suite: 'spades', rank: 'jack' }],
            [{ suite: 'clubs', rank: 'jack' }, { suite: 'hearts', rank: 'jack' }, { suite: 'diamonds', rank: 'jack' }],
            [{ suite: 'diamonds', rank: 'jack' }, { suite: 'hearts', rank: 'jack' }, { suite: 'spades', rank: 'jack' }],
            [{ suite: 'clubs', rank: 'jack' }, { suite: 'diamonds', rank: 'jack' }, { suite: 'hearts', rank: 'jack' }, { suite: 'spades', rank: 'jack'}]
          ]
        },
        {
          player: true
        }
      )
    );
  });
});

