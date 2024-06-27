// import logo from "../../logo.svg";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ItemModal from "../ItemModal/ItemModal";
import { useState, useEffect } from "react";
import { getForecastWeather } from "../../utils/WeatherApi";
import { parseWeatherData } from "../../utils/WeatherApi";
import { parseLocation, parseDaytime } from "../../utils/WeatherApi";
import { Switch, Route } from "react-router-dom";
import {
  getClothingItems,
  deleteClothingItem,
  addClothingItem,
} from "../../utils/Api";
import { signin, signup } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"; // import our wrapper component
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [isDay, setDayOrNight] = useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingArray, setClothingArray] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItemSubmit = (values) => {
    console.log(values);
    addClothingItem(values.name, values.imageUrl, values.weather)
      .then((data) => {
        const newClothing = [data, ...clothingArray];

        handleCloseModal();
        setClothingArray(newClothing);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = (values) => {
    signin(values)
      .then(() => {
        setLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegister = (values) => {
    console.log(values);
  };

  const handleDeleteItem = (values) => {
    console.log(values);
    deleteClothingItem(values.id)
      .then((data) => {
        const idToDelete = values.id;
        const updatedArray = clothingArray.filter((item) => {
          return item.id !== idToDelete;
        });
        setClothingArray(updatedArray);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //useEffect for signin and signup?

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        const clothingArray = data;
        setClothingArray(clothingArray);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  useEffect(() => {
    const handleClickClose = (evt) => {
      if (
        evt.target.classList.contains("item_modal") ||
        evt.target.classList.contains("modal")
      ) {
        handleCloseModal();
      }
    };

    document.addEventListener("click", handleClickClose);

    return () => {
      document.removeEventListener("click", handleClickClose);
    };
  }, []);

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const fahrenheitTemperature = parseWeatherData(data);
        const city = parseLocation(data);
        const isDaytime = parseDaytime(data);

        setTemp(fahrenheitTemperature);
        setLocation(city);
        setDayOrNight(isDaytime);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header
        onCreateModal={handleCreateModal}
        onLoginClick={handleLoginModal}
        onRegisterClick={handleRegisterModal}
        city={location}
      />
      <Switch>
        {/* How do I protect the profile route? */}
        <ProtectedRoute path="/profile" loggedIn={loggedIn}>
          <Profile
            onSelectCard={handleSelectedCard}
            clothingArr={clothingArray}
            onCreateModal={handleCreateModal}
          ></Profile>
        </ProtectedRoute>
        <Route exact path="/">
          <Main
            weatherTemp={temp}
            onSelectCard={handleSelectedCard}
            dayOrNight={isDay}
            clothingArr={clothingArray}
          />
        </Route>
      </Switch>
      <Footer />
      {activeModal === "create" && (
        <AddItemModal
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "create"}
          onAddItem={handleAddItemSubmit}
        />
      )}
      {activeModal === "preview" && (
        <ItemModal
          selectedCard={selectedCard}
          onClose={handleCloseModal}
          onDeleteItem={handleDeleteItem}
        />
      )}
      {activeModal === "login" && (
        <LoginModal
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "login"}
          onLogin={handleLogin}
        />
      )}
      {activeModal === "register" && (
        <RegisterModal
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "register"}
          onRegister={handleRegister} // This needs to be changed - only console.log
        />
      )}
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
