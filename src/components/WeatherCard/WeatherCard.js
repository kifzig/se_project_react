import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants.js";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
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
};

export default WeatherCard;
