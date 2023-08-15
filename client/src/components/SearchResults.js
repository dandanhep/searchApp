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
    setResults([]); // Clear previous results

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
        <input
          type="text"
          placeholder="Search term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <select value={media} onChange={(e) => setMedia(e.target.value)}>
          <option value="all">All</option>
          <option value="music">iTunes</option>
          <option value="ebook">Apple Book Store</option>
          <option value="movie">Movie</option>
          <option value="podcast">Podcast</option>
          <option value="audiobook">Audiobook</option>
          <option value="tvShow">TV Show</option>
          <option value="shortFilm">Short Film</option>
          <option value="musicVideo">TV Show</option>
          <option value="software">Short Film</option>
          {/* Add other media options */}
        </select>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          {/* Add other country options */}
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
