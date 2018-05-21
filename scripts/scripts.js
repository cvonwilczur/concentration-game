// Global Variables
const unflippedCard = document.querySelectorAll(".card");
const flippedCardValues = document.querySelectorAll(".card-flipped-value");
const visibleCards = document.querySelectorAll(".visible");
const resetButton = document.querySelector(".reset");
const turnCounter = document.querySelector(".turn-counter");
const starTracker = document.querySelector(".star-tracker");
const gameScreen = document.querySelector('.game-screen');
const body = document.querySelector('body');
const secondTimer = document.querySelector('.seconds-timer');
const minuteTimer = document.querySelector('.minutes-timer');
let firstCardSelected = document.querySelectorAll('.firstCardSelected');
let minutes = 0;
let seconds = 0;
let activeCardCount = 0;
let gameStarted = 0;
let gameScore = 0;
let turnCount = 0;
let starCount = '***';
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
  startTimer();
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
  starCount = '***';
  updateTurn();
  updateStars();
  addValuestoCards();
  stopTimer();
  startTimer();
}

//2.6 Add Mechanics to Turn Counter
function updateTurn(){
  turnCounter.textContent = turnCount;
}

//2.7 Track Number of Turns and update firstCardSelected
function updateStars(){
  if (turnCount >= 4 && turnCount <= 10){
    starTracker.textContent = starCount;
    starCount = 'o**';
  } else if (turnCount >= 11 ** turnCount <= 18) {
    starTracker.textContent = starCount;
    starCount = 'oo*'
  } else if (turnCount < 19){
    starTracker.textContent = starCount;
    starCount = 'ooo';
  } else {
    starTracker.textContent = starCount;
    starCount = '***';
  }
}

//2.9 Game Timer Start
function startTimer(){
  if (gameStarted === 0) {
    gameStarted = 1;
    timer = setInterval(function(){
        seconds++;
        if (seconds <= 59){
          secondTimer.textContent = seconds;
        } else if (seconds === 60){
          seconds = 0;
          minutes ++;
          minuteTimer.textContent = minutes;
          secondTimer.textContent = seconds;
        }
      }, 1000)
  }
}

//2.9 Game Timer Stop
function stopTimer(){
  clearInterval(timer);
  minutes = 0;
  seconds = 0;
  gameStarted = 0;
  minuteTimer.textContent = minutes;
  secondTimer.textContent = seconds;
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
  if (gameScore === 1){
    gameScreen.classList.toggle('visible');
    let winMessage = document.createElement('h1')
    let winMessageText = document.createTextNode(`Congratulations! You Won!
      With ${turnCount} Moves and your Star Score was ${starCount}.
      Woooooo!`);
    let winResetButton = document.createElement('button');
    let winResetButtonText = document.createTextNode('Reset?');
    winResetButton.appendChild(winResetButtonText);
    winResetButton.setAttribute("name", "WinResetButton");
    winResetButton.addEventListener("click", function(){
      gameScreen.classList.toggle('visible');
      resetAll();
      body.removeChild(winMessage);
      body.removeChild(winResetButton);
    }
  )
    winMessage.appendChild(winMessageText);
    body.insertBefore(winMessage, body.childNodes[0]);
    body.insertBefore(winResetButton, body.childNodes[1]);
  }
}
