import React from "react";
// import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import avatarImage from "../../images/avatar_kif.png";
import "./Profile.css";
import SideBar from "../SideBar/SideBar.js";

// SideBar
// ClothesSection

const Profile = ({ onSelectCard, clothingArr }) => {
  return (
    <div className="profile">
      <div className="profile__heading">
        <div className="profile__heading_user">
          <img src={avatarImage} alt="logo" className="profile__avatar-image" />
          <div className="profile__profile_name">Kif Francis</div>
        </div>
        <div className="profile__heading_clothes">
          <div className="profile__title">Your items</div>
          <div className="profile__add_new">+ Add new</div>
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
