import React from "react";
import "./SideBar.css";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import { useContext } from "react";

// SideBar
// ClothesSection

const SideBar = ({ onLogOut, onEditProfile }) => {
  return (
    <div className="sidebar">
      <div>
        <button
          type="text"
          className="sidebar__profile-button"
          onClick={onEditProfile}
        >
          Change profile data
        </button>
      </div>
      <div>
        <button
          type="text"
          className="sidebar__logout-button"
          onClick={() => onLogOut()}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
