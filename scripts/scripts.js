// Global Variables
const unflippedCard = document.querySelectorAll('.card');
const flippedCardValues = document.querySelectorAll('.card-flipped-value');
const resetButton = document.querySelector('.reset');
const turnCounter = document.querySelector('.turn-counter');
const starTracker = document.querySelector('.star-tracker');
const gameScreen = document.querySelector('.game-screen');
const body = document.querySelector('body');
const secondTimer = document.querySelector('.seconds-timer');
const minuteTimer = document.querySelector('.minutes-timer');
const deck = document.querySelector('section');
let twoCardsSelected = false;
let firstCardSelected = 0;
let minutes = 0;
let seconds = 0;
let oneCardSelected = false;
let gameScore = 0;
let turnCount = 0;
let timer = 0;
let starCount = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
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
  addEventListenerforTimer();
}

//Card Functionality Section
function addEventListenerCards() {
  for (i = 0; i < unflippedCard.length; i++) {
    unflippedCard[i].addEventListener('click', doCardsMatch);
  }
}

//Timer addition
function addEventListenerforTimer() {
  deck.addEventListener('click', startTimer)

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
  if (oneCardSelected === false && twoCardsSelected === false) {
    flip();
    event.target.classList.toggle('firstCardSelected');
    oneCardSelected = true;
    firstCardSelected = document.querySelector('.firstCardSelected');
    firstCardSelected.parentNode.removeEventListener('click', doCardsMatch);
  } else if (oneCardSelected === true && twoCardsSelected === false && event.target.textContent === firstCardSelected.textContent) {
    flip();
    gameScore += 1;
    turnCount += 1;
    updateTurn();
    updateStars();
    firstCardSelected.parentNode.removeEventListener('click', doCardsMatch);
    event.target.parentNode.removeEventListener('click', doCardsMatch);
    resetCardState();
    winScreen();
    twoCardsSelected = true;
    let blockCardFlip = function() {
      twoCardsSelected = false
    }
    setTimeout(blockCardFlip, 1000);
  } else if (oneCardSelected === true && twoCardsSelected === false && event.target.textContent != firstCardSelected.textContent) {
    flip();
    firstCardSelected.parentNode.addEventListener('click', doCardsMatch);
    let firstWrongCard = firstCardSelected;
    let secondWrongCard = event.target;
    twoCardsSelected = true;
    let flipWrongCards = function() {
      secondWrongCard.classList.add('visible');
      firstWrongCard.classList.add('visible');
      twoCardsSelected = false
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
  init();
  for (i = 0; i < flippedCardValues.length; i++) {
    flippedCardValues[i].classList.add('visible');
  }
  gameScore = 0;
  turnCount = 0;
  oneCardSelected = false;
  twoCardsSelected = false;
  starCount = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
  updateTurn();
  updateStars();
  if (timer != 0) {
    stopTimer();
  }
  if (firstCardSelected !== 0) {
    resetCardState();
  }
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
  // }
  deck.removeEventListener('click', startTimer)
}

function stopTimer() {
  clearInterval(timer);
  minutes = 0;
  seconds = 0;
  minuteTimer.textContent = minutes;
  secondTimer.textContent = seconds;
}

//Win Screen Functionality
function winScreen() {
  if (gameScore === 8) {
    gameScreen.classList.toggle('visible');
    let winMinutes = minutes;
    let winSeconds = seconds;
    stopTimer();
    let winMessage = document.createElement('h1')
    let winMessageText = document.createTextNode(`Congratulations! You Won!` + ` With ${turnCount} Moves, your total time was ${winMinutes} minute(s) and ${winSeconds} second(s), and your Star Score was: `);
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
