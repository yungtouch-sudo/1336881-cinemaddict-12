import AbstractView from "./BaseView.js";
import filmsContainerTemplate from '../templates/filmsContainerTemplate';

export default class FilmsContainerView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return filmsContainerTemplate();
  }

  getContainer() {
    return this.getElement().querySelector('.films-list__container');
  }
}
