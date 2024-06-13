import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// Login Modal has Email - email, Password - password, Log In button, Sign Up Link

const LoginModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    // Adapt for email-username
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState(""); // Adapt for password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ email, password });
  };

  return (
    <ModalWithForm
      title={"Log In"}
      onClose={handleCloseModal}
      modalType={"login"}
      buttonText={"Log In"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Email{" "}
          <input
            type="email"
            name="email"
            maxLength="100"
            placeholder="Email"
            className="modal__input"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
      </div>
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Password{" "}
          <input
            type="password"
            name="password"
            minLength="8"
            maxLength="100"
            placeholder="Password"
            className="modal__input"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
