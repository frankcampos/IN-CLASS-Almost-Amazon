import { getAuthors } from '../../api/authorData';
import renderToDOM from '../../utils/renderToDom';

const selectAuthor = (useId, authorId) => {
  let domString = `<label for="author">Select an Author</label>
    <select class="form-control" id="author_id" required>
    <option value="">Select an Author</option>`;

  getAuthors(useId).then((authorsArray) => {
    console.warn('this is the author array', authorsArray);
    authorsArray.forEach((author) => {
      domString += `
          <option 
            value="${author.firebaseKey}" 
            ${authorId === author.firebaseKey ? 'selected' : ''}>
              ${author.first_name} ${author.last_name}
          </option>`;
    });

    domString += '</select>';

    renderToDOM('#select-author', domString);
  });
};

export default selectAuthor;
