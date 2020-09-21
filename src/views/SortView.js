import AbstractView from "./BaseView.js";
import sortTemplate from '../templates/sortTemplate';

export default class SortView extends AbstractView {
  constructor() {
    super();
    this._callback = {};
  }

  getTemplate() {
    return sortTemplate();
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler.bind(this));
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this.getElement().querySelector('.sort__button--active').classList.remove('sort__button--active');
    evt.target.classList.add('sort__button--active');
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
