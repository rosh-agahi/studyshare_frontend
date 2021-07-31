//for studyLoop
let studyCards = [];
let selectedSubject = 0;
let countup = 0;

function studySelections() {
  const studyForm = `
    <form id="study_selections" autocomplete="off">
        <p class="box"><strong>Select a Subject:</strong></p>
        <select id="subject_selector_input" type="text" name="subject_selector_input">

        </select><br>

        <p class="box"><strong>Select Flashcard Scope:</strong></p>
          <div class="radio">
            <input type="radio" id="global_specific" name="flashcard_scope" value="0" checked="checked">
            <label>All Available Flashcards</label><br>

            <input type="radio" id="user_specific" name="flashcard_scope" value="1">
            <label>My Flashcards only</label><br>
          </div>

          <br><br><br>
      <input class="button" id="start_studying_button" name="start_studying_button" type="submit" value="Start Studying!"></input>
    </form>
  `
  populateFlaschardField(studyForm)
  getSubjects('#subject_selector_input')
  document.querySelector("#start_studying_button").addEventListener("click", (e) => setupStudySession(e))
  //
}

function setupStudySession(e) {
  e.preventDefault()
  
  let s = document.querySelector("#subject_selector_input").value - 1
  let scope = document.querySelector('input[name="flashcard_scope"]:checked').value
  console.log(s)
  console.log(scope)
}

function getFlashcards() {

  fetch(endPointFlashcards)
  .then(response => response.json())
  .then(flashcards => {
    flashcards.data.forEach(fc => {
        let newFlashcard = new Flashcard(fc, fc.attributes)
    })
  });

}


// function getfilteredflashcards(user_id) {
// //  this is just notes for when I filter the flashcards by user id
// //     const randomNumbers = [4, 11, 42, 14, 39];
// //     const filteredArray = randomNumbers.filter(n => {
// //       return n > 5;
// //     });
// }
//
// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }
//
// function studyLoop() {
//   selectedSubject = parseInt(document.querySelector('#subject_selector_input').value);
//   getFlashcards(studyCards);
//
//   while (countup < 100) {
//     c = getRandomInt(studyCards.length);
//     displayFlashcardFront(studyCards[c]);
//     showFlipCardButton();
//     displayFlashcardBack(studyCards[c]);
//     countup ++;
//     document.querySelector('#flip_counter').innerHTML = `Flipped Cards: ${countup}`;
//   }
// }
//
// function displayFlashcardFront(card) {
//   const flashcardFront = `
//       <h2>${card.term}</h2>`;
//
//   populateFlaschardField(flashcardFront)
// }
//
// function displayFlashcardBack(card) {
//   const flashcardBack = `
//       <h2>${card.term}</h2>
//       <h3>${card.definition}</h3>`;
//
//   populateFlaschardField(flashcardBack)
// }
//
// function showFlipCardButton() {
//   // show button
//   document.querySelector('#buttons').innerHTML = '<button id="flip" onclick="showNextCardButton()" class="button">Flip</button>'
// }
//
// function showNextCardButton() {
//   e.preventDefault()
//   // change button to "next"
//   document.querySelector('#buttons').innerHTML = '<button id="next" onclick="showFlipCardButton()" class="button">Next</button>'
// }
//
// function selectMineOrAll() {
//   // allow user to only see their own flashcards or to use globally
//   // created flashcards for a given subject
// }
