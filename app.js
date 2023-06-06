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
