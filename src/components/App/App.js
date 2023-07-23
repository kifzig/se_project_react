// import logo from "../../logo.svg";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

const weatherTemp = "75° F";

function App() {
  return (
    <div>
      <Header />
      <Main weatherTemp={weatherTemp} />
      <Footer />
    </div>
  );
}

export default App;
