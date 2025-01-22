import React, { useState } from "react";
import "./ItemCard.css";
import { ReactComponent as LikeHeart } from "../../images/like_heart.svg";

const ItemCard = ({ item, onSelectCard, handleCardLike }) => {
  const [liked, setLiked] = useState(
    item.likes.includes(localStorage.getItem("userId"))
  );

  const handleLikeIcon = () => {
    setLiked((prevLiked) => !prevLiked);
    handleCardLike({ id: item._id, isLiked: !liked });
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
        <LikeHeart
          onClick={handleLikeIcon}
          className={`clothing-card__like-icon ${
            liked ? "clothing-card__like-icon_liked" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default ItemCard;
