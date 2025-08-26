import React from "react";

function PlantCard({ plant, onToggleSoldOut }) {
  return (
    <li data-testid="plant-item" className="card">
      <h4>{plant.name}</h4>
      <img src={plant.image} alt={plant.name} />
      <p>Price: {plant.price}</p>
      <button onClick={() => onToggleSoldOut(plant.id)}>
        {plant.soldOut ? "Out of Stock" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
