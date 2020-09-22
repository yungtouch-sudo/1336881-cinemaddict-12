import AbstractView from "./BaseView.js";
import filterMenuContainerTemplate from '../templates/filterMenuContainerTemplate';

export default class FilterMenuContainer extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return filterMenuContainerTemplate();
  }

  getContainer() {
    return this.getElement().querySelector('.main-navigation__items-container');
  }

  setStatisticClickHandler(callback) {
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener('click', (e) => {
      e.preventDefault();
      callback();
    })
  }
}
