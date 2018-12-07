/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// Global variables
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

// Adding eventlistener to 'roll dice'
document.querySelector('.btn-roll').addEventListener('click', function() {

  if(gamePlaying) {
    // 1. random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;

      document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
      // Next player
      nextPlayer();
    }
    // 3. update the round score but only if the roll number was not a 1
  //   if (dice === 6 && lastDice === 6) {
  //     // Player looses score
  //     // Only the current player should loos his score.
  //     scores[activePlayer] = 0;
  //     document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  //     nextPlayer();
  //   } else if (dice !== 1) {
  //     // Add score
  //     roundScore += dice;
  //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
  //
  //   } else {
  //     // Next player
  //     nextPlayer();
  //   }
  //
  //   lastDice = dice;
  //
   }
});


// Anonymous function
document.querySelector('.btn-hold').addEventListener('click', function() {

  if(gamePlaying) {
    // Add current score to global scores
    scores[activePlayer] += roundScore;
    console.log(scores[activePlayer]);
    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;

    if (input) {
      var winningScore = input;
    } else {
      winningScore = 10;
    }
    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});


function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}
