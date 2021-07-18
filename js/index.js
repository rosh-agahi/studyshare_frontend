const endPointFlashcards = "http://127.0.0.1:3000/api/v1/flashcards";
const endPointSubjects   = "http://127.0.0.1:3000/api/v1/subjects";

//for studyLoop
let studyCards = [];
let selectedSubject = 0;
let countup = 0;



document.addEventListener('DOMContentLoaded', () => {

  requestLogin()

  document.querySelector("#register_button").addEventListener("click", (e) => createUserRegisterHandler(e))
  document.querySelector("#login_button").addEventListener("click", (e) => createUserLoginHandler(e))
});

function populateFlaschardField(markup) {
  document.querySelector('#flashcard').innerHTML = markup
}

function requestLogin() {
  const login = `
  <p class="box"><strong>Enter a username to begin.</strong> <br>All flashcards you create will be stored under this username when you come back later.</p>
  <p class="box">Good luck studying! You're gonna ace this.</p>
  <br>
  <div class="user_login_form" autocomplete="off">
    <form id="login" autocomplete="off">
      <input class="button" id="register_button" name="register_button" type="submit" value="Register"></input>
      <input class="text_field" id="username_input" type="text" name="username_input" placeholder="username"></input>
      <input class="button" id="login_button" name="login_button" type="submit" value="Login"></input>
    </form>
  </div>
  <p id="error_message"></p>
`
  populateFlaschardField(login)
}

function showControls() {
  const controls = `
    <p>Select Subject: </p>
      <select id="subject_selector_input" type="text" name="subject_selector_input">

      </select>
      <button id="select_subject" onclick="studyLoop()">Start Studying</button>

    <br>

    <p>Flashcard scope: </p>
    <div id="flashcard_scope">
      <button id="my_cards" class="mode_button">My Cards</button>
      <button id="all_cards" class="mode_button">All Cards</button>
    </div>

    <br><br>
    <div class="new_buttons">
      <button onclick="renderFlashcardForm()" style="margin: 5px;" id="new_flashcard" class="button">Add New Card</button>
      <button onclick="renderSubjectForm()" style="margin: 5px;" id="new_subject" class="button">Add New Subject</button>
    </div>
  `
  document.querySelector('#left_column').innerHTML = controls

  getSubjects('#subject_selector_input')

}

function renderFlashcardForm() {
  const flashcardForm = `
  <form id="create_flashcard_form" autocomplete="off">
    <select id="subject" type="text" name="subject" placeholder="Select or Create New Subject">

    </select>
    <br>
    <input id="term" type="text" name="term" placeholder="Term"></input>
    <br>
    <textarea id="definition" type="text" name="definition" placeholder="Definition"></textarea>
    <br>
    <input id="submit" name="submit" type="submit" value="Add Flashcard"></input>
  </form>
  `
  populateFlaschardField(flashcardForm)
  getSubjects('#subject')
  hideStudyButtons()

  let createFlashcardForm = document.querySelector("#create_flashcard_form")
  createFlashcardForm.addEventListener("submit", (e) => createFormHandler(e))
}

function hideStudyButtons() {
  document.querySelector('#buttons').innerHTML = ""
}

// function showStudyButtons() {
//   const buttons = `
//   <button id="reveal" class="button">Reveal</button>
//   <button id="next" class="button">Next</button>
// `
//   document.querySelector('#buttons').innerHTML = buttons
// }

function renderSubjectForm() {
  const subjectForm = `
  <form id="create_subject_form" autocomplete="off">
    <input id="name" type="text" name="name" placeholder="Subject Name"></input>
    <br>
    <input id="submit" name="submit" type="submit" value="Add Subject"></input>
  </form>
  `
  populateFlaschardField(subjectForm)

  let createSubjectForm = document.querySelector("#create_subject_form")
  createSubjectForm.addEventListener("submit", (e) => createSubjectFormHandler(e))
}

function getSubjects(form) {
  document.querySelector(form).innerHTML = ""
  fetch(endPointSubjects)
  .then(response => response.json())
  .then(subjects => {
    subjects.data.forEach(s => {
      let newSubject = new Subject(s, s.attributes)
      addSubjectToSelector(s, form)
    })
  })
}



function updateHeadingOnLogin(username) {
  document.querySelector('#welcome').innerHTML = "Hey there, "
  document.querySelector('#exclamation').innerHTML = "!"
  document.querySelector('#user').innerHTML = username;
  document.querySelector('#user_logout_button').innerHTML = '<input class="button" id="logout_button" onclick="logout()" type="submit" value="Logout"></input>'
}

function usernameErrors(message) {
  document.querySelector('#error_message').innerHTML = message
}

function addSubjectToSelector(subject, formField) {
  const subjectSelectorMarkup = `
  <option value="${subject.id}">${subject.attributes.name}</option>
  `
  document.querySelector(formField).innerHTML += subjectSelectorMarkup
}

function getFlashcards(array) {
  num = 0;

  fetch(endPointFlashcards)
  .then(response => response.json())
  .then(flashcards => {
    flashcards.data.forEach(fc => {
      if (fc.attributes.subject_id == selectedSubject) {
        array.push(fc.attributes)
        num++
        document.querySelector('#count').innerHTML = `Flashcards: ${num}`
      }
    })
  });

  return array;

}

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


function createFormHandler(e) {
  e.preventDefault()
  const termInput = document.querySelector('#term').value
  const definitionInput = document.querySelector('#definition').value
  const subjectId = parseInt(document.querySelector('#subject').value)
  const userId = matchingUserID
  postFlashcardFetch(termInput, definitionInput, subjectId, userId)
}

function postFlashcardFetch(term, definition, subject_id, user_id) {
  const flashcardFormData = {term, definition, subject_id, user_id}

  fetch(endPointFlashcards, {
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

function createSubjectFormHandler(e) {
  e.preventDefault()
  const nameInput = document.querySelector('#name').value
  postSubjectFetch(nameInput);
  getSubjects('#subject_selector_input')

}

function postSubjectFetch (name) {
  const subjectFormData = {name}

  fetch(endPointSubjects, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(subjectFormData)
  })

  populateFlaschardField(`<div>New Subject Added! You can begin adding flashcards for it now :)</div>` );
}

function logout() {
  location.reload()
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
