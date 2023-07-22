const weatherOptions = [
  { url: "/images/day/day_sunny.svg", day: true, type: "sunny" },
  { url: "/images/day/day_cloudy.svg", day: true, type: "cloudy" },
  { url: "/images/day/day_rain.svg", day: true, type: "rain" },
  { url: "/images/day/day_snow.svg", day: true, type: "snow" },
  { url: "/images/day/day_fog.svg", day: true, type: "fog" },
  { url: "/images/day/day_storm.svg", day: true, type: "storm" },
  { url: "/images/night/night_sunny.svg", day: false, type: "sunny" },
  { url: "/images/night/night_cloudy.svg", day: false, type: "cloudy" },
];

const WeatherCard = ({ day, type }) => {
  console.log("weather card");
  const imageSrc = weatherOptions.filter((i) => {
    console.log(i);
    return i.day === day && i.type === type;
  });

  console.log(imageSrc);

  return (
    <section id="weather" className="weather">
      <div className="weather__info">99°F</div>
      <img
        src="images/day/day_sunny.svg"
        alt="Weather"
        className="weather__image"
      />
    </section>
  );
};

export default WeatherCard;
