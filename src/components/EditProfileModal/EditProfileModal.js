import React, { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ handleCloseModal, onEditProfile, isOpen }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(""); // Not sure if this variable will need to be changed.

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title={"Change profile data"}
      onClose={handleCloseModal}
      modalType={"edit_profile"}
      buttonText={"Save changes"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Name *{" "}
          <input
            type="text"
            name="name"
            minLength="1"
            maxLength="100"
            placeholder="Name"
            className="modal__input"
            value={name}
            onChange={handleNameChange}
          />
        </label>
      </div>
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Avatar URL *{" "}
          <input
            type="url"
            name="avatar"
            minLength="5"
            placeholder="Avatar URL"
            className="modal__input"
            value={avatar}
            onChange={handleAvatarChange}
            required
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
