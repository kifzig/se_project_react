// import logo from "../../logo.svg";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
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

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [isDay, setDayOrNight] = useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingArray, setClothingArray] = useState([]);

  const handleCreateModal = () => {
    setActiveModal("create");
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
    addClothingItem(values.name, values.imageUrl, values.weather).then(
      (data) => {
        clothingArray.push(data);
        console.log(clothingArray);
        setClothingArray(clothingArray);
      }
    );
    handleCloseModal();
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
        {
          handleCloseModal();
        }
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
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} city={location} />
        <Switch>
          <Route path="/profile">
            <Profile
              onSelectCard={handleSelectedCard}
              clothingArr={clothingArray}
            ></Profile>
          </Route>
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
