import './css/reset-css.css';
import './css/main.css';

import home from './pages/home.js';

import clock from './js/clock.js';
// import './js/location-and-weather.js';
// import './js/username.js';

home();

setInterval(clock, 1000, '.task-clock');
