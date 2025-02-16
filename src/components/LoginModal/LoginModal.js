import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ handleCloseModal, onLogin, isOpen, onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div>
      {" "}
      {isOpen && (
        <ModalWithForm
          title={"Log In"}
          onClose={handleCloseModal}
          modalType={"login"}
          buttonText={"Log In"}
          isOpen={isOpen}
          onSubmit={handleSubmit}
          extraContent={
            <span
              onClick={() => {
                onRegisterClick();
              }}
              className="modal__or_signup"
            >
              or Sign Up
            </span>
          }
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
      )}
    </div>
  );
};

export default LoginModal;
