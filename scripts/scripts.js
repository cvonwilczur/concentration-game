// Global Variables

flippedCard = document.querySelectorAll(".card-flipped");
unflippedCard = document.querySelectorAll(".card");

// Adding Listener to all Cards for Flip functionality
function addEventListenerCards(){
  for (var i = 0; i < unflippedCard.length; i++){
    unflippedCard[i].addEventListener('click', hide);
  }
}

addEventListenerCards();

// Flip functionality
function hide(){
  event.target.classList.toggle('visible')
  };
