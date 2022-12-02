navigator.geolocation.getCurrentPosition(success, error);

function success(obj) {
  const lat = obj.coords.latitude;
  const lon = obj.coords.longitude;

  getWeather(lat, lon);
}

function getWeather(lat, lon) {
  const currentLocationEl = document.querySelector(".location span:first-child");
  const weatherEl = document.querySelector(".location span:last-child");

  const apiKey = "3c0979e48a1d50e080c610667f291919";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      const currentLocation = data.name;
      const weather = data.weather[0].main;

      currentLocationEl.innerText = currentLocation;
      weatherEl.innerText = weather;
    });
}

function error() {
  alert("we can't find you");
}
