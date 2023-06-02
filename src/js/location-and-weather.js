import { POSITION_KEY } from "./APIkey.js";

const APIKEY = POSITION_KEY;

navigator.geolocation.getCurrentPosition(success, error);

export function success(obj) {
  const lat = obj.coords.latitude;
  const lon = obj.coords.longitude;

  getWeather(lat, lon);
}

export async function getWeather(lat, lon) {
  //api
  const APIKEY = POSITION_KEY;
  const APIURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;

  try {
    const res = await fetch(APIURL);
    const json = await res.json();

    //render
    const locationEl = document.querySelector(".location");
    const weatherEl = document.querySelector(".weather");
    const locationText = document.createElement("span");
    locationText.className = "text";
    const weatherText = document.createElement("span");
    weatherText.className = "text";

    const locationServerData = json.name;
    const weatherServerData = json.weather[0].main;
    locationText.innerText = locationServerData;
    weatherText.innerText = weatherServerData;

    locationEl.append(locationText);
    weatherEl.append(weatherText);
  } catch (error) {
    console.log(error);
  }
}

export function error() {
  alert("we can't find you. TT. Allow location access.");
}
