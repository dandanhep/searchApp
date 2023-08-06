import React, { useState } from "react";
import axios from "axios";

const SearchResults = ({
  term,
  media,
  country,
  onAddToFavorites,
  onSearch,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get("/api/search", {
        params: {
          term,
          media,
          country,
        },
      });
      setResults(response.data.results); // Update the state with the search results
      setError(null); // Clear previous errors if the API request is successful
    } catch (error) {
      setError("Error fetching search results. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Enter search term"
          value={term}
          onChange={(e) => onSearch(e.target.value, media, country)}
        />
        <input
          type="text"
          placeholder="Enter media type (e.g., movie, music, etc.)"
          value={media}
          onChange={(e) => onSearch(term, e.target.value, country)}
        />
        <input
          type="text"
          placeholder="Enter country code (e.g., US, CA, etc.)"
          value={country}
          onChange={(e) => onSearch(term, media, e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? <div className="spinner"></div> : "Search"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <div>
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
      </div>
    </div>
  );
};

export default SearchResults;
