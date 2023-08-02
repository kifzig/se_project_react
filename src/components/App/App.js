// import logo from "../../logo.svg";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { useState, useEffect } from "react";
import { getForecastWeather } from "../../utils/WeatherApi";
import { parseWeatherData } from "../../utils/WeatherApi";
import { parseLocation } from "../../utils/WeatherApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");

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
        console.log("handleClickClose");
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

        setTemp(fahrenheitTemperature);
        setLocation(city);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <Header onCreateModal={handleCreateModal} city={location} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm
          title={"New garment"}
          onClose={handleCloseModal}
          modalType={"add_garment"}
          buttonText={"Add garment"}
        >
          <div className="modal__input_wrapper">
            <label className="modal__label_input">
              Name{" "}
              <input
                type="text"
                name="name"
                minLength="1"
                maxLength="30"
                placeholder="Name"
                className="modal__input"
              />
            </label>
          </div>
          <div className="modal__input_wrapper">
            <label className="modal__label_input">
              Image{" "}
              <input
                type="url"
                name="link"
                minLength="1"
                maxLength="30"
                placeholder="Image URL"
                className="modal__input"
              />
            </label>
          </div>
          <p>Select the weather type:</p>
          <div className="modal__radio_buttons">
            <div className="modal__radio_option">
              <input
                type="radio"
                id="hot"
                value="hot"
                name="temp_range"
                className="modal__radio_button"
              />
              <label className="modal__label_radio">Hot</label>
            </div>
            <div className="modal__radio_option">
              <input
                type="radio"
                id="warm"
                value="warm"
                name="temp_range"
                className="modal__radio_button"
              />
              <label className="modal__label_radio">Warm</label>
            </div>
            <div className="modal__radio_option">
              <input
                type="radio"
                id="cold"
                value="cold"
                name="temp_range"
                className="modal__radio_button"
              />
              <label className="modal__label_radio">Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
