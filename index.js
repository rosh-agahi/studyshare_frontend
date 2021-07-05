const endPoint = "http://127.0.0.1:3000/api/v1/flashcards"

document.addEventListener('DOMContentLoaded', () => {
  getFlashcards()
})

function getFlashcards() {
  fetch(endPoint)
  .then(response => response.json())
  .then(flashcards => {
    flashcards.data.forEach(flashcard => {
      const flashcardMarkup =
      <div data-id=${flashcard.id}>
        <h2>${flashcard.term}</h2>
        <h2>${flashcard.subject}</h2>
        <p>${flascard.definition}</p>
        <br>
    });
  })
}
