import React, { useState } from 'react';
import { BiDotsVertical } from 'react-icons/bi';
function Card() {
  const [brandName, setBrandName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [location, setLocation] = useState('');
  const [cards, setCards] = useState([]);
  const handleBrandNameChange = (e) => {
    setBrandName(e.target.value);
  };
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const createCard = () => {
    if (brandName && imageFile && location) {
      const newCard = {
        id: Date.now(), // Add a unique ID for each card
        brandName,
        imageUrl: URL.createObjectURL(imageFile),
        location,
      };
      setCards([...cards, newCard]);
      setBrandName('');
      setImageFile(null);
      setLocation('');
    }
  };
  const deleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };
  return (
    <div>
      <h2>Create a Card</h2>
      <div>
        <label>Brand Name:</label>
        <input type="text" value={brandName} onChange={handleBrandNameChange} />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageFileChange} />
      </div>
      {imageFile && <img src={URL.createObjectURL(imageFile)} alt={brandName} width="100" />}
      <div>
        <label>Location:</label>
        <input type="text" value={location} onChange={handleLocationChange} />
      </div>
      <button onClick={createCard}>Create Card</button>
      <div className="cards">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-icons">
              <BiDotsVertical onClick={() => deleteCard(card.id)} className="dots-icon" />
            </div>
            <div className="card-content">
              <h3>{card.brandName}</h3>
              <img src={card.imageUrl} alt={card.brandName} />
              <p>Location: {card.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Card;