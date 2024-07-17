import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const ItemModal = ({ selectedCard, onClose, onDeleteItem }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser._id;
  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;
  return (
    <div className={`item_modal`}>
      <div className="item_modal__content">
        <button
          type="button"
          onClick={onClose}
          className="item_modal__close_button"
        />
        <img
          src={selectedCard.imageUrl}
          className="item_modal__item_image"
          alt={selectedCard.name}
        />
        <div className="item_modal__caption">
          <div>
            <div className="item_modal__caption_name">{selectedCard.name}</div>
            <div className="item_modal__caption_weather">
              Weather: {selectedCard.weather}
            </div>
          </div>
          {/* Replace with button */}
          <div className="item_modal__delete_item">
            <button
              type="text"
              // className="item_modal__delete-clothing-button"
              className={itemDeleteButtonClassName}
              onClick={() => onDeleteItem(selectedCard)}
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
