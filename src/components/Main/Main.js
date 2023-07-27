import WeatherCard from "../WeatherCard/WeatherCard.js";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants.js";
import "./Main.css";
import { useMemo } from "react";

const Main = ({ weatherTemp, onSelectCard }) => {
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={true} type="sunny" weatherTemp={weatherTemp} />
      <section id="clothing-section" className="clothing">
        <div className="clothing__intro">
          Today is {weatherTemp}° F / You may want to wear:
        </div>
        <div className="clothing__cards">
          {filteredCards.map((item, index) => (
            <ItemCard item={item} onSelectCard={onSelectCard} key={index} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
