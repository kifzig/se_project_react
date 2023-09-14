import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants.js";

const ClothesSection = ({ onSelectCard, clothingArr }) => {
  return (
    <section className="clothingsection">
      {/* <div className="clothingsection__headings">
        <div className="clothingsection__title">Your items</div>
        <div className="clothingsection__add_new">+ Add new</div>
      </div> */}

      <div className="clothingsection__cards">
        {clothingArr.map((item) => (
          <ItemCard
            item={item}
            onSelectCard={onSelectCard}
            key={item.id}
            className="clothingsection__card"
          />
        ))}
      </div>
    </section>
  );
};

export default ClothesSection;
