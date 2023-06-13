import './reset-css.css';
import './main.css';

import Home from '/src/pages/Home.js';

import clock from '/src/utils/clock.js';
import { success, error } from '/src/utils/location-and-weather.js';
import username from '/src/utils/username.js';

//main home markup
Home();

//username
const signinFormEl = document.querySelector('.type-name-form');
const signinInputEl = signinFormEl.querySelector('input');
const printNameEl = document.querySelector('.print-name');
const signoutBtn = document.querySelector('.signoutbtn');

username(signinFormEl, signinInputEl, printNameEl, signoutBtn);
