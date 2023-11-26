import { deleteBook, getBooks, getSingleBook } from '../api/bookData';
import { showBooks } from '../pages/books';
import {
  deleteSingleAuthor, getAuthors, getSingleAuthor
} from '../api/authorData';
import { showAuthors } from '../pages/authors';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import selectAuthor from '../components/forms/selectAuthor';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteBook(firebaseKey).then(() => {
          getBooks().then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK(working)
    if (e.target.id.includes('add-book-btn')) {
      console.warn(e.target);
      addBookForm();
      const firebaseKey = '-NjuHSqOTfy4JQpWge3T';
      selectAuthor(firebaseKey);
    }
    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      console.warn('EDIT BOOK', e.target.id);
      console.warn(e.target.id.split('--'));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      console.warn('VIEW BOOK', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((bookData) => {
        const singlebook = [];
        singlebook.push(bookData);
        console.warn(singlebook);
        showBooks(singlebook);
      });
    }
    // TODO; click EVENT FOR VIew author details
    if (e.target.id.includes('view-author-btn')) {
      console.warn('VIEW author', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorData) => {
        const singleAuthor = [];
        singleAuthor.push(authorData);
        showAuthors(singleAuthor);
      });
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
    // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('DELETE AUTHOR', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');
        deleteSingleAuthor(firebaseKey).then(() => {
          getAuthors().then(showAuthors);
        });
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      console.warn('ADD AUTHOR');
      addAuthorForm();
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
    }
  });
};

export default domEvents;
