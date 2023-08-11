import React, { useState } from "react";
import axios from "axios";

// SearchResults component takes in search inputs and onAddToFavorites function as props
const SearchResults = ({
  term,
  media,
  country,
  onAddToFavorites,
  setTerm,
  setMedia,
  setCountry,
}) => {
  // State variables to manage search results and error messages
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  // Function to handle search form submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    try {
      // Make a POST request to the backend API to fetch search results
      const response = await axios.post("/api/search", {
        term,
        media,
        country,
      });

      // Update the results state with the fetched search results
      setResults(response.data.results);
      setError(null); // Clear any previous error messages
    } catch (error) {
      // Handle errors if fetching search results fails
      setError("Error fetching search results. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        {/* Input fields and search button */}
        <input
          type="text"
          placeholder="Search term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <select value={media} onChange={(e) => setMedia(e.target.value)}>
          {/* Dropdown options */}
        </select>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          {/* Dropdown options */}
        </select>
        <button type="submit">Search</button>
      </form>

      {/* Display search results */}
      {results.map((result) => (
        <div key={result.trackId}>
          <h2>{result.trackName}</h2>
          <p>Artist: {result.artistName}</p>
          <p>Album: {result.collectionName}</p>
          <button onClick={() => onAddToFavorites(result)}>
            Add to Favorites
          </button>
        </div>
      ))}

      {/* Display error message if an error occurred */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SearchResults;
