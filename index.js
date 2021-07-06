const endPoint = "http://127.0.0.1:3000/api/v1/flashcards"

document.addEventListener('DOMContentLoaded', () => {
  getFlashcards()

  let createFlashcardForm = document.querySelector("#create_flashcard_form")

  createFlashcardForm.addEventListener("submit", (e) => createFormHandler(e))
});


function getFlashcards() {
  fetch(endPoint)
  .then(response => response.json())
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
  console.log(termInput, definitionInput, subjectId, userId)
  postFetch (termInput, definitionInput, subjectId, userId)
}

function postFetch (term, definition, subject_id, user_id) {
  fetch(endPoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      term: term,
      definition: definition,
      subject_id: subject_id,
      user_id: user_id
    })
  })

  .then(response => response.json())
  .then(flashcard => {
    console.log(flashcard);
  //   const flashcardData = flashcard.data.attributes
  //
  //   const flashcardMarkup = `
  //   <div data-id=${card.id}>
  //     <h2>${card.term}</h2>
  //     <h4>${card.subject.name}</h4>
  //     <p>${card.definition}</p>
  //     <br>
  //   </div>`;
  //
  // document.querySelector('#flashcard-container').innerHTML += flashcardMarkup;
    })
  }
