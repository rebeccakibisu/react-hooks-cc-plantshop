import React, { useState } from "react";

function PlantCard({ plant, onToggleSoldOut, onUpdatePrice, onDelete }) {
  const [price, setPrice] = useState(plant.price);

  function handlePriceChange(e) {
    const newPrice = e.target.value;
    setPrice(newPrice);

    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: parseFloat(newPrice) })
    })
      .then((r) => r.json())
      .then((updatedPlant) => onUpdatePrice(updatedPlant));
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE"
    }).then(() => onDelete(plant.id));
  }

  return (
    <li data-testid="plant-item" className="card">
      <h4>{plant.name}</h4>
      <img src={plant.image} alt={plant.name} />
      <p>
        Price: $
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={handlePriceChange}
        />
      </p>
      <button onClick={() => onToggleSoldOut(plant.id)}>
        {plant.soldOut ? "Out of Stock" : "In Stock"}
      </button>
      <button
        onClick={handleDelete}
        style={{ marginLeft: "0.5rem", color: "red" }}
      >
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
