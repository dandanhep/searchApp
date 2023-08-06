import React, { useState } from "react";
import axios from "axios";
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
  const handleSearch = async (term, media, country) => {
    try {
      // Make a POST request to your backend API
      const response = await axios.post("/api/search", {
        term,
        media,
        country,
      });

      // Assuming your API returns data in response.data, you can handle it accordingly
      console.log(response.data);
      // Further processing of the API response and updating the state, etc.

      // Update the state with the search parameters
      setSearchTerm(term);
      setSearchMedia(media);
      setSearchCountry(country);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
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
      <SearchForm
        term={searchTerm}
        media={searchMedia}
        country={searchCountry}
        onSearch={handleSearch}
      />
      <div className="results-container">
        {/* SearchResults component to display search results */}
        {/* Passes search term, media, country, and handleAddToFavorites function as props */}
        <SearchResults
          term={searchTerm}
          media={searchMedia}
          country={searchCountry}
          onAddToFavorites={handleAddToFavorites}
          onSearch={handleSearch}
        />
      </div>
      <h2>Favorites</h2>
      {/* FavoritesList component */}
      <FavoritesList favorites={favorites} />{" "}
      {/* Pass favorites state as a prop */}
    </div>
  );
}

export default App;
