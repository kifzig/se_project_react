import "./Header.css";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ onCreateModal, city }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={require("../../images/logo.svg").default} alt="logo" />
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
        <div>Name</div>
        <div>
          <img src={require("../../images/avatar.svg").default} alt="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
