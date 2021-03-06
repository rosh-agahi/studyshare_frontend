const endPointFlashcards = "http://127.0.0.1:3000/api/v1/flashcards";
const endPointSubjects   = "http://127.0.0.1:3000/api/v1/subjects";

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
      <input class="username" id="username_input" type="text" name="username_input" placeholder="username"></input>
      <input class="button" id="login_button" name="login_button" type="submit" value="Login"></input>
    </form>
  </div>
  <p id="error_message"></p>
`
  populateFlaschardField(login)
}

function updateHeadingOnLogin(username) {
  document.querySelector('#welcome').innerHTML = "Hey there, "
  document.querySelector('#exclamation').innerHTML = "!"
  document.querySelector('#user').innerHTML = username;
  document.querySelector('#action_buttons').innerHTML = `
    <input class="button" id="add_subject"    onclick="renderSubjectForm()"   type="submit"   value="Add New Subject"></input>
    <input class="button" id="add_flashcard"  onclick="renderFlashcardForm()" type="submit"   value="Add New Flashcard"></input>
    <input class="button" id="study_button"   onclick="studySelections()"     type="submit"   value="Study"></input>
    <input class="button" id="logout_button"  onclick="logout()"              type="submit"   value="Logout"></input>
    `
}

function renderFlashcardForm() {
  const flashcardForm = `
  <form id="create_flashcard_form" autocomplete="off">
    <select id="subject" type="text" name="subject">
      <option disabled="" selected="selected">Select Subject</option>

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

  hideStudyButtons()
}

function hideStudyButtons() {
  document.querySelector('#buttons').innerHTML = ""
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

  hideStudyButtons()
}

function getSubjects(form) {
  Subject.all.length = 0, //this clears out the Subjects array

  fetch(endPointSubjects)
  .then(response => response.json())
  .then(subjects => {
    subjects.data.forEach(s => {
      let newSubject = new Subject(s, s.attributes)
      addSubjectToSelector(newSubject, form)
    })
  })
}

function usernameErrors(message) {
  document.querySelector('#error_message').innerHTML = message
}

function addSubjectToSelector(subject, formField) {
  const subjectSelectorMarkup = `
  <option value="${subject.id}">${subject.name}</option>
  `
  document.querySelector(formField).innerHTML += subjectSelectorMarkup
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
    })

  populateFlaschardField(`<div>New Flashcard added for "${term}"</div>` );
}

function createSubjectFormHandler(e) {
  e.preventDefault()
  const nameInput = document.querySelector('#name').value
  postSubjectFetch(nameInput);
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
