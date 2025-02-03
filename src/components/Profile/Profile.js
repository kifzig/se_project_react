import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import SideBar from "../SideBar/SideBar.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useState } from "react";

// Profile page (logged in with Sidebar and ClothesSection)
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
  const firstLetter = currentUser?.name?.charAt(0).toUpperCase();

  const [isImageBroken, setIsImageBroken] = useState(false);

  return (
    <div className="profile">
      <div className="profile__heading">
        <div className="profile__heading_user">
          <div className="profile__avatar-container">
            {!isImageBroken && currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt="user avatar"
                className="profile__avatar-image"
                onError={() => setIsImageBroken(true)}
              />
            ) : (
              <div className="profile__avatar-placeholder">{firstLetter}</div>
            )}
          </div>
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
