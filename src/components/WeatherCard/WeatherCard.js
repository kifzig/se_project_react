import "./WeatherCard.css";
// import { weatherOptions } from "../../utils/constants.js";
import { weatherBackgrounds } from "../../utils/constants.js";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherBackground = weatherBackgrounds.find((background) => {
    return background.day === day && background.type === type;
  });

  const weatherBackgroundUrl = weatherBackground
    ? weatherBackground.url || ""
    : "";
  const weatherBackgroundColor = weatherBackground
    ? weatherBackground.background_color || ""
    : "";

  return (
    <section id="weather" className="weather">
      <div
        className="weather__bar"
        style={{ backgroundColor: weatherBackgroundColor }}
      >
        <div className="weather__temp">
          {weatherTemp}° {currentTemperatureUnit}
        </div>
        <img
          src={weatherBackgroundUrl}
          alt="Weather"
          className="weather__icons"
        />
      </div>
    </section>
  );
};

//
{
  /* const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const weatherOption = weatherOptions.find((option) => {
    return option.day === day && option.type === type;
  });

  const weatherOptionUrl = weatherOption ? weatherOption.url || "" : "";

  return (
    <section id="weather" className="weather">
      <div className="weather__info">{weatherTemp}° F</div>
      <img src={weatherOptionUrl} alt="Weather" className="weather__image" />
    </section>
  );
}; */
}

//
export default WeatherCard;
