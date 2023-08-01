import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants.js";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section id="weather" className="weather">
      <div className="weather__info">{weatherTemp}° F</div>
      <img src={imageSrcUrl} alt="Weather" className="weather__image" />
    </section>
  );
};

export default WeatherCard;
