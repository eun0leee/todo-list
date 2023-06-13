const username = (signinFormEl, signinInputEl, printNameEl, signoutBtn) => {
  const HIDDEN = 'hidden';
  const USER = 'windows95 todo-list username';

  // print user name
  const printUsername = (username) => {
    printNameEl.innerText = `${username}!!!!!!!`;

    printNameEl.classList.remove(HIDDEN);
    signoutBtn.classList.remove(HIDDEN);
  };

  // local storage
  const userLocaldata = localStorage.getItem(USER);
  if (userLocaldata) {
    printUsername(userLocaldata);
  } else {
    signinFormEl.classList.remove(HIDDEN);
  }

  // sign in
  signinFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = signinInputEl.value;

    localStorage.setItem(USER, username);
    signinFormEl.classList.add(HIDDEN);
    printUsername(username);
  });

  // sign out
  signoutBtn.addEventListener('click', () => {
    localStorage.removeItem(USER);

    signinInputEl.value = '';
    signinFormEl.classList.remove(HIDDEN);
    printNameEl.classList.add(HIDDEN);
    signoutBtn.classList.add(HIDDEN);
  });
};

export default username;
