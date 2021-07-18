//for studyLoop
let studyCards = [];
let selectedSubject = 0;
let countup = 0;

function getfilteredflashcards(user_id) {
//  this is just notes for when I filter the flashcards by user id
//     const randomNumbers = [4, 11, 42, 14, 39];
//     const filteredArray = randomNumbers.filter(n => {
//       return n > 5;
//     });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function studyLoop() {
  selectedSubject = parseInt(document.querySelector('#subject_selector_input').value);
  getFlashcards(studyCards);

  while (countup < 100) {
    c = getRandomInt(studyCards.length);
    displayFlashcardFront(studyCards[c]);
    showFlipCardButton();
    displayFlashcardBack(studyCards[c]);
    countup ++;
    document.querySelector('#flip_counter').innerHTML = `Flipped Cards: ${countup}`;
  }
}

function displayFlashcardFront(card) {
  const flashcardFront = `
      <h2>${card.term}</h2>`;

  populateFlaschardField(flashcardFront)
}

function displayFlashcardBack(card) {
  const flashcardBack = `
      <h2>${card.term}</h2>
      <h3>${card.definition}</h3>`;

  populateFlaschardField(flashcardBack)
}

function showFlipCardButton() {
  // show button
  document.querySelector('#buttons').innerHTML = '<button id="flip" onclick="showNextCardButton()" class="button">Flip</button>'
}

function showNextCardButton() {
  e.preventDefault()
  // change button to "next"
  document.querySelector('#buttons').innerHTML = '<button id="next" onclick="showFlipCardButton()" class="button">Next</button>'
}

function selectMineOrAll() {
  // allow user to only see their own flashcards or to use globally
  // created flashcards for a given subject
}
