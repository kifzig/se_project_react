// Call to API - request
// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}
import { latitude, longitude, apiKey } from "./constants";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  return Math.ceil(temperature);
};

const response = {
  coord: {
    lon: 98.49,
    lat: 29.42,
  },
  weather: [
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds",
      icon: "04n",
    },
  ],
  base: "stations",
  main: {
    temp: 46.8,
    feels_like: 45.5,
    temp_min: 46.8,
    temp_max: 46.8,
    pressure: 1013,
    humidity: 89,
    sea_level: 1013,
    grnd_level: 641,
  },
  visibility: 10000,
  wind: {
    speed: 3.6,
    deg: 151,
    gust: 4.79,
  },
  clouds: {
    all: 98,
  },
  dt: 1690147066,
  sys: {
    country: "CN",
    sunrise: 1690152052,
    sunset: 1690201432,
  },
  timezone: 28800,
  id: 1281221,
  name: "Gartog",
  cod: 200,
};
