const express = require("express");
const axios = require("axios");
const helmet = require("helmet");

// Creating an instance of the Express application
const app = express();
const port = 3001; // Setting the port number for the server to listen on

// Using the Helmet middleware to enhance security
app.use(helmet());

// Serving static files from the "client/build" directory
app.use(express.static("client/build"));

// Defining the URL for the iTunes API
const ITUNES_API_URL = "https://itunes.apple.com/search";

// Handling POST requests to "/api/search" instead of GET
app.post("/api/search", async (req, res) => {
  // Extracting search parameters from the request body
  const { term, media, country } = req.body;

  try {
    // Making a POST request to the iTunes API with the provided search parameters
    const response = await axios.post(ITUNES_API_URL, {
      term,
      media,
      country,
    });

    // Sending the API response data as a JSON response
    res.json(response.data);
  } catch (error) {
    // Handling errors by logging the error message and sending an error JSON response
    console.error("Error fetching search results:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching search results." });
  }
});

let favorites = []; // Array to store favorite items

// Handling POST requests to "/api/favorites"
app.post("/api/favorites", (req, res) => {
  const item = req.body; // Extracting the request body, assuming it contains an item to be added to favorites
  favorites.push(item); // Adding the item to the favorites array
  res.sendStatus(200); // Sending a success status code
});

// Handling DELETE requests to "/api/favorites/:id"
app.delete("/api/favorites/:id", (req, res) => {
  const itemId = req.params.id; // Extracting the ID parameter from the request URL
  favorites = favorites.filter((item) => item.id !== itemId); // Filtering out the item with the matching ID from the favorites array
  res.sendStatus(200); // Sending a success status code
});

// Starting the server and logging a message indicating the server is running
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});