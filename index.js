const endPoint = "http://127.0.0.1:3000/api/v1/flashcards"

document.addEventListener('DOMContentLoaded', () => {
  getFlashcards()
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
