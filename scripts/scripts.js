// Global Variables
const unflippedCard = document.querySelectorAll(".card");
const flippedCardValues = document.querySelectorAll(".card-flipped-value");
const visibleCards = document.querySelectorAll(".visible");
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

//Initialize
init();

//Initialize game-state function
function init() {
  addEventListenerCards();
  addValuestoCards();
}

// Flip functionality
function flip() {
  event.target.classList.toggle('visible');
};

// Adding Listener to all Cards for Flip/Match functionality
function addEventListenerCards() {
  for (var i = 0; i < unflippedCard.length; i++) {
    unflippedCard[i].addEventListener('click', flip);
    unflippedCard[i].addEventListener('click', doCardsMatch);
  }
}

// Add cardValues to each flipped card
function addValuestoCards() {
  for (var i = 0; i < cardValues.length; i++) {
    flippedCardValues[i].textContent = cardValues[i];
  }
}

// Logic for whether or not cards match, increase score
function doCardsMatch() {
  if (activeCardCount === 0) {
    event.target.classList.toggle('firstCardSelected');
    activeCardCount = 1;
    firstCardSelected = document.querySelector('.firstCardSelected');
  } else if (activeCardCount === 1 && event.target.textContent === firstCardSelected.textContent) {
    gameScore += 1;
    turnCount += 1;
    resetCardState();
  } else {
    let firstWrongCard = firstCardSelected;
    let secondWrongCard = event.target;
    let flipWrongCards = function(){
      secondWrongCard.classList.toggle('visible');
      firstWrongCard.classList.toggle('visible');
    }
    setTimeout(flipWrongCards, 2000);
    resetCardState();
    turnCount +=1;
  }
}

// Reset card Values
function resetCardState() {
  activeCardCount = 0;
  firstCardSelected.classList.toggle('firstCardSelected');
  firstCardSelected = 0;
}
