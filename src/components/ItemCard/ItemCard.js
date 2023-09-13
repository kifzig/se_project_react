import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="clothing_card">
      <img
        src={item.imageUrl}
        alt="clothing icon"
        className="clothing_card__card_image"
        onClick={() => onSelectCard(item)}
      />

      <div className="clothing_card__card_name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
