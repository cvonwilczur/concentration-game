// Global Variables
const unflippedCard = document.querySelectorAll(".card");
const flippedCardValues = document.querySelectorAll(".card-flipped-value");
const visibleCards = document.querySelectorAll(".visible");
const resetButton = document.querySelector(".reset");
const turnCounter = document.querySelector(".turn-counter");
const starTracker = document.querySelector(".star-tracker");
const gameScreen = document.querySelector('.game-screen');
const body = document.querySelector('body');
let firstCardSelected = document.querySelectorAll('.firstCardSelected');
let activeCardCount = 0;
let gameScore = 0;
let turnCount = 0;
let cardValues = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H"
];

//1.0 INITIALIZE
init();

//1.1 Add Functions to Init
function init() {
  addEventListenerCards();
  shuffle(cardValues);
  addValuestoCards();
}

//1.2 Add Mechanics to Cards
function addEventListenerCards() {
  for (var i = 0; i < unflippedCard.length; i++) {
    unflippedCard[i].addEventListener('click', flip);
    unflippedCard[i].addEventListener('click', doCardsMatch);
  }
}

//1.3 Add Mechanics to Reset Button
resetButton.addEventListener('click', resetAll)

// 2.0 MECHANICS FUNCTIONALITY

//2.1 Shuffle Mechanic
function shuffle(array) {
  var currIndex = array.length,
    tempValue,
    randIndex;
  while (0 !== currIndex) {
    randIndex = Math.floor(Math.random() * currIndex);
    currIndex -= 1;
    tempValue = array[currIndex];
    array[currIndex] = array[randIndex];
    array[randIndex] = tempValue;
  }
  return array;
}

//2.2 Flip Mechanic
function flip() {
  event.target.classList.toggle('visible');
};

//2.3 Card Value Mechanic
function addValuestoCards() {
  for (var i = 0; i < cardValues.length; i++) {
    flippedCardValues[i].textContent = cardValues[i];
  }
}

//2.4 Reset Active Card Mechanic
function resetCardState() {
  activeCardCount = 0;
  firstCardSelected.classList.toggle('firstCardSelected');
  firstCardSelected = 0;
}

//2.5 Reset All
function resetAll() {
  shuffle(cardValues);
  for (var i = 0; i < flippedCardValues.length; i++) {
    flippedCardValues[i].classList.add('visible');
  }
  gameScore = 0;
  turnCount = 0;
  updateTurn();
  updateStars();
  addValuestoCards();
}

//2.6 Add Mechanics to Turn Counter
function updateTurn(){
  turnCounter.textContent = turnCount;
}

//2.7 Track Number of Turns and update firstCardSelected
function updateStars(){
  if (turnCount >= 4 && turnCount <= 10){
    starTracker.textContent = 'o**'
  } else if (turnCount >= 11){
    starTracker.textContent = 'ooo'
  } else {
    starTracker.textContent = '***'
  }
}

//3.0 GAME LOGIC

//3.1 Card Match Logic
function doCardsMatch() {
  if (activeCardCount === 0) {
    event.target.classList.toggle('firstCardSelected');
    activeCardCount = 1;
    firstCardSelected = document.querySelector('.firstCardSelected');
  } else if (activeCardCount === 1 && event.target.textContent === firstCardSelected.textContent) {
    gameScore += 1;
    turnCount += 1;
    updateTurn();
    updateStars();
    resetCardState();
    winScreen();
  } else {
    let firstWrongCard = firstCardSelected;
    let secondWrongCard = event.target;
    let flipWrongCards = function() {
      secondWrongCard.classList.toggle('visible');
      firstWrongCard.classList.toggle('visible');
    }
    setTimeout(flipWrongCards, 2000);
    resetCardState();
    turnCount += 1;
    updateTurn();
    updateStars();
  }
}

//3.2 Winning LOGIC
function winScreen(){
  if (gameScore === 8){
    gameScreen.classList.toggle('visible');
    let winMessage = document.createElement('h1')
    let winMessageText = document.createTextNode('You won, motherfucker.');
    winMessage.appendChild(winMessageText);
    body.appendChild(winMessage);
  }
}
