import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={require("../../images/logo.svg").default} alt="logo" />
        </div>
        <div>July 10, San Antonio</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button type="text" className="header__add-clothes-button">
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
