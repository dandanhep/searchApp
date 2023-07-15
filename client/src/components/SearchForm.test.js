import React from "react"; // Importing React
import { render, fireEvent } from "@testing-library/react"; // Importing render and fireEvent from the testing library
import SearchForm from "./SearchForm"; // Importing the SearchForm component

// Test case to match the component's snapshot
describe("SearchForm", () => {
  it("should match the snapshot", () => {
    const { container } = render(<SearchForm />);
    expect(container).toMatchSnapshot();
  });
  // Renders the SearchForm component and compares the rendered HTML with the stored snapshot

  // Test case to handle form submission
  it("should handle form submission", () => {
    const onSearch = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <SearchForm onSearch={onSearch} />
    );

    const input = getByPlaceholderText("Search term");
    const button = getByText("Search");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith("test", "all", "US");
  });
  // Renders the SearchForm component with a mocked onSearch function
  // Finds the input field and button elements
  // Simulates a change event on the input field with a value of "test"
  // Simulates a click event on the button
  // Asserts that the onSearch function is called with the expected arguments

  it("should update the term state on input change", () => {
    const { getByPlaceholderText } = render(<SearchForm />);
    const input = getByPlaceholderText("Search term");

    fireEvent.change(input, { target: { value: "test" } });

    expect(input.value).toBe("test");
  });
  // Test case to update the term state on input change
  // Renders the SearchForm component
  // Finds the input field element
  // Simulates a change event on the input field with a value of "test"
  // Asserts that the input field value is updated to "test"

  it("should update the media state on media selection change", () => {
    const { getByLabelText } = render(<SearchForm />);
    const select = getByLabelText("Select media");

    fireEvent.change(select, { target: { value: "movie" } });

    expect(select.value).toBe("movie");
  });
  // Test case to update the media state on media selection change
  // Renders the SearchForm component
  // Finds the media selection dropdown element
  // Simulates a change event on the dropdown with a selected value of "movie"
  // Asserts that the selected value of the dropdown is updated to "movie"

  it("should update the country state on country selection change", () => {
    const { getByLabelText } = render(<SearchForm />);
    const select = getByLabelText("Select country");

    fireEvent.change(select, { target: { value: "GB" } });

    expect(select.value).toBe("GB");
  });
  // Test case to update the country state on country selection change
  // Renders the SearchForm component
  // Finds the country selection dropdown element
  // Simulates a change event on the dropdown with a selected value of "GB"
  // Asserts that the selected value of the dropdown is updated to "GB"
});
