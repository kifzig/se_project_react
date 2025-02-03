import "./Header.css";
import wtwrLogo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useState } from "react";

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
  const firstLetter = currentUser?.name?.charAt(0).toUpperCase();

  const [isImageBroken, setIsImageBroken] = useState(false);

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
            <div className="header__avatar-container">
              {!isImageBroken && currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="user avatar"
                  className="header__avatar-image"
                  onError={() => setIsImageBroken(true)}
                />
              ) : (
                <div className="header__avatar-placeholder">{firstLetter}</div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
