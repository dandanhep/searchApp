import React, { useState } from "react"; // Importing React and useState from the "react" package
import SearchForm from "./components/SearchForm"; // Importing the SearchForm component
import SearchResults from "./components/SearchResults"; // Importing the SearchResults component
import FavoritesList from "./components/FavoritesList"; // Importing the FavoritesList component
import "./App.css"; // Importing the App CSS file

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // Initializing the searchTerm state as an empty string using the useState hook
  const [searchMedia, setSearchMedia] = useState("all"); // Initializing the searchMedia state with a default value of "all"
  const [searchCountry, setSearchCountry] = useState("US"); // Initializing the searchCountry state with a default value of "US"
  const [favorites, setFavorites] = useState([]); // Initializing the favorites state as an empty array using the useState hook

  const handleSearch = (term, media, country) => {
    setSearchTerm(term);
    setSearchMedia(media);
    setSearchCountry(country);
  };
  // Function to handle the search action
  // Updates the searchTerm, searchMedia, and searchCountry states with the provided values

  const handleAddToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };
  // Function to handle adding an item to favorites
  // Updates the favorites state by adding the item to the existing array using the spread operator

  return (
    <div className="container">
      <h1>iTunes Search</h1>
      <SearchForm onSearch={handleSearch} />
      <div className="results-container">
        <SearchResults
          term={searchTerm}
          media={searchMedia}
          country={searchCountry}
          onAddToFavorites={handleAddToFavorites}
        />
      </div>
      <h2>Favorites</h2>
      <FavoritesList favorites={favorites} />
    </div>
  );
}
// Main App component
// Renders the container div with the app title, SearchForm, SearchResults, and FavoritesList components
// Manages the searchTerm, searchMedia, searchCountry, and favorites states
// Passes the handleSearch function to the SearchForm component as a prop
// Passes the search term, media, country, and handleAddToFavorites function to the SearchResults component as props
// Passes the favorites state to the FavoritesList component as a prop

export default App;
