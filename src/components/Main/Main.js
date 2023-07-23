import WeatherCard from "../WeatherCard/WeatherCard.js";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../util/constants";

//const weatherTemp = "75° F";
const Main = ({ weatherTemp }) => {
  return (
    <main className="main">
      <WeatherCard day={false} type="rain" weatherTemp={weatherTemp} />
      <section id="clothing-section" className="clothing">
        <div className="clothing__intro">
          Today is {weatherTemp} / You may want to wear:
        </div>
        <div className="clothing__cards">
          {defaultClothingItems.map((item) => (
            <ItemCard item={item} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
