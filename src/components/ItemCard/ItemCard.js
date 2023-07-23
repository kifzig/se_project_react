const ItemCard = ({ item }) => {
  return (
    <div>
      <div>
        <img
          src={item.link}
          alt="clothing icon"
          className="clothing_cards__card_image"
        />
      </div>
      <div className="clothing__cards__card_name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
