// import logo from "../../logo.svg";
import "./App.css";
import Header from "../Header/Header.js";
import WeatherCard from "../WeatherCard/WeatherCard.js";

function App() {
  return (
    <div>
      <Header />
      <main className="main">
        <WeatherCard day={true} type="cloudy" />
        <section id="clothing-cards">Card Section</section>
      </main>
    </div>
  );
}

export default App;
