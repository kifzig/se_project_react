import "./Header.css";
import avatarImage from "../../images/avatar_kif.png";
import wtwrLogo from "../../images/logo.svg";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ onCreateModal, city }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={wtwrLogo} alt="logo" />
        </div>
        <div>
          {currentDate}, {city}
        </div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button
            type="text"
            className="header__add-clothes-button"
            onClick={onCreateModal}
          >
            + Add New Clothes
          </button>
        </div>
        <div>Kif Francis</div>
        <div>
          <img src={avatarImage} alt="logo" className="header__avatar-image" />
        </div>
      </div>
    </header>
  );
};

export default Header;
