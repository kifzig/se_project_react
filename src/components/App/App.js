/* components/App/App.js */
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
import { Switch, Route, useHistory } from "react-router-dom";
import {
  getClothingItems,
  deleteClothingItem,
  addClothingItem,
} from "../../utils/Api";
import { signin, signup, fetchUserData } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"; // import our wrapper component
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [isDay, setDayOrNight] = useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingArray, setClothingArray] = useState([]);
  // const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

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

  const handleLogOut = () => {
    localStorage.clear();
    setCurrentUser({});
    setIsLoggedIn(false);
    history.push("/");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItemSubmit = (values) => {
    console.log("handleitemsubmit");
    console.log(values);
    addClothingItem(
      values.name,
      values.imageUrl,
      values.weather,
      currentUser._id
    )
      .then((data) => {
        const newClothing = [data, ...clothingArray];
        console.log("New clothing array ", newClothing);
        setClothingArray(newClothing);
        handleCloseModal();
      })
      .then(() => {
        history.push("/profile");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = (values) => {
    signin(values.email, values.password)
      .then((data) => {
        const { token } = data;
        localStorage.setItem("jwt", token);
        return fetchUserData(token);
      })
      .then((userData) => {
        handleCloseModal();
        setCurrentUser(userData);
        setIsLoggedIn(true);
        history.push("/profile");
      })
      .catch((err) => {
        console.log("Error in handlelogin");
      });
  };

  const handleRegister = (values) => {
    console.log("Register values: ", values);
    signup(values.name, values.avatar, values.email, values.password)
      .then((data) => {
        console.log("Signup response data", data);
        const { token } = data;
        if (!token) {
          throw new Error("No token found in signup response");
        }
        localStorage.setItem("jwt", token);
        return fetchUserData(token);
      })
      .then((userData) => {
        console.log("User data: ", userData);
        handleCloseModal();
        setCurrentUser(userData);
        setIsLoggedIn(true);
        console.log("From handle register");
        history.push("profile");
      })
      .catch((err) => {
        console.log("Error in handlelRegister: ", err.message);
      });
  };

  const handleDeleteItem = (values) => {
    console.log(values);
    deleteClothingItem(values._id)
      .then((data) => {
        console.log(data);
        const idToDelete = values._id;
        const updatedArray = clothingArray.filter((item) => {
          return item._id !== idToDelete;
        });
        console.log(updatedArray); // This is blank
        setClothingArray(updatedArray);
        handleCloseModal();
      })
      .then(() => {
        history.push("/profile");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserData(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(() => localStorage.removeItem("jwt"));
    }
  }, []);

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
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        {/* <Header
          onCreateModal={handleCreateModal}
          onLoginClick={handleLoginModal}
          onRegisterClick={handleRegisterModal}
          city={location}
        /> */}

        <Header
          onCreateModal={handleCreateModal}
          onLoginClick={handleLoginModal}
          onRegisterClick={handleRegisterModal}
          city={location}
          isLoggedIn={isLoggedIn}
          // currentUser,
        />

        {/* {!isLoggedIn && (
          <Header
            onCreateModal={handleCreateModal}
            onLoginClick={handleLoginModal}
            onRegisterClick={handleRegisterModal}
            city={location}
            // currentUser,
          />
        )} */}

        <Switch>
          {/* How do I protect the profile route? */}
          <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
            <Profile
              onSelectCard={handleSelectedCard}
              clothingArr={clothingArray}
              onCreateModal={handleCreateModal}
              onLogOut={handleLogOut}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
