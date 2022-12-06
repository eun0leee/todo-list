navigator.geolocation.getCurrentPosition(success, error);

function success(obj) {
  const lat = obj.coords.latitude;
  const lon = obj.coords.longitude;

  getWeather(lat, lon);
}

function getWeather(lat, lon) {
  const currentLocationEl = document.querySelector(".location");
  const weatherEl = document.querySelector(".weather");
  const locationText = document.createElement("span");
  locationText.className = "text";
  const weatherText = document.createElement("span");
  weatherText.className = "text";

  const apiKey = "3c0979e48a1d50e080c610667f291919";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      const currentLocation = data.name;
      const weather = data.weather[0].main;

      locationText.innerText = currentLocation;
      weatherText.innerText = weather;

      currentLocationEl.append(locationText);
      weatherEl.append(weatherText);
    });
}

function error() {
  alert("we can't find you");
}

//
