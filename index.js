const endPoint = "http://127.0.0.1:3000/api/v1/flashcards"

document.addEventListener('DOMContentLoaded', () => {
  getFlashcards()

  const createFlashcardForm = document.querySelector("#create_flashcard_form")

  createFlashcardForm.addEventListener("submit", (e) => createFormHandler(e))
})


function getFlashcards() {
  fetch(endPoint)
  .then(response => response.json())
  .then(flashcards => {
    flashcards.data.forEach(fc => {
      const flashcardMarkup = `

        <div data-id=${fc.id}>
          <h2>${fc.attributes.term}</h2>
          <h4>${fc.attributes.subject.name}</h4>
          <p>${fc.attributes.definition}</p>
          <br>
        </div>`;

        document.querySelector('#flashcard-container').innerHTML += flashcardMarkup
    })
  })
}

function createFormHandler(e) {
  e.preventDefault()
  const termInput = document.querySelector(#term).value
  const definitionInput = document.querySelector(#definition).value
  const subjectId = parseInt(document.querySelector(#subject).value)
  const userId = parseInt(1)
  postFetch(termInput, definitionInput, subjectId)
}

function postFetch(term, definition, subject, user){

}
