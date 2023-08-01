// Call to API - request
// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}
import { latitude, longitude, apiKey } from "./constants";

const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(processServerResponse);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  return Math.ceil(temperature);
};

export const parseLocation = (data) => {
  const city = data.name;
  return city;
};

// Location via the weather will be depcrecated in the future--this is the recommended way when
// it stops working
// export const getLocation = () => {
//   const geolocationApi = fetch(
//     `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
//   ).then(processServerResponse);
//   return geolocationApi;
// };

export const parseLocationData = (data) => {
  const name = data[0].name;
  return name;
};
