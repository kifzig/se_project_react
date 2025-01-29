/* components/App/App.js */
// import logo from "../../logo.svg";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
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
  removeCardLike,
  addCardLike,
} from "../../utils/Api";
import { signin, signup, editProfile, fetchUserData } from "../../utils/auth";
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
    console.log("register");
    console.log("activeModal:", activeModal);
  };

  const handleEditProfileModal = () => {
    setActiveModal("editProfile");
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
    addClothingItem(
      values.name,
      values.imageUrl,
      values.weather,
      currentUser._id
    )
      .then((response) => {
        const newItem = response.data;
        const newClothing = [newItem, ...clothingArray];
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

  const handleEditProfile = (values) => {
    editProfile(values)
      .then((userData) => {
        setCurrentUser(userData.data);
        handleCloseModal();
        console.log(userData);
        history.push("/profile");
      })
      .catch((err) => {
        console.log("Error in handleEditProfile");
      });
  };

  const handleDeleteItem = (values) => {
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

  const handleCardLike = ({ id, isLiked }) => {
    console.log("handleCardLike from App.js");
    const token = localStorage.getItem("jwt");
    // Check if this card is now liked
    console.log("isLiked from App ", isLiked);
    isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        // the first argument is the card's id
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingArray((cards) => {
              return cards.map((c) => (c._id === id ? updatedCard.data : c));
            });
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array

        // the first argument is the card's id
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingArray((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch((err) => console.log(err));
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
          <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
            <Profile
              onSelectCard={handleSelectedCard}
              clothingArr={clothingArray}
              onCreateModal={handleCreateModal}
              onLogOut={handleLogOut}
              onEditProfile={handleEditProfile}
              onProfileChange={handleEditProfileModal}
              onCardLike={handleCardLike}
              isLoggedIn={isLoggedIn}
            ></Profile>
          </ProtectedRoute>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              dayOrNight={isDay}
              clothingArr={clothingArray}
              onCardLike={handleCardLike}
              isLoggedIn={isLoggedIn}
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
        {activeModal === "editProfile" && (
          <EditProfileModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "editProfile"}
            onEditProfile={handleEditProfile}
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
            onRegisterClick={handleRegisterModal}
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "register"}
            onRegister={handleRegister}
            onLoginClick={handleLoginModal}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
