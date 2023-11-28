import { createAuthor, getAuthors, updateAuthor } from '../api/authorData';
import { showAuthors } from '../pages/authors';
import { getBooks, createBook, updateBook } from '../api/bookData';
import { showBooks } from '../pages/books';

const formEvents = () => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();

    // Handling submission for adding a book
    if (e.target.id.includes('submit-book')) {
      const payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
      };

      createBook(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateBook(patchPayload).then(() => {
          getBooks().then(showBooks);
        });
      });
    }
    // Handling submission for updating a book

    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
        firebaseKey,
      };

      updateBook(payload).then(() => {
        getBooks().then(showBooks);
      });
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
        .then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          updateAuthor(patchPayload).then(() => {
            getAuthors().then(showAuthors);
          });
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
