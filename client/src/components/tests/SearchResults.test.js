import React from "react"; // Importing React
import { render, fireEvent } from "@testing-library/react"; // Importing render and fireEvent from the testing library
import SearchResults from "./SearchResults"; // Importing the SearchResults component

describe("SearchResults", () => {
  it("should match the snapshot", () => {
    const { container } = render(
      <SearchResults
        term=""
        media="all"
        country="US"
        onAddToFavorites={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });
  // Test case to match the component's snapshot
  // Renders the SearchResults component with mocked props
  // Compares the rendered HTML with the stored snapshot

  it("should display search results", () => {
    const results = [
      {
        trackId: 1,
        trackName: "Track 1",
        artistName: "Artist 1",
        collectionName: "Collection 1",
      },
      {
        trackId: 2,
        trackName: "Track 2",
        artistName: "Artist 2",
        collectionName: "Collection 2",
      },
    ];

    const { getByText } = render(
      <SearchResults
        term=""
        media="all"
        country="US"
        onAddToFavorites={() => {}}
      />
    );

    results.forEach((result) => {
      const trackName = getByText(result.trackName);
      const artistName = getByText(result.artistName);
      const collectionName = getByText(result.collectionName);

      expect(trackName).toBeInTheDocument();
      expect(artistName).toBeInTheDocument();
      expect(collectionName).toBeInTheDocument();
    });
  });
  // Test case to display search results
  // Renders the SearchResults component with mocked props
  // Compares the rendered search result items with the expected results
  // the track name, artist name, and collection name of each result are displayed

  it("should call onAddToFavorites when 'Add to Favorites' button is clicked", () => {
    const results = [
      {
        trackId: 1,
        trackName: "Track 1",
        artistName: "Artist 1",
        collectionName: "Collection 1",
      },
      {
        trackId: 2,
        trackName: "Track 2",
        artistName: "Artist 2",
        collectionName: "Collection 2",
      },
    ];

    const onAddToFavorites = jest.fn();
    const { getByText } = render(
      <SearchResults
        term=""
        media="all"
        country="US"
        onAddToFavorites={onAddToFavorites}
      />
    );

    results.forEach((result) => {
      const addToFavoritesButton = getByText("Add to Favorites");

      fireEvent.click(addToFavoritesButton);

      expect(onAddToFavorites).toHaveBeenCalledWith(result);
    });
  });
  // Test case to call onAddToFavorites when the "Add to Favorites" button is clicked
  // Renders the SearchResults component with mocked props
  // Simulates a click event on the "Add to Favorites" button for each result
  // the onAddToFavorites function is called with the corresponding result as an argument
});
