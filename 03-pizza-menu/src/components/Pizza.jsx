const Pizza = ({ name, ingredient, photoName, price, soldOut }) => {
  return (
    <div className={`pizza ${soldOut ? 'sold-out' : ''}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredient}</p>
        <span>{soldOut ? 'SOLD OUT' : `${price}$`}</span>
      </div>
    </div>
  );
};

export default Pizza;
