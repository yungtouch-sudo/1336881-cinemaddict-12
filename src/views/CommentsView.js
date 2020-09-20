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
}
