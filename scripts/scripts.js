// Global Variables
const unflippedCard = document.querySelectorAll(".card");
const flippedCardValues = document.querySelectorAll(".card-flipped-value");
const visibleCards = document.querySelectorAll(".visible");
let activeCards = document.querySelectorAll(".active");
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
let activeCardCount = 0;
let first = document.querySelectorAll('.first');

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
  event.target.classList.toggle('active');
  activeCards = document.querySelectorAll(".active");
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
    console.log("One more!");
    event.target.classList.toggle('first');
    activeCardCount = 1;
    first = document.querySelector('.first');
  } else if (activeCardCount === 1 && event.target.textContent === first.textContent) {
    console.log("Yes!");
    resetCardState();
  } else {
    console.log("No!");
    resetCardState();
  }
}

// Reset card Values
function resetCardState() {
  activeCardCount = 0;
  first.classList.toggle('first');
  first = null;
}
