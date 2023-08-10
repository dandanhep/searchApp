const express = require("express");
const axios = require("axios");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express(); // Create an Express application
const port = process.env.PORT || 3001; // Define the port number

app.use(helmet()); // Use Helmet middleware for security headers
app.use(bodyParser.json()); // Use bodyParser middleware to parse JSON request bodies

// Use the CORS middleware to handle Cross-Origin Resource Sharing
app.use(cors());

// Temporary data storage for favorites
let favorites = [];

// Define a route to handle the search API request
app.post("/api/search", async (req, res) => {
  const { term, media, country } = req.body;

  try {
    // iTunes API search URL
    const searchURL = `https://itunes.apple.com/search?term=${encodeURIComponent(
      term
    )}&media=${media}&country=${country}`;

    // Make a GET request to the iTunes API using Axios
    const response = await axios.get(searchURL);

    // Respond with the fetched search results
    res.json(response.data);
  } catch (error) {
    // Handle errors if fetching search results fails
    console.error("Error fetching search results:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching search results." });
  }
});

// Route for adding an item to favorites
app.post("/api/favorites/add", (req, res) => {
  const { item } = req.body;

  favorites.push(item); // Add the item to the favorites list (in-memory storage)

  res.json({ message: "Item added to favorites" });
});

// Route for removing an item from favorites
app.delete("/api/favorites/remove/:itemId", (req, res) => {
  const itemIdToRemove = req.params.itemId;

  favorites = favorites.filter(
    (favorite) => favorite.trackId !== itemIdToRemove
  );

  res.json({ message: "Item removed from favorites" });
});

// Route for retrieving user's favorite list
app.get("/api/favorites", (req, res) => {
  res.json({ favorites });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
