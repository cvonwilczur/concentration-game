// Global Variables
const unflippedCard = document.querySelectorAll('.card');
const flippedCardValues = document.querySelectorAll('.card-flipped-value');
const visibleCards = document.querySelectorAll('.visible');
const resetButton = document.querySelector('.reset');
const turnCounter = document.querySelector('.turn-counter');
const starTracker = document.querySelector('.star-tracker');
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
let starCount = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
let cardValues = [ "A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];

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
  for (i = 0; i < unflippedCard.length; i++) {
    unflippedCard[i].addEventListener('click', flip);
    unflippedCard[i].addEventListener('click', doCardsMatch);
  }
}

function flip() {
  event.target.classList.toggle('visible');
}

function addValuestoCards() {
  for (i = 0; i < cardValues.length; i++) {
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
      secondWrongCard.classList.add('visible');
      firstWrongCard.classList.add('visible');
    }
    setTimeout(flipWrongCards, 1000);
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
  let currIndex = array.length,
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
  for (i = 0; i < flippedCardValues.length; i++) {
    flippedCardValues[i].classList.add('visible');
  }
  gameScore = 0;
  turnCount = 0;
  oneCardSelected = false;
  starCount = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
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
    starTracker.innerHTML = starCount;
    starCount = '<i class="far fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
  } else if (turnCount >= 11) {
    starTracker.innerHTML = starCount;
    starCount = '<i class="far fa-star"></i><i class="far fa-star"></i><i class="fas fa-star"></i>';
  } else {
    starTracker.innerHTML = starCount;
    starCount = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
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
    let winMessageText = document.createTextNode(`Congratulations! You Won!`+
      `With ${turnCount} Moves and your Star Score was: `);
    let winResetButton = document.createElement('button');
    let winResetButtonText = document.createTextNode('Reset?');
    let winStarScore = document.createElement('div');
    winResetButton.appendChild(winResetButtonText);
    winResetButton.addEventListener('click', function() {
      gameScreen.classList.toggle('visible');
      resetAll();
      body.removeChild(winMessage);
      body.removeChild(winResetButton);
      body.removeChild(winStarScore);
    });
    winMessage.appendChild(winMessageText);
    winStarScore.innerHTML = starCount;
    winMessage.classList.toggle('winScreen');
    winResetButton.classList.toggle('winButton');
    winStarScore.classList.toggle('winStarScore');
    body.insertBefore(winMessage, body.childNodes[0]);
    body.insertBefore(winStarScore, body.childNodes[1]);
    body.insertBefore(winResetButton, body.childNodes[2]);
    window.scrollTo(0, 0);
  }
}
