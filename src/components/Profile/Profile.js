import React from "react";
// import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import avatarImage from "../../images/avatar_kif.png";
import "./Profile.css";
import SideBar from "../SideBar/SideBar.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

// SideBar
// ClothesSection

const Profile = ({ onSelectCard, clothingArr, onCreateModal }) => {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);

  return (
    <div className="profile">
      <div className="profile__heading">
        <div className="profile__heading_user">
          <img
            src={currentUser.avatar}
            alt="logo"
            className="profile__avatar-image"
          />
          <div className="profile__profile_name">{currentUser.name}</div>
        </div>
        <div className="profile__heading_clothes">
          <div className="profile__title">Your items</div>
          <div className="profile__add_new">
            <button
              type="text"
              className="profile__add-clothes-button"
              onClick={onCreateModal}
            >
              + Add new
            </button>
          </div>
        </div>
      </div>

      <div className="profile__content">
        <SideBar />
        <ClothesSection
          onSelectCard={onSelectCard}
          clothingArr={clothingArr}
          className="clothingsection"
        />
      </div>
    </div>
  );
};

export default Profile;
