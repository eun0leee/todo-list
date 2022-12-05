const loginformEl = document.querySelector(".form");
const inputEl = loginformEl.querySelector("input");
const usernameEl = document.querySelector(".username");
const signoutBtn = document.querySelector(".signoutbtn");
const HIDDEN = "hidden";
const USER = "windows todo-list username";

//유저 등록 여부에 따라 다른 화면 출력
const userLocaldata = localStorage.getItem(USER);
if (userLocaldata) {
  printUsername(userLocaldata);
} else {
  loginformEl.classList.remove(HIDDEN);
}

//로그인(유저네임 입력)
loginformEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = inputEl.value;
  localStorage.setItem(USER, username);

  loginformEl.classList.add(HIDDEN);
  printUsername(username);
});

//유저네임 출력
function printUsername(username) {
  usernameEl.innerText = `${username}!!!!!!!`;

  usernameEl.classList.remove(HIDDEN);
  signoutBtn.classList.remove(HIDDEN);
}

//로그아웃
signoutBtn.addEventListener("click", signout);

function signout() {
  localStorage.removeItem(USER);

  inputEl.value = "";
  loginformEl.classList.remove(HIDDEN);
  usernameEl.classList.add(HIDDEN);
  signoutBtn.classList.add(HIDDEN);
}
