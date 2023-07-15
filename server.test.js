const axios = require("axios"); // Importing the Axios library for making HTTP requests
const request = require("supertest"); // Importing the supertest library for testing HTTP requests
const app = require("./server"); // Importing the Express app from the server file

// Mock the axios.get method
jest.mock("axios"); // Mocking the axios.get method to simulate HTTP requests
axios.get.mockResolvedValue({ data: { results: [] } }); // Mocking a resolved value for the axios.get method

describe("GET /api/search", () => {
  it("should fetch search results", async () => {
    const response = await request(app)
      .get("/api/search")
      .query({ term: "test", media: "all", country: "US" });
    // Sending a GET request to "/api/search" with query parameters

    expect(response.status).toBe(200); // Asserting that the response status code is 200 (OK)
    expect(response.body.results).toEqual([]); // Asserting that the response body's "results" property is an empty array
  });

  it("should handle error when fetching search results", async () => {
    axios.get.mockRejectedValue(new Error("Test error"));
    // Mocking a rejected value for the axios.get method to simulate an error

    const response = await request(app)
      .get("/api/search")
      .query({ term: "test", media: "all", country: "US" });
    // Sending a GET request to "/api/search" with query parameters

    expect(response.status).toBe(500); // Asserting that the response status code is 500 (Internal Server Error)
    expect(response.body.error).toBe(
      "An error occurred while fetching search results."
    );
    // Asserting that the response body's "error" property matches the expected error message
  });
});
