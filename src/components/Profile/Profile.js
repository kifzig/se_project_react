import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import SideBar from "../SideBar/SideBar.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

// SideBar
// ClothesSection

const Profile = ({
  onSelectCard,
  clothingArr,
  onCreateModal,
  onLogOut,
  onEditProfile,
  onProfileChange,
  onCardLike,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);

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
        <SideBar onLogOut={onLogOut} onEditProfile={onProfileChange} />
        <ClothesSection
          onSelectCard={onSelectCard}
          clothingArr={clothingArr}
          className="clothingsection"
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
};

export default Profile;
