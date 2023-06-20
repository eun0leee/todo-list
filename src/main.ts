import '@/reset-css.css';
import '@/main.css';
import clock from '@utils/clock';
import { success, error } from '@utils/location-and-weather';
import username from '@utils/username';
import { todoFormEl, filterBtn, titlebarBtn } from '@utils/store';
import {
  handleGetTodos,
  handleAddTodos,
  handleFilter,
} from '@utils/handleTodo';

// clock
setInterval(clock, 1000, '.taskbar-clock');

// weather and location
navigator.geolocation.getCurrentPosition(success, error);

// username
const signinFormEl = document.querySelector('.type-name-form');
const signinInputEl = document.querySelector('type-name-input');
const printNameEl = document.querySelector('.print-name');
const signoutBtn = document.querySelector('.signoutbtn');
username(signinFormEl, signinInputEl, printNameEl, signoutBtn);

// titlebarBtn
titlebarBtn?.addEventListener('click', () => {
  alert("can't close 😀");
});

// get
handleGetTodos();

// add
todoFormEl?.addEventListener('submit', handleAddTodos);

// filter
filterBtn?.addEventListener('click', handleFilter);
