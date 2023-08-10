import React from "react";
import axios from "axios";

// FavoritesList component takes in favorites and setFavorites as props
function FavoritesList({ favorites, setFavorites }) {
  // Function to handle removing an item from favorites
  const handleRemoveFromFavorites = (item) => {
    // Make a DELETE request to the server's favorites API endpoint
    axios
      .delete(`/api/favorites/${item.trackId}`)
      .then(() => {
        // Update the favorites state by filtering out the removed item
        setFavorites(
          favorites.filter((favorite) => favorite.trackId !== item.trackId)
        );
      })
      .catch((error) => {
        // Handle errors if the removal process fails
        console.error("Error removing item from favorites:", error);
      });
  };

  // Render the list of favorites
  return (
    <div>
      {/* Map through the favorites array and render each favorite */}
      {favorites.map((favorite) => (
        <div key={favorite.trackId}>
          {/* Display the track name */}
          <h2>{favorite.trackName}</h2>
          {/* Button to remove the item from favorites */}
          <button onClick={() => handleRemoveFromFavorites(favorite)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesList;
