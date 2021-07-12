const endPointFlashcards = "http://127.0.0.1:3000/api/v1/flashcards"
const endPointSubjects   = "http://127.0.0.1:3000/api/v1/subjects"
const endPointUsers      = "http://127.0.0.1:3000/api/v1/users"
const endPointLogin      = "http://127.0.0.1:3000/api/v1/login"

let userLoggedIn = [false]

document.addEventListener('DOMContentLoaded', () => {

  requestLogin()

  document.querySelector("#register_button").addEventListener("click", (e) => createUserRegisterHandler(e))
  document.querySelector("#login_button").addEventListener("click", (e) => createUserLoginHandler(e))
});

function showControls() {
  const controls = `
    <p>Select Subject: </p>
      <select id="subject_selector_input" type="text" name="subject_selector_input">

      </select>
      <button id="select_subject" onclick="getFlashcards()">Start Studying</button>

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

function populateFlaschardField(markup) {
  document.querySelector('#flashcard').innerHTML = markup
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

function showStudyButtons() {
  const buttons = `
  <button id="reveal" class="button">Reveal</button>
  <button id="next" class="button">Next</button>
`
  document.querySelector('#buttons').innerHTML = buttons
}

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
      addSubjectToSelector(s, form)
    })
  })
}

function createUserLoginHandler(e) {
  e.preventDefault()
  usernameErrors("")
  const userLoginInput = document.querySelector('#username_input').value
  getUser(userLoginInput)
}

function getUser(findUser) {
  let i = 0;
  let matchingUserId = 0;

  fetch(endPointUsers)
  .then(response => response.json())
  .then(users => {
    users.data.forEach(u => {
      if (u.attributes.username == findUser) {
        i += 1;
        updateHeadingOnLogin(findUser);
        matchingUserID = u.id;
      }
    })
  if (i > 0) {
    userLoggedIn = true;
    populateFlaschardField('<p class="box"> Use the navigation to the left to select a subject and start studying, add a new subject, or add flashcards for existing subjects.</p>');
    showControls()
    }
  if (i == 0) {usernameErrors("User Not Found. Hit Register.")}
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

function getFlashcards() {

  selectedSubject = parseInt(document.querySelector('#subject_selector_input').value)
  studyCards = []

  fetch(endPointFlashcards)
  .then(response => response.json())
  .then(flashcards => {
    flashcards.data.forEach(fc => {
      if (fc.attributes.subject_id == selectedSubject) { studyCards.push(fc) }
    })
  })
  console.log(studyCards)
}

function displayFlashcard(card) {
  const flashcardMarkup = `
      <h2>${card.attributes.term}</h2>
      <h3>${card.attributes.definition}</h3>`;

  populateFlaschardField(flashcardMarkup)
}

function createUserRegisterHandler(e) {
  e.preventDefault()
  const usernameInput = document.querySelector('#username_input').value
  postUserFetch(usernameInput)
  // handle errors
  // getUser(usernameInput)
}

function postUserFetch(username) {
  const userFormData = {username}

  fetch(endPointUsers, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userFormData)
  })

  .then(response => response.json())
  .then(user => {
    console.log(user);
  })
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

function nextCard() {
  // render the "front" of the next next flashcard
}

function flipCard() {
  // flip card to reveal answer

}

function selectRandomFlashcard() {
  // use a random number generator to select a flashcard
  // use this in the nextFlashcard
}

function selectStudyMode() {
  // select what is considered the "front" of the card - term or definition
}

function selectMineOrAll() {
  // allow user to only see their own flashcards or to use globally
  // created flashcards for a given subject
}

function fetchSubject() {
  // select a Subject to view its flashcards
}
