import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="clothing_card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="clothing_card__card_image"
        onClick={() => onSelectCard(item)}
      />

      <p className="clothing_card__card_name">{item.name}</p>
    </div>
  );
};

export default ItemCard;
