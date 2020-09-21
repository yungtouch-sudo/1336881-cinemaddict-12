import AbstractView from "./BaseView.js";
import filterMenuContainerTemplate from '../templates/filterMenuContainerTemplate';

export default class FilterMenuContainer extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return filterMenuContainerTemplate();
  }
}
