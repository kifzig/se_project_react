const weatherOptions = [
  { url: "/images/day/day_sunny.svg", day: true, type: "sunny" },
  { url: "/images/day/day_cloudy.svg", day: true, type: "cloudy" },
  { url: "/images/day/day_rain.svg", day: true, type: "rain" },
  { url: "/images/day/day_snow.svg", day: true, type: "snow" },
  { url: "/images/day/day_fog.svg", day: true, type: "fog" },
  { url: "/images/day/day_storm.svg", day: true, type: "storm" },
  { url: "/images/night/night_sunny.svg", day: false, type: "sunny" },
  { url: "/images/night/night_cloudy.svg", day: false, type: "cloudy" },
  { url: "/images/night/night_rain.svg", day: false, type: "rain" },
  { url: "/images/night/night_snow.svg", day: false, type: "snow" },
  { url: "/images/night/night_fog.svg", day: false, type: "fog" },
  { url: "/images/night/night_storm.svg", day: false, type: "storm" },
];

const WeatherCard = ({ day, type }) => {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section id="weather" className="weather">
      <div className="weather__info">99°F</div>
      <img src={imageSrcUrl} alt="Weather" className="weather__image" />
    </section>
  );
};

export default WeatherCard;
