import '/src/reset-css.css';
import '/src/main.css';
import clock from '/src/utils/clock.ts';
import { success, error } from '/src/utils/location-and-weather.ts';
import username from '/src/utils/username.ts';
import { todoFormEl, filterBtn, titlebarBtn } from '/src/utils/store.ts';
import {
  handleGetTodos,
  handleAddTodos,
  handleFilter,
} from '/src/utils/handleTodo.ts';

// username
const signinFormEl = document.querySelector('.type-name-form');
const signinInputEl = signinFormEl.querySelector('input');
const printNameEl = document.querySelector('.print-name');
const signoutBtn = document.querySelector('.signoutbtn');
username(signinFormEl, signinInputEl, printNameEl, signoutBtn);

// titlebarBtn
titlebarBtn.addEventListener('click', () => {
  alert("can't close 😀");
});

// get
handleGetTodos();

// add
todoFormEl.addEventListener('submit', handleAddTodos);

// filter
filterBtn.addEventListener('click', handleFilter);
