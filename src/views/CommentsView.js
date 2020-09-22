import AbstractView from "./BaseView.js";
import commentsTemplate from "../templates/commentsTemplate";

export default class Comments extends AbstractView {
  constructor(model) {
    super();
    this._model = model;
  }

  getTemplate() {
    return commentsTemplate(this._model.getAll());
  }

  setDeleteCommentHandler(callback) {
    this.getElement().querySelector('.film-details__comments-list').addEventListener('click', (e) => {
      e.preventDefault();
      if(e.target.classList.contains('film-details__comment-delete')) {
        e.target.textContent = `Deleting...`
        callback(e.target.dataset.id);
      }
    })
  }
}
