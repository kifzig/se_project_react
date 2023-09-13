import WeatherCard from "../WeatherCard/WeatherCard.js";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants.js";
import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

const Main = ({ weatherTemp, onSelectCard, dayOrNight, clothingArr }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const getWeatherType = (temp) => {
    if (currentTemperatureUnit === "C") {
      temp = (temp * 9) / 5 + 32;
    }
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  };

  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || "";

  const weatherType = getWeatherType(temp);

  const filteredCards = clothingArr.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={dayOrNight} type="cloudy" weatherTemp={temp} />
      <section id="clothing-section" className="clothing">
        <div className="clothing__intro">
          Today is {temp}° {currentTemperatureUnit} / You may want to wear:
        </div>
        <div className="clothing__cards">
          {filteredCards.map((item) => (
            <ItemCard item={item} onSelectCard={onSelectCard} key={item.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
