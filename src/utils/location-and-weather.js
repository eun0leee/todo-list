import { getServerWeather } from '/src/api/widgets';

const getWeather = async (lat, lon) => {
  // api call
  const data = await getServerWeather(lat, lon);

  // render
  const locationEl = document.querySelector('.location');
  const weatherEl = document.querySelector('.weather');
  const locationText = document.createElement('span');
  locationText.className = 'text';
  const weatherText = document.createElement('span');
  weatherText.className = 'text';

  const locationServerData = data.name;
  const weatherServerData = data.weather[0].main;
  locationText.innerText = locationServerData;
  weatherText.innerText = weatherServerData;

  locationEl.append(locationText);
  weatherEl.append(weatherText);
};

const success = (obj) => {
  const latitude = obj.coords.latitude;
  const longitude = obj.coords.longitude;

  getWeather(latitude, longitude);
};

const error = () => {
  alert("we can't find you. TT. Allow location access.");
};

export { success, error };
