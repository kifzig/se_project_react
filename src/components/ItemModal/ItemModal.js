import "./ItemModal.css";
import { useEffect } from "react";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`item_modal`}>
      <div className="item_modal__content">
        <button
          type="button"
          onClick={onClose}
          className="item_modal__close_button"
        />
        <img
          src={selectedCard.link}
          className="item_modal__item_image"
          alt={selectedCard.name}
        />
        <div className="item_modal__caption">
          <div className="item_modal__caption_name">{selectedCard.name}</div>
          <div className="item_modal__caption_weather">
            Weather: {selectedCard.weather}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
