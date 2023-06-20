import { welcomeEl } from '@utils/store';

const username = (
  signinFormEl: Element | null,
  signinInputEl: Element | null,
  printNameEl: Element | null,
  signoutBtn: Element | null
) => {
  const HIDDEN_CLASS = 'hidden';
  const USER_STORAGE_KEY = 'windows95 todo-list username';

  if (!signinFormEl || !signinInputEl || !printNameEl || !signoutBtn) return;

  const printUsername = (username: string) => {
    printNameEl.textContent = `${username}!!!!!!!`;
    printNameEl.classList.remove(HIDDEN_CLASS);
    signoutBtn.classList.remove(HIDDEN_CLASS);
  };

  const initialize = () => {
    const userLocaldata = localStorage.getItem(USER_STORAGE_KEY);
    if (!welcomeEl) return;

    if (userLocaldata) {
      printUsername(userLocaldata);
      welcomeEl.textContent = "Let's do it!";
    } else {
      signinFormEl.classList.remove(HIDDEN_CLASS);
      welcomeEl.textContent = 'Welcome!';
    }
  };

  const handleSignIn = (e: any) => {
    e.preventDefault();
    const username = (signinInputEl as HTMLInputElement).value;
    localStorage.setItem(USER_STORAGE_KEY, username);
    signinFormEl.classList.add(HIDDEN_CLASS);
    printUsername(username);
    if (!welcomeEl) return;
    welcomeEl.textContent = "Let's do it!";
  };

  const handleSignOut = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    (signinInputEl as HTMLInputElement).value = '';
    signinFormEl.classList.remove(HIDDEN_CLASS);
    printNameEl.classList.add(HIDDEN_CLASS);
    signoutBtn.classList.add(HIDDEN_CLASS);
    if (!welcomeEl) return;
    welcomeEl.textContent = 'Welcome!';
  };

  initialize();

  signinFormEl.addEventListener('submit', handleSignIn);
  signoutBtn.addEventListener('click', handleSignOut);
};

export default username;
