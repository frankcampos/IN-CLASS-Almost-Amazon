import { signOut } from '../utils/auth';
import { getBooks, booksOnSale, SearchBooks } from '../api/bookData';
import { emptyBooks, showBooks } from '../pages/books';
import { getAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors'; // emptyAuthors,

// navigation events
const navigationEvents = () => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    console.warn('CLICKED SALE BOOKS');
    booksOnSale().then(showBooks);
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    console.warn('CLICKED ALL BOOKS');
    getBooks().then(showBooks);
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    console.warn('CLICKED AUTHORS');
    getAuthors().then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      const searchValue = document.querySelector('#search').value;
      // console.warn(searchValue);
      // console.warn(typeof searchValue);
      SearchBooks(searchValue)
        .then((data) => {
          console.warn(data); // Corrected syntax
          // Here, you might want to call showBooks(data) if you want to display the books
          console.warn(typeof data);
          showBooks(data);
        })
        .then(() => {
          // Clear the input field after displaying the search results
          document.querySelector('#search').value = '';
        })
        .catch((error) => {
          console.error('Error:', error); // Added error handling
        });
    } else {
      emptyBooks();
    }
  });
};

export default navigationEvents;
