const endPoint = "http://127.0.0.1:3000/api/v1/flashcards"

document.addEventListener('DOMContentLoaded', () => {
  getFlashcards()

  let createFlashcardForm = document.querySelector("#create_flashcard_form")

  createFlashcardForm.addEventListener("submit", (e) => createFormHandler(e))
});


function getFlashcards() {
  fetch(endPoint)
  .then(response => response.json())
  .then(document.querySelector('#flashcard-container').innerHTML = "")
  .then(flashcards => {
    flashcards.data.forEach(fc => {
      displayFlashcard(fc)
    })
  })
}

function displayFlashcard(card) {
  const flashcardMarkup = `

    <div data-id=${card.id}>
      <h2>${card.attributes.term}</h2>
      <h4>${card.attributes.subject.name}</h4>
      <p>${card.attributes.definition}</p>
      <br>
    </div>`;

    document.querySelector('#flashcard-container').innerHTML += flashcardMarkup
}

function createFormHandler(e) {
  e.preventDefault()
  const termInput = document.querySelector('#term').value
  const definitionInput = document.querySelector('#definition').value
  const subjectId = parseInt(document.querySelector('#subject').value)
  const userId = 1
  postFetch (termInput, definitionInput, subjectId, userId)
}

function postFetch (term, definition, subject_id, user_id) {
  const flashcardFormData = {term, definition, subject_id, user_id}

  fetch(endPoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(flashcardFormData)
  })

  .then(response => response.json())
  .then(flashcard => {
    console.log(flashcard);
    getFlashcards()
    })
}

function newUser {
  //new user form, just username
  //posts new user to database
  //also logs in user
}

function loginUser {
  //needs to set current_user
}

function logout {
  //unset current_user
}

function nextCard {
  // render the "front" of the next next flashcard
}

function flipCard {
  // flip card to reveal answer
}

function selectRandomFlashcard {
  // use a random number generator to select a flashcard
  // use this in the nextFlashcard
}

function selectStudyMode {
  // select what is considered the "front" of the card - term or definition
}

function selectMineOrAll {
  // allow user to only see their own flashcards or to use globally
  // created flashcards for a given subject
}

function fetchSubject {
  // select a Subject to view its flashcards
}
