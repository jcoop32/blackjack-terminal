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

future features:
- add bank account
- double your money if you win
 */

const cards = [
  1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7,
  7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
  10, 10, 10, 10,
];
//random num from array
// const ranNum1 = Math.floor(Math.random() * cards.length);
// const ranNum2 = Math.floor(Math.random() * cards.length);
// const ranNum3 = Math.floor(Math.random() * cards.length);
// const ranNum4 = Math.floor(Math.random() * cards.length);

// function ranCard() {
//   const dealer1stcard = cards[ranNum1];
//   const dealer2ndcard = cards[ranNum2];
//   const player1stcard = cards[ranNum3];
//   const player2ndcard = cards[ranNum4];
//   console.log(
//     `Dealer first card: ${dealer1stcard} \nDealer second card: ${dealer2ndcard}\nPlayer first card: ${player1stcard}\nPlayer second card: ${player2ndcard}\n`
//   );
//   console.log(
//     `Dealer: ${dealer1stcard + dealer2ndcard}\nPlayer: ${
//       player1stcard + player2ndcard
//     }\n`
//   );
// }

// ranCard();

//objects for dealer and player
const dealer = {
  total: 0,
};

const player = {
  total: 0,
};

let exitGame = false;
//function to generate new cards
function startingCards() {
  //generates 4 random numbers
  for (let i = 0; i < 4; i++) {
    const ranNum = Math.floor(Math.random() * cards.length);
    let dealerCards = cards[ranNum];
    let playerCards = cards[ranNum];
    //random card selection for dealer
    if (i <= 1) {
      console.log(`Dealer Card #${i + 1}: ${dealerCards}\n`);
      //adds current value of card to dealers total
      dealer.total += dealerCards;
    }
    //random card selection for player
    if (i > 1 && i < 4) {
      console.log(`Player card #${i - 1} ${playerCards}\n`);
      //adds current value of card to players total
      player.total += playerCards;
    }
  }
  console.log(`Dealer Total: ${dealer.total}\n`);
  console.log(`Player Total: ${player.total}`);

  //keeps asking player if they want to hit
  while (player.total < 21) {
    let userHit = prompt('(h)it for new card?');
    if (userHit === 'h') {
      hitMe();
    } else {
      exitGame = true;
      break;
    }
  }
  while (true) {
    if (dealer.total <= 16) {
      hitMeDealer();
      // console.log(`Dealer total after hit: ${dealer.total}`);
    } else {
      false;
      break;
    }
  }
}

// startingCards();

//function for user to draw a new card
function hitMe() {
  const ranNum = Math.floor(Math.random() * cards.length);
  let newCard = cards[ranNum];
  player.total += newCard;
  console.log(`You got a ${newCard}\nPLayer Total: ${player.total}`);
}

function hitMeDealer() {
  const ranNum = Math.floor(Math.random() * cards.length);
  let newCard = cards[ranNum];
  dealer.total += newCard;
  console.log(`Dealer got a ${newCard}\nDealer Total: ${dealer.total}`);
}
startingCards();
//loop
// while (!exitGame) {
//   if (player.total < 21) {
//     startingCards();
//   } else {
//     break;
//   }
// }

// console.log(`Dealer: ${dealer.total}`);
// console.log(`Player: ${player.total}`);

//logic for deciding winner
if (player.total <= 21 && player.total > dealer.total) {
  console.log(`Player Wins!`);
  endGameCards();
} else if (dealer.total === 21) {
  console.log('Dealer has 21');
  endGameCards();
} else if (player.total > 21 && dealer.total < 22) {
  console.log('Dealer Wins :(');
  endGameCards();
} else if (dealer.total > player.total && dealer.total && player.total < 22) {
  console.log(`Dealer Wins`);
  endGameCards();
} else if (player.total < 21 && dealer.total > 21) {
  console.log(`Dealer Busts, Player Wins!`);
  endGameCards();
} else if (player.total === dealer.total) {
  console.log('Its a draw!');
  endGameCards();
}
function endGameCards() {
  console.log(`\nDealer Had ${dealer.total}`);
  console.log(`Player Had ${player.total}`);
}
