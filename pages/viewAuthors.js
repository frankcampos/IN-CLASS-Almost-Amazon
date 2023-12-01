import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewauthor = (obj) => {
  console.warn(obj);
  console.warn(typeof obj);
  clearDom();

  // Generate HTML for each book in the bookArray
  const booksHTML = obj.bookArray.map((book) => `
      <div class="book-author-container d-flex">
        <div class="book-details d-flex flex-column">
          <img src=${book.image} alt="${book.title}" style="width: 300px;">
          <div class="mt-5">
            <i id="edit-book-btn--${book.firebaseKey}" class="fas fa-edit" style="color: blue;" ></i>
            <i id="delete-book--${book.firebaseKey}" class="fas fa-trash-alt" style="color: red";></i>
          </div>
        </div>
        <div class="author-details text-white ms-5">
          <h5>${book.title} by ${obj.authorObject.first_name} ${obj.authorObject.last_name} ${obj.authorObject.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
          Author Email: <a href="mailto:${obj.authorObject.email}">${obj.authorObject.email}</a>
          <p>${book.description || ''}</p>
          <hr>
          <p>${book.sale ? `<span class="badge bg-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${book.price}` : `$${book.price}`}</p>      
        </div>
      </div>
    `).join('');

  const domString = `<div class="books-container mt-5">${booksHTML}</div>`;

  renderToDOM('#view', domString);
};

export default viewauthor;
