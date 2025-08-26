import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantCard from "./PlantCard";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // fetch plants on load
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data));
  }, []);

  // add a new plant
  function handleAddPlant(newPlant) {
    setPlants((prev) => [...prev, newPlant]);
  }

  // toggle sold out
  function handleToggleSoldOut(id) {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
      )
    );
  }

  // search filter
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>
          Plantsy <span className="logo" role="img">🌱</span>
        </h1>
      </header>
      <main>
        <div className="new-plant-form">
          <h2>New Plant</h2>
          <NewPlantForm onAddPlant={handleAddPlant} />
        </div>
        <Search search={search} onSearchChange={setSearch} />
        <ul className="cards">
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}   // use id from server
              plant={plant}
              onToggleSoldOut={handleToggleSoldOut}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
