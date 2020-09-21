import AbstractView from "./BaseView.js";
import showMoreBtnTemplate from '../templates/showMoreBtnTemplate';

export default class ButtonShowMoreView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return showMoreBtnTemplate();
  }

  setShowMoreHandler(callback) {
    this.getElement().addEventListener('click', callback);
  }
}
