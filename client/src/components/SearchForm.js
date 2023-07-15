import React, { useState } from "react"; // Importing React and useState hook from the "react" package
import axios from "axios"; // Importing the Axios library for making HTTP requests

function SearchForm({ onSearch }) {
  const [term, setTerm] = useState(""); // Initializing the term state as an empty string using the useState hook
  const [media, setMedia] = useState("all"); // Initializing the media state with a default value of "all"
  const [country, setCountry] = useState("US"); // Initializing the country state with a default value of "US"

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };
  // Function to handle changes in the search term input field
  // Updates the term state with the value entered in the input field

  const handleMediaChange = (event) => {
    setMedia(event.target.value);
  };
  // Function to handle changes in the media selection dropdown
  // Updates the media state with the selected value from the dropdown

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  // Function to handle changes in the country selection dropdown
  // Updates the country state with the selected value from the dropdown

  const handleSubmit = (event) => {
    event.preventDefault();
    // Prevents the default form submission behavior

    axios
      .get("/api/search", {
        params: {
          term,
          media,
          country,
        },
      })
      .then((response) => {
        onSearch(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };
  // Function to handle form submission
  // Sends a GET request to the "/api/search" endpoint with the search term, media, and country as query parameters
  // Calls the onSearch function passed as a prop and passes the search results as an argument
  // If an error occurs, the error is logged to the console

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={term}
        onChange={handleTermChange}
        placeholder="Search term"
      />
      <select value={media} onChange={handleMediaChange}>
        {/* Options for media selection */}
        <option value="all">All</option>
        <option value="movie">Movie</option>
        <option value="podcast">Podcast</option>
        <option value="music">Music</option>
        <option value="audiobook">Audiobook</option>
        <option value="tvshow">TV Show</option>
      </select>
      <select value={country} onChange={handleCountryChange}>
        {/* Options for country selection */}
        <option value="US">United States</option>
        <option value="GB">United Kingdom</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}
// Component for the search form
// Renders a form with input fields for search term, media selection dropdown, and country selection dropdown
// Calls the handleSubmit function when the form is submitted

export default SearchForm;
