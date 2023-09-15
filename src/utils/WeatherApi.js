// Call to API - request
// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}
import { latitude, longitude, apiKey } from "./constants";
import { processServerResponse } from "./Api";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(processServerResponse);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };
  return weather;
};

export const parseLocation = (data) => {
  const city = data.name;

  return city;
};

export const parseDaytime = (data) => {
  const sunset = data.sys.sunset;
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime < sunset) {
    return true;
  } else return false;
};

// weather.temperature.F = `${Math.round(data.main.temp)}°F`;
// weather.temperature.C = `${Math.round((data.main.temp - 32) * 5/9)}°C`;

// Location via the weather will be depcrecated in the future--this is the recommended way when
// it stops working
// export const getLocation = () => {
//   const geolocationApi = fetch(
//     `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
//   ).then(processServerResponse);
//   return geolocationApi;
// };

// export const parseLocationData = (data) => {
//   const name = data[0].name;
//   return name;
// };
