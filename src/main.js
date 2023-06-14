import './reset-css.css';
import './main.css';
import clock from '/src/utils/clock.js';
import { success, error } from '/src/utils/location-and-weather.js';
import username from '/src/utils/username.js';
import { todoFormEl, todoUlEl, filterBtn } from './utils/store';
import {
  handleGetTodos,
  handleAddTodos,
  handleFilter,
} from '/src/utils/todo.js';

(() => {
  //username
  const signinFormEl = document.querySelector('.type-name-form');
  const signinInputEl = signinFormEl.querySelector('input');
  const printNameEl = document.querySelector('.print-name');
  const signoutBtn = document.querySelector('.signoutbtn');
  username(signinFormEl, signinInputEl, printNameEl, signoutBtn);

  // get
  handleGetTodos();

  // add
  todoFormEl.addEventListener('submit', handleAddTodos);

  // filter
  filterBtn.addEventListener('click', handleFilter);
})();
