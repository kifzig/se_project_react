import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

// Likewise, update this component to show only the cards added by the current user.

const ClothesSection = ({
  onSelectCard,
  clothingArr,
  onCardLike,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const userClothingArr = clothingArr.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <section className="clothingsection">
      <div className="clothingsection__cards">
        {userClothingArr.map((item) => (
          <ItemCard
            item={item}
            onSelectCard={onSelectCard}
            key={item.id}
            onCardLike={onCardLike}
            className="clothingsection__card"
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </section>
  );
};

export default ClothesSection;
