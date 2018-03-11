// Code goes here

//BlackJack

let suits = ['Hearts', 'Spades', 'Club', 'Diamonds'];
let values = ["Ace", "King", "Queen", "Jack", "Ten",
              "Nine", "Eight", "Seven", "Six",
              "Five", "Four", "Three", "Two", "One"];

// DOM variables
let textArea = document.getElementById('textArea');
let newGameButton = document.getElementById('newGameButton');
let hitButton = document.getElementById('hitButton');
let stayButton = document.getElementById('stayButton');

// Game varibales
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    tie = false;
    dealerCards = [],
    playerCards = [],
    playerScore = 0,
    dealerScore = 0,
    deck = [];


hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();


newGameButton.addEventListener('click', function(){
  gameStared = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(), getNextCard() ];
  playerCards = [getNextCard(), getNextCard() ];
  
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  checkForEndOfGame();
  showStatus();
});

hitButton.addEventListener('click', function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

    

function createDeck()
{
  let deck = [];
  for(let suitIndex=0; suitIndex<suits.length; suitIndex++)
  {
    for(let valueIndex=0; valueIndex<values.length; valueIndex++)
    {
      let card = {
        suit : suits[suitIndex],
        value : values[valueIndex]
      }
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck){
  for(let index=0; index<deck.length; index++){
    let swapIndex = Math.trunc(Math.random() * deck.length);
    let temp = deck[index];
    deck[index] = deck[swapIndex];
    deck[swapIndex] = temp;
  }
}

function getCardString(card){
  return card.value + " of " + card.suit;
}

function getNextCard(){ 
  return deck.shift();
}

function getCardNumericValue(card) {
  switch(card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for(let i=0;i<cardArray.length;i++)
  {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if(card.value === 'Ace') {
      hasAce = true;
    }
  }
  if(hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function updateScores(){
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame() {
  updateScores();
  if(gameOver) {
    // let dealer take cards
    while(dealerScore < playerScore 
          && playerScore <= 21
          && dealerScore <= 21) {
      dealerCards.push(getNextCard());
      updateScores();
          }
  }

  if(playerScore > 21) {
    playerWon = false;
    gameOver = true;
  }
  else if(dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  }
  else if(gameOver) {
    if(playerScore > dealerScore) {
      playerWon = true;
    }
    if(playerScore == dealerScore) {
      tie = true;
    }
  }
}

function showStatus(){
  console.log("deck created");
  if(!gameStarted){
    textArea.innerText = 'Welcome to Blackjack!';
  }

  let dealerCardString = '';
  for(let i=0;i<dealerCards.length;i++){
    dealerCardString += getCardString(dealerCards[i]) + "\n";
  }

  let playerCardString = '';
  for(let i=0;i<playerCards.length;i++){
    playerCardString += getCardString(playerCards[i]) + "\n";
  }

  updateScores();

  textArea.innerText =
    'Dealer has:\n'+
    dealerCardString+
    '(score : '+dealerScore+')\n\n'+

    'Player has:\n'+
    playerCardString+
    '(score : '+playerScore+')\n\n';

  if(gameOver){
    if(playerWon){
      textArea.innerText += "YOU WIN!";
    }
    else if(tie) {
      textArea.innerText += "IT'S A TIE";
    }
    else{
      textArea.innerText += "DEALER WINS";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }

}



/*
console.log("You are dealt:  ");
console.log("  "+getCardString(playerCards[0]));
console.log("  "+getCardString(playerCards[1]));
*/
