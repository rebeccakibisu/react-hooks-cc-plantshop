import React from "react";

function Search({ search, onSearchChange }) {
  function handleChange(e) {
    console.log("Searching...");
    onSearchChange(e.target.value);
  }

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        id="search"
        type="text"
        placeholder="Type a name to search..."
        value={search}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
