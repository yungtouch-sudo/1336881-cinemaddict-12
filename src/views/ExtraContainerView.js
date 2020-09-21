import AbstractView from "./BaseView.js";
import extraContainerTemplate from "../templates/extraContainerTemplate";

export default class ExtraContainer extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return extraContainerTemplate(this._data);
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
