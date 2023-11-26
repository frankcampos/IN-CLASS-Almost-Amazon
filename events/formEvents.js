import { createAuthor, getAuthors, updateAuthor } from '../api/authorData';
import { showAuthors } from '../pages/authors';

const formEvents = () => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();

    // Handling submission for adding a book
    if (e.target.id.includes('submit-book')) {
      console.warn('CLICKED SUBMIT BOOK', e.target.id);
    }

    // Handling submission for updating a book
    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      console.warn('CLICKED UPDATE BOOK', e.target.id);
      console.warn(firebaseKey);
    }

    // Handling submission for adding an author
    if (e.target.id.includes('submit-author')) {
      console.warn('CLICKED SUBMIT AUTHOR');
      const payload = {
        email: document.querySelector('#email').value,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
      };

      createAuthor(payload)
        .then((data) => {
          console.warn(data);
          return getAuthors(); // Call getAuthors after logging the data
        })
        .then(showAuthors)
        .catch((error) => {
          console.error('An error occurred:', error);
        });
    }

    // Handling submission for updating an author
    if (e.target.id.includes('update-author-form')) {
      console.warn('clicked update author');
      const [, firebaseKey] = e.target.id.split('--');

      const payload2 = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        firebaseKey
      };
      updateAuthor(payload2).then(() => {
        getAuthors().then(showAuthors);
      });
    }
  });
};
export default formEvents;
