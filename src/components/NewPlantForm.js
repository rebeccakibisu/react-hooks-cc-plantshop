import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "Application/JSON" }, // 👈 match test expectation
      body: JSON.stringify(formData)
    })
      .then((r) => r.json())
      .then((newPlant) => {
        onAddPlant(newPlant); // use server response (with unique id)
        setFormData({ name: "", image: "", price: "" }); // reset form
      });
  }

  return (
    <form onSubmit={handleSubmit} className="new-plant-form">
      <input
        type="text"
        name="name"
        placeholder="Plant name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <input
        type="number"
        step="0.01"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;
