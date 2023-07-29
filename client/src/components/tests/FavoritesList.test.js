import React from "react"; // Importing React
import { render, fireEvent } from "@testing-library/react"; // Importing render and fireEvent from the testing library
import FavoritesList from "./FavoritesList"; // Importing the FavoritesList component

describe("FavoritesList", () => {
  it("should match the snapshot", () => {
    const { container } = render(<FavoritesList />);
    expect(container).toMatchSnapshot();
  });
  // Test case to match the component's snapshot
  // Renders the FavoritesList component and compares the rendered HTML with the stored snapshot

  it("should handle adding item to favorites", () => {
    const { getByText } = render(<FavoritesList />);
    const addButton = getByText("Add to Favorites");

    fireEvent.click(addButton);
  });
  // Test case to handle adding an item to favorites
  // Renders the FavoritesList component, finds the add button, and triggers a click event

  it("should handle removing item from favorites", () => {
    const { getByText } = render(<FavoritesList />);
    const removeButton = getByText("Remove");

    fireEvent.click(removeButton);
  });
  // Test case to handle removing an item from favorites
  // Renders the FavoritesList component, finds the remove button, and triggers a click event
});
