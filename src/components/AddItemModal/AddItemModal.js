import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
    //setName()
  };

  return (
    <ModalWithForm
      title={"New garment"}
      onClose={handleCloseModal}
      modalType={"add_garment"}
      buttonText={"Add garment"}
      isOpen={isOpen}
      onSubmit={(e) => onAddItem(e, { name })}
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
            value={name}
            onChange={handleNameChange}
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
  );
};

export default AddItemModal;
