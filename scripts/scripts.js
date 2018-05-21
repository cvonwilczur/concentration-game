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
let firstCardSelected = 0;
let minutes = 0;
let seconds = 0;
let oneCardSelected = false;
let gameStarted = false;
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

//Initialize Section
init();

function init() {
  addEventListenerCards();
  shuffle(cardValues);
  addValuestoCards();
  startTimer();
}

//Card Functionality Section
function addEventListenerCards() {
  for (var i = 0; i < unflippedCard.length; i++) {
    unflippedCard[i].addEventListener('click', flip);
    unflippedCard[i].addEventListener('click', doCardsMatch);
  }
}

function flip() {
  event.target.classList.toggle('visible');
};

function addValuestoCards() {
  for (var i = 0; i < cardValues.length; i++) {
    flippedCardValues[i].textContent = cardValues[i];
  }
}

function doCardsMatch() {
  if (oneCardSelected === false) {
    event.target.classList.toggle('firstCardSelected');
    oneCardSelected = true;
    firstCardSelected = document.querySelector('.firstCardSelected');
  } else if (oneCardSelected === true && event.target.textContent === firstCardSelected.textContent) {
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

function resetCardState() {
  oneCardSelected = false;
  firstCardSelected.classList.toggle('firstCardSelected');
  firstCardSelected = 0;
}

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

//Reset Button Functionality
resetButton.addEventListener('click', resetAll)

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

//Point Tracking Functionality
function updateTurn() {
  turnCounter.textContent = turnCount;
}

function updateStars() {
  if (turnCount >= 4 && turnCount <= 10) {
    starTracker.textContent = starCount;
    starCount = 'o**';
  } else if (turnCount >= 11 && turnCount <= 18) {
    starTracker.textContent = starCount;
    starCount = 'oo*'
  } else if (turnCount > 19) {
    starTracker.textContent = starCount;
    starCount = 'ooo';
  } else {
    starTracker.textContent = starCount;
    starCount = '***';
  }
}

//Timer Functionality
function startTimer() {
  if (gameStarted === false) {
    gameStarted = true;
    timer = setInterval(function() {
      seconds++;
      if (seconds <= 59) {
        secondTimer.textContent = seconds;
      } else if (seconds === 60) {
        seconds = 0;
        minutes++;
        minuteTimer.textContent = minutes;
        secondTimer.textContent = seconds;
      }
    }, 1000)
  }
}

function stopTimer() {
  clearInterval(timer);
  minutes = 0;
  seconds = 0;
  gameStarted = false;
  minuteTimer.textContent = minutes;
  secondTimer.textContent = seconds;
}

//Win Screen Functionality
function winScreen() {
  if (gameScore === 8) {
    gameScreen.classList.toggle('visible');
    let winMessage = document.createElement('h1')
    let winMessageText = document.createTextNode(`Congratulations! You Won!
      With ${turnCount} Moves and your Star Score was ${starCount}.
      Woooooo!`);
    let winResetButton = document.createElement('button');
    let winResetButtonText = document.createTextNode('Reset?');
    winResetButton.appendChild(winResetButtonText);
    winResetButton.addEventListener("click", function() {
      gameScreen.classList.toggle('visible');
      resetAll();
      body.removeChild(winMessage);
      body.removeChild(winResetButton);
    })
    winMessage.appendChild(winMessageText);
    body.insertBefore(winMessage, body.childNodes[0]);
    body.insertBefore(winResetButton, body.childNodes[1]);
  }
}
