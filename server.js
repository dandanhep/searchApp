const express = require("express"); // Importing the Express framework
const axios = require("axios"); // Importing the Axios library for making HTTP requests
const helmet = require("helmet"); // Importing the Helmet middleware for security

const app = express(); // Creating an instance of the Express application
const port = 3001; // Setting the port number for the server to listen on

app.use(helmet()); // Using the Helmet middleware to enhance security
app.use(express.static("client/build")); // Serving static files from the "client/build" directory

const ITUNES_API_URL = "https://itunes.apple.com/search"; // Defining the URL for the iTunes API

app.get("/api/search", async (req, res) => {
  // Handling GET requests to "/api/search"
  const { term, media, country } = req.query; // Extracting query parameters from the request

  try {
    const response = await axios.get(ITUNES_API_URL, {
      // Making a GET request to the iTunes API
      params: {
        term,
        media,
        country,
      },
    });

    res.json(response.data); // Sending the API response data as a JSON response
  } catch (error) {
    console.error("Error fetching search results:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching search results." });
    // Handling errors by logging the error message and sending an error JSON response
  }
});

let favorites = []; // Array to store favorite items

app.post("/api/favorites", (req, res) => {
  // Handling POST requests to "/api/favorites"
  const item = req.body; // Extracting the request body, assuming it contains an item to be added to favorites
  favorites.push(item); // Adding the item to the favorites array
  res.sendStatus(200); // Sending a success status code
});

app.delete("/api/favorites/:id", (req, res) => {
  // Handling DELETE requests to "/api/favorites/:id"
  const itemId = req.params.id; // Extracting the ID parameter from the request URL
  favorites = favorites.filter((item) => item.id !== itemId); // Filtering out the item with the matching ID from the favorites array
  res.sendStatus(200); // Sending a success status code
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // Starting the server and logging a message indicating the server is running
});
