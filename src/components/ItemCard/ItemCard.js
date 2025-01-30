import React, { useState, useContext } from "react";
import "./ItemCard.css";
import { ReactComponent as LikeHeart } from "../../images/like_heart.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard, onCardLike, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);

  const [liked, setLiked] = useState(item.likes.includes(currentUser._id));

  const handleLike = () => {
    setLiked((prevLiked) => {
      const newLikedState = !prevLiked;
      onCardLike({ id: item._id, isLiked: !liked });
      return newLikedState;
    });
  };

  return (
    <div className="clothing-card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="clothing-card__image"
        onClick={() => onSelectCard(item)}
      />
      <div className="clothing-card__info-container">
        <p className="clothing-card__name">{item.name}</p>
        {isLoggedIn && (
          <LikeHeart
            onClick={handleLike}
            className={`clothing-card__like-icon ${
              liked
                ? "clothing-card__like-icon_liked"
                : "clothing-card__like-icon"
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default ItemCard;
