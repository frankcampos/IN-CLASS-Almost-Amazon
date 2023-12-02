import { signOut } from '../utils/auth';
import {
  getBooks, booksOnSale
} from '../api/bookData';
import { showBooks } from '../pages/books';
import { getAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors'; // emptyAuthors,

// navigation events
const navigationEvents = (user) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    console.warn('CLICKED SALE BOOKS');
    booksOnSale(user.uid).then(showBooks);
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    console.warn('CLICKED ALL BOOKS');
    getBooks(user.uid).then(showBooks);
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    console.warn('CLICKED AUTHORS');
    getAuthors(user.uid).then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchBooks = (searchValue) => getBooks(user.uid).then((bookArray) => bookArray.filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase())));

    if (e.keyCode === 13) {
      const searchValue = document.querySelector('#search').value;
      searchBooks(searchValue)
        .then((data) => {
          console.warn(data);
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
    }
  });
};

export default navigationEvents;
