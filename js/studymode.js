//for studyLoop
flashCard = Flashcard.all[0]

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
}

function setupStudySession(e) {
  e.preventDefault();

  let s = document.querySelector("#subject_selector_input").value;
  let scp = document.querySelector('input[name="flashcard_scope"]:checked').value;

  getFlashcards(s, scp);
  populateFlaschardField("Flashcards have been loaded! Press the start button below.")
  showFlipCardButtons();
}

function getFlashcards(subject, scope) {
  Flashcard.all.length = 0

  fetch(endPointFlashcards)
  .then(response => response.json())
  .then(flashcards => {
    flashcards.data.forEach(fc => {
        if (fc.attributes.subject_id == subject) {
          if (scope == 1) {
            if (fc.attributes.user_id == matchingUserID) {
              let newFlashcard = new Flashcard(fc, fc.attributes);
            }
          } else {
              let newFlashcard = new Flashcard(fc, fc.attributes);
          }
      }
    })
  });

}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function selectFlashcard() {
  let c = getRandomInt(Flashcard.all.length);
  flashCard = Flashcard.all[c];
  displayFlashcardFront(flashCard);
  showFlipCardButtons();
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

function showFlipCardButtons() {
  const buttons = `
  <button id="flip" onclick="displayFlashcardBack(flashCard)" class="button">Flip</button>
  <button id="next" onclick="selectFlashcard()" class="button">Next</button>
  <br>
  <br>
  `
  document.querySelector('#buttons').innerHTML = buttons
}

// function selectMineOrAll() {
//   // allow user to only see their own flashcards or to use globally
//   // created flashcards for a given subject
// }
