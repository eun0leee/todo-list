import { getServerWeather } from '@api/widgets';
import { hideEl } from '@utils/store';

const getWeather = async (lat: number, lon: number) => {
  const locationEl = document.querySelector('.location');
  const weatherEl = document.querySelector('.weather');
  const loadingSpinners = document.querySelectorAll('.loading-widgets');

  // api call
  const data = await getServerWeather(lat, lon);

  // render
  const createTextElement = (innerText: string) => {
    const element = document.createElement('span');
    element.className = 'text';
    element.innerText = innerText;
    return element;
  };

  locationEl?.append(createTextElement(data.name));
  weatherEl?.append(createTextElement(data.weather[0].main));

  loadingSpinners.forEach((spinner) => {
    hideEl(spinner);
  });
};

const success = (obj: GeolocationPosition) => {
  const { latitude, longitude } = obj.coords;

  getWeather(latitude, longitude);
};

const error = () => alert("we can't find you. TT. Allow location access.");

export { success, error };
