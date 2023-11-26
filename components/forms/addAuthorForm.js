import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';

const addAuthorForm = (authorObjParam = {}) => {
  clearDom();

  // Use a new variable instead of reassigning the function parameter
  const authorObj = authorObjParam || {};

  const isUpdate = authorObj.firebaseKey !== undefined;
  const domString = `
    <form id="${isUpdate ? `update-author-form--${authorObj.firebaseKey}` : 'submit-author-form'}" class="mb-4">
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input type="text" class="form-control" id="first_name" value="${authorObj.first_name || ''}" placeholder="First Name" autocomplete="given-name" required>
      </div>
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input type="text" class="form-control" id="last_name" value="${authorObj.last_name || ''}" placeholder="Last Name" autocomplete="family-name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" value="${authorObj.email || ''}" placeholder="Enter Email" autocomplete="email" required>
      </div>
      <button type="submit" class="btn btn-primary mt-3">${isUpdate ? 'Update' : 'Submit'} Author</button>
    </form>`;

  renderToDOM('#form-container', domString);
};

export default addAuthorForm;
