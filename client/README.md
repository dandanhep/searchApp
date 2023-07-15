# iTunes Search Project

The application allows users to search for content within the iTunes Store and Apple Books Store. The user can create a list of ‘favourites’.

### How to Use the App

Open the app in your web browser.
Enter a search term in the search form input field.
Select the media type from the "Media" dropdown.
Select the country from the "Country" dropdown.
Click the "Search" button.
The app will fetch the search results from the iTunes API based on the entered criteria. The results will be displayed below the search form.
To add a result to your favorites, click the "Add to Favorites" button for that specific result.
The result will be added to the favorites list below the search results.
To remove an item from the favorites list, click the "Remove" button next to the item in the favorites list.

### Installation

1. Clone the repository to your local machine using the following command: git clone <https://github.com/dandanhep/searchApp.git>
2. Navigate to the project directory
3. Install the dependencies: npm install
4. Start the development server: npm start
5. Open your web browser and access the app at http://localhost:3000.

### Testing

1. Open a terminal or command prompt.
2. Navigate to the root directory of the project where the package.json file is located.
3. Install the required dependencies
4. Once the dependencies are installed, you can run the tests using the following command: npm test

### Security Measures

Use of Helmet Middleware: The app includes the Helmet middleware, which helps secure the Express app by setting various HTTP headers related to security. Helmet adds security-related headers like X-XSS-Protection, X-Content-Type-Options, Strict-Transport-Security, etc., to enhance the security of the app.

### Deployment

https://github.com/dandanhep/searchApp
