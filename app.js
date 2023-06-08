const prompt = require('prompt-sync')();
/**
 Black Jack
 Rules:
 When the dealer has served every player, the dealers face-down card is turned up. 
 If the total is 17 or more, it must stand. If the total is 16 or under, they must take a 
 card. The dealer must continue to take cards until the total is 17 or more, at which point 
 the dealer must stand.

 Goal- Beat the Dealer or get 21

 deck of cards:
 4 of each
 [ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, jack, queen, king]
    -ace can be used as a 1 or 11.
    -face cards are all worth 10

1. computer and player need to be 'drawn' 2 random cards
2. ask if user wants to 'hit' or 'stay'
    - if 'hit' 'draw' a new card
        -once the amount is over 21 they automatically loose
    - if 'stay' they keep the current amount and computer reveals amount
        -if computer amount <= 16 they must draw until they have >= 17
3. Decide winner
    if user amount is <=21 and > computer amount -> user wins
    if user amount is >21 -> computer automatically wins
    if computer amount === user amount draw


ace card-
if player or dealer pulls an ace, it is an 11 unless it will make their total > 21, which will turn it into a 1
future features:
- add bank account
- double your money if you win
- check past game logs
 */
console.log(`Black Jack: Terminal Edition`);
const cards = [
  11, 11, 11, 11, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7,
  7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
  10, 10, 10, 10, 10,
];

//objects for dealer and player
const dealer = {
  total: 0,
  gamesWon: 0,
};

const player = {
  total: 0,
  gamesWon: 0,
};

let tieGame = 0;
let exitGame = false;
//function to generate new cards
function startingCards() {
  //resets total before each game starts
  dealer.total = 0;
  player.total = 0;
  //generates 4 random numbers
  console.log(`-----------------------`);
  for (let i = 0; i < 4; i++) {
    const ranNum = Math.floor(Math.random() * cards.length);
    let dealerCards = cards[ranNum];
    let playerCards = cards[ranNum];
    //random card selection for dealer
    if (i < 1) {
      console.log(`\nDealer Card #${i + 1}: ${dealerCards}\n`);
      //adds current value of card to dealers total
      dealer.total += dealerCards;
      //checks for ace (11)
      if (dealerCards === 11 && dealer.total > 21) {
        dealerCards = 1;
      }
    }
    if (i === 1) {
      console.log(`Dealer Card #2: Hidden\n`);
      dealer.total += dealerCards;
      //checks for ace (11)
      if (dealerCards === 11 && dealer.total > 21) {
        dealerCards = 1;
      }
    }
    //random card selection for player
    if (i > 1 && i < 4) {
      console.log(`Player card #${i - 1} ${playerCards}\n`);
      //adds current value of card to players total
      player.total += playerCards;
      //checks for ace (11)
      if (playerCards === 11 && player.total > 21) {
        playerCards = 1;
      }
    }
  }
  // console.log(`Dealer Total: ${dealer.total}\n`);
  console.log(`Player Total: ${player.total}`);

  //keeps asking player if they want to hit
  while (player.total < 21) {
    let userHit = prompt('(h)it for new card?: ');
    if (userHit === 'h') {
      hitMe();
    } else {
      // exitGame = true;
      break;
    }
  }
  //keeps making dealer hit until at least at 17
  while (true) {
    if (player.total > 21) {
      break;
    }
    if (dealer.total <= 16) {
      hitMeDealer();
      // console.log(`Dealer total after hit: ${dealer.total}`);
    } else {
      false;
      break;
    }
  }
}

//function for user to draw a new card
function hitMe() {
  const ranNum = Math.floor(Math.random() * cards.length);
  let newCard = cards[ranNum];
  player.total += newCard;
  console.log(`You got a ${newCard}\nPlayer Total: ${player.total}`);
}

//hitting dealer
function hitMeDealer() {
  const ranNum = Math.floor(Math.random() * cards.length);
  let newCard = cards[ranNum];
  dealer.total += newCard;
  console.log(`Dealer got a ${newCard}\nDealer Total: ${dealer.total}`);
}

//loop for game with menu
while (!exitGame) {
  //menu logic
  let userContinue = prompt(
    '(p)lay game, check (b)alance, past (g)ames, e(x)it: '
  );
  if (userContinue === 'p') {
    startingCards();
    gameLogic();
  } else if (userContinue === 'b') {
    console.log(`Balance Feature coming soon.`);
  } else if (userContinue === 'g') {
    gameLogs();
  } else if (userContinue === 'x') {
    exitGame = true;
    console.log(`Player left table.`);
    break;
  } else {
    console.log('command not found');
  }
}

function endGameCards() {
  console.log(`\nDealer Had ${dealer.total}`);
  console.log(`Player Had ${player.total}`);
  console.log(`---------------------------`);
}

//total games won
function gameLogs() {
  console.log(`Total games won: \n`);
  console.log(`Player: ${player.gamesWon}\n`);
  console.log(`Dealer: ${dealer.gamesWon}\n`);
  console.log(`Games Tied: ${tieGame}\n`);
}

//logic for deciding winner
function gameLogic() {
  //v2
  if (player.total < 21 && dealer.total < 21 && player.total > dealer.total) {
    console.log('Player wins');
    player.gamesWon += 1;
  }
  if (player.total === 21) {
    console.log('Player Wins with 21!');
    player.gamesWon += 1;
  }
  if (dealer.total > 21) {
    console.log('Player Wins, dealer busted');
    player.gamesWon += 1;
  }
  if (dealer.total === 21) {
    console.log(`Dealer has 21:(`);
  }
  if (player.total > 21) {
    console.log(`Dealer Wins, player busted`);
    dealer.gamesWon += 1;
  }
  if (dealer.total < 21 && player.total < 21 && dealer.total > player.total) {
    console.log('Dealer Wins');
    dealer.gamesWon += 1;
  }
  if (player.total === dealer.total) {
    console.log('Its a Draw!');
    tieGame += 1;
  }
  endGameCards();
}
