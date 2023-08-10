import React, { useState } from "react";

// SearchForm component takes in onSearch function as a prop
function SearchForm({ onSearch }) {
  // State variables to manage search inputs
  const [term, setTerm] = useState("");
  const [media, setMedia] = useState("all");
  const [country, setCountry] = useState("US");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    // Call the onSearch function with search inputs
    onSearch(term, media, country);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for search term */}
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)} // Update term state on input change
        placeholder="Search term"
      />
      {/* Dropdown for selecting media type */}
      <select value={media} onChange={(e) => setMedia(e.target.value)}>
        <option value="all">All</option>
        <option value="iTunes">iTunes</option>
        <option value="Books">Apple Book Store</option>
        {/* Add other media types as options */}
      </select>
      {/* Dropdown for selecting country */}
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="US">United States</option>
        <option value="GB">United Kingdom</option>
        {/* Add other country options as options */}
      </select>
      {/* Submit button triggers the form submission */}
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
