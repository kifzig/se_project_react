// import logo from "../../logo.svg";
import "./App.css";
import Header from "../Header/Header.js";

function App() {
  return (
    <div>
      <Header />
      <main>
        <section id="weather" className="weather">
          <div> 75F</div>
          <div>
            <img src="images/day/day_sunny.svg" alt="Weather" />
          </div>
        </section>
        <section id="clothing-cards">Card Section</section>
      </main>
    </div>
  );
}

export default App;
