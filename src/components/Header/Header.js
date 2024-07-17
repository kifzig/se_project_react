import "./Header.css";
import avatarImage from "../../images/avatar_kif.png";
import wtwrLogo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({
  onCreateModal,
  onLoginClick,
  onRegisterClick,
  city,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/" className="header__logo-image">
            <img src={wtwrLogo} alt="logo" />
          </Link>
        </div>
        <div>
          {currentDate}, {city}
        </div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          {isLoggedIn && (
            <button
              type="text"
              className="header__add-clothes-button"
              onClick={onCreateModal}
            >
              + Add New Clothes
            </button>
          )}
        </div>
        {!isLoggedIn && (
          <>
            <div>
              <button
                type="text"
                className="header__register-button"
                onClick={onRegisterClick}
              >
                Sign Up
              </button>
            </div>
            <div>
              <button
                type="text"
                className="header__login-button"
                onClick={onLoginClick}
              >
                Log In
              </button>
            </div>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/profile" className="header__profile-link">
              <div>{currentUser.name}</div>
            </Link>
            <div>
              <img
                src={currentUser.avatar}
                alt="logo"
                className="header__avatar-image"
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
