const endPoint = "http://127.0.0.1:3000/api/v1/flashcards"

document.addEventListener('DOMContentLoaded', () => {
  fetch(endPoint)
  .then(response => response.json())
  .then(flashcards => {
    console.log(flashcards);
  })

})
