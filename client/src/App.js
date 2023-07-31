import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import FavoritesList from "./components/FavoritesList";
import "./App.css";

function App() {
  // Initializing state variables using the useState hook
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMedia, setSearchMedia] = useState("all");
  const [searchCountry, setSearchCountry] = useState("US");
  const [favorites, setFavorites] = useState([]);

  // Function to handle the search action
  const handleSearch = (term, media, country) => {
    // Updates the searchTerm, searchMedia, and searchCountry states with the provided values
    setSearchTerm(term);
    setSearchMedia(media);
    setSearchCountry(country);
  };

  // Function to handle adding an item to favorites
  const handleAddToFavorites = (item) => {
    // Updates the favorites state by adding the item to the existing array using the spread operator
    setFavorites([...favorites, item]);
  };

  return (
    <div className="container">
      <h1>iTunes Search</h1>
      {/* SearchForm component to get search inputs */}
      <SearchForm onSearch={handleSearch} />
      <div className="results-container">
        {/* SearchResults component to display search results */}
        {/* Passes search term, media, country, and handleAddToFavorites function as props */}
        <SearchResults
          term={searchTerm}
          media={searchMedia}
          country={searchCountry}
          onAddToFavorites={handleAddToFavorites}
        />
      </div>
      <h2>Favorites</h2>
      {/* FavoritesList component to display the list of favorite items */}
      {/* Passes favorites state as a prop */}
      <FavoritesList favorites={favorites} />
    </div>
  );
}

export default App;