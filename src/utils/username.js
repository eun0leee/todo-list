const username = (signinFormEl, signinInputEl, printNameEl, signoutBtn) => {
  const HIDDEN_CLASS = 'hidden';
  const USER_STORAGE_KEY = 'windows95 todo-list username';

  const printUsername = (username) => {
    printNameEl.innerText = `${username}!!!!!!!`;
    printNameEl.classList.remove(HIDDEN_CLASS);
    signoutBtn.classList.remove(HIDDEN_CLASS);
  };

  const initialize = () => {
    const userLocaldata = localStorage.getItem(USER_STORAGE_KEY);
    if (userLocaldata) {
      printUsername(userLocaldata);
    } else {
      signinFormEl.classList.remove(HIDDEN_CLASS);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const username = signinInputEl.value;
    localStorage.setItem(USER_STORAGE_KEY, username);
    signinFormEl.classList.add(HIDDEN_CLASS);
    printUsername(username);
  };

  const handleSignOut = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    signinInputEl.value = '';
    signinFormEl.classList.remove(HIDDEN_CLASS);
    printNameEl.classList.add(HIDDEN_CLASS);
    signoutBtn.classList.add(HIDDEN_CLASS);
  };

  initialize();

  signinFormEl.addEventListener('submit', handleSignIn);
  signoutBtn.addEventListener('click', handleSignOut);
};

export default username;
