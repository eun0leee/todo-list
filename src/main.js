import './css/reset-css.css';
import './css/main.css';

import Home from './pages/Home.js';
import clock from './js/clock.js';
import { success, error } from './js/location-and-weather.js';
import username from './js/username.js';

// main home markup
Home();

// clock
setInterval(clock, 1000, '.taskbar-clock');

// loacation and weather
navigator.geolocation.getCurrentPosition(success, error);

// username
const signinFormEl = document.querySelector('.type-name-form');
const signinInputEl = signinFormEl.querySelector('input');
const printNameEl = document.querySelector('.print-name');
const signoutBtn = document.querySelector('.signoutbtn');
username(signinFormEl, signinInputEl, printNameEl, signoutBtn);
