const endPointUsers      = "http://127.0.0.1:3000/api/v1/users";
const endPointLogin      = "http://127.0.0.1:3000/api/v1/login";

// for user
let userLoggedIn = [false];
let i = 0;
let matchingUserId = 0;

// --user registration functions:---------------------------

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

// --user login functions:------------------------------------

function createUserLoginHandler(e) {
  e.preventDefault()
  usernameErrors("")
  const userLoginInput = document.querySelector('#username_input').value
  getUser(userLoginInput)
}

function getUser(findUser) {
  fetch(endPointUsers)
  .then(response => response.json())
  .then(users => {
    users.data.forEach(u => {
      if (u.attributes.username == findUser) {
        i += 1;
        updateHeadingOnLogin(findUser);
        //getSubjects()
        matchingUserID = u.id;
      }
    })
  if (i > 0) {
    userLoggedIn = true;
    populateFlaschardField('<p class="box"> Use the navigation to the left to select a subject and start studying, add a new subject, or add flashcards for existing subjects.</p>');
    //showControls()
    }
  if (i == 0) {usernameErrors("User Not Found. Hit Register.")}
  })
}

// reloading the page will clear the variable that stores the user => like logging out/deleting session
function logout() {
  location.reload()
}
