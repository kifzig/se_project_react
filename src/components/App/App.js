import logo from "../../logo.svg";
import "./App.css";

function App() {
  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <div>
            <img src="/images/logo.svg" alt="logo" />
          </div>
          <div>July 10, San Antonio</div>
        </div>
        <div className="header__avatar-logo">
          <div>
            <button type="text">+ Add New Clothes</button>
          </div>
          <div>Name</div>
          <div>
            <img src="/images/avatar.svg" alt="logo" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
