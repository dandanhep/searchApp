import React from "react";
import axios from "axios";

function FavoritesList({ favorites, setFavorites }) {
  const handleRemoveFromFavorites = (item) => {
    axios
      .delete(`/api/favorites/${item.trackId}`)
      .then(() => {
        setFavorites(
          favorites.filter((favorite) => favorite.trackId !== item.trackId)
        );
      })
      .catch((error) => {
        console.error("Error removing item from favorites:", error);
      });
  };
  // Function to handle removing an item from favorites
  // Sends a DELETE request to "/api/favorites/:id" with the item ID
  // If the request is successful, the item is removed from the favorites state
  // If an error occurs, the error is logged to the console

  return (
    <div>
      {/* Display the favorites list */}
      {favorites.map((favorite) => (
        <div key={favorite.trackId}>
          <h2>{favorite.trackName}</h2>

          <button onClick={() => handleRemoveFromFavorites(favorite)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
// Component to display a list of favorites
// Renders each favorite item with its track name and a remove button
// Clicking the remove button triggers the handleRemoveFromFavorites function

export default FavoritesList;
