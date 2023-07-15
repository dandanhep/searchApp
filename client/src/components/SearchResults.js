import React, { useState, useEffect } from "react"; // Importing React, useState, and useEffect from the "react" package
import axios from "axios"; // Importing the Axios library for making HTTP requests

function SearchResults({ term, media, country, onAddToFavorites }) {
  const [results, setResults] = useState([]); // Initializing the results state as an empty array using the useState hook

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get("/api/search", {
          params: {
            term,
            media,
            country,
          },
        });

        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [term, media, country]);
  // useEffect hook to fetch search results when the component mounts or when the term, media, or country values change
  // Sends a GET request to the "/api/search" endpoint with the search term, media, and country as query parameters
  // Updates the results state with the response data's results array
  // Handles errors by logging them to the console

  const handleAddToFavorites = (item) => {
    onAddToFavorites(item);
  };
  // Function to handle adding an item to favorites
  // Calls the onAddToFavorites function passed as a prop and passes the item as an argument

  return (
    <div>
      {/* Display the search results */}
      {results.map((result) => (
        <div key={result.trackId}>
          <h2>{result.trackName}</h2>
          <p>Artist: {result.artistName}</p>
          <p>Album: {result.collectionName}</p>
          {/* Display other relevant information */}
          <button onClick={() => handleAddToFavorites(result)}>
            Add to Favorites
          </button>
        </div>
      ))}
    </div>
  );
}
// Component to display the search results
// Renders each search result item with its track name, artist name, album name, and an add to favorites button
// Clicking the add to favorites button triggers the handleAddToFavorites function

export default SearchResults;
