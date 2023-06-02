import './css/reset-css.css';
import './css/main.css';

import Home from './pages/Home.js';
import clock from './js/clock.js';
import { success, error } from './js/location-and-weather.js';
// import './js/username.js';

// main home markup
Home();

// clock
setInterval(clock, 1000, '.task-clock');

// loacation and weather
navigator.geolocation.getCurrentPosition(success, error);
