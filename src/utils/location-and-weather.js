import { getServerWeather } from '/src/api/widgets';

const getWeather = async (lat, lon) => {
  // api call
  const data = await getServerWeather(lat, lon);

  // render
  const createTextElement = (innerText) => {
    const element = document.createElement('span');
    element.className = 'text';
    element.innerText = innerText;
    return element;
  };

  const locationEl = document.querySelector('.location');
  const weatherEl = document.querySelector('.weather');

  locationEl.append(createTextElement(data.name));
  weatherEl.append(createTextElement(data.weather[0].main));
};

const success = (obj) => {
  const { latitude, longitude } = obj.coords;

  getWeather(latitude, longitude);
};

const error = () => alert("we can't find you. TT. Allow location access.");

navigator.geolocation.getCurrentPosition(success, error);

export { success, error };
