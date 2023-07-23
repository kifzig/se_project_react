import "./WeatherCard.css";

const weatherOptions = [
  {
    url: require("../../images/day/day_sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../../images/day/day_cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../../images/day/day_rain.svg").default,
    day: true,
    type: "rain",
  },
  {
    url: require("../../images/day/day_snow.svg").default,
    day: true,
    type: "snow",
  },
  {
    url: require("../../images/day/day_fog.svg").default,
    day: true,
    type: "fog",
  },
  {
    url: require("../../images/day/day_storm.svg").default,
    day: true,
    type: "storm",
  },
  {
    url: require("../../images/night/night_sunny.svg").default,
    day: false,
    type: "sunny",
  },
  {
    url: require("../../images/night/night_cloudy.svg").default,
    day: false,
    type: "cloudy",
  },
  {
    url: require("../../images/night/night_rain.svg").default,
    day: false,
    type: "rain",
  },
  {
    url: require("../../images/night/night_snow.svg").default,
    day: false,
    type: "snow",
  },
  {
    url: require("../../images/night/night_fog.svg").default,
    day: false,
    type: "fog",
  },
  {
    url: require("../../images/night/night_storm.svg").default,
    day: false,
    type: "storm",
  },
];

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section id="weather" className="weather">
      <div className="weather__info">{weatherTemp}</div>
      <img src={imageSrcUrl} alt="Weather" className="weather__image" />
    </section>
  );
};

export default WeatherCard;
