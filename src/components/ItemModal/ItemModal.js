import "./ItemModal.css";
import { useRef, useEffect } from "react";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="modal__close_button"
        ></button>
        <img
          // ref={imageRef}
          src={selectedCard.link}
          className="modal__item_image"
          alt={selectedCard.name}
        />
        <div className="modal__caption">
          <div className="modal__caption_name">{selectedCard.name}</div>
          <div className="modal__caption_weather">
            Weather: {selectedCard.weather}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
