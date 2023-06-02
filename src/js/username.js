const userLocaldata = localStorage.getItem(USER);
if (userLocaldata) {
  printUsername(userLocaldata);
} else {
  loginformEl.classList.remove(HIDDEN);
}

//sign in(input user name)
loginformEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = inputEl.value;
  localStorage.setItem(USER, username);

  loginformEl.classList.add(HIDDEN);
  printUsername(username);
});

//print user name
function printUsername(username) {
  usernameEl.innerText = `${username}!!!!!!!`;

  usernameEl.classList.remove(HIDDEN);
  signoutBtn.classList.remove(HIDDEN);
}

//sign out
signoutBtn.addEventListener('click', signout);

function signout() {
  localStorage.removeItem(USER);

  inputEl.value = '';
  loginformEl.classList.remove(HIDDEN);
  usernameEl.classList.add(HIDDEN);
  signoutBtn.classList.add(HIDDEN);
}

const username = (form, input, username, signoutbtn) => {
  const loginformEl = document.querySelector('.form');
  const inputEl = loginformEl.querySelector('input');
  const usernameEl = document.querySelector('.username');
  const signoutBtn = document.querySelector('.signoutbtn');
  const HIDDEN = 'hidden';
  const USER = 'windows95 todo-list username';
};

export default username;
