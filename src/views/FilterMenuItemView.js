import AbstractView from "./BaseView.js";
import filterMenuItemTemplate from '../templates/filterMenuItemTemplate';

export default class FilterMenuItemView extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._callback = {};

    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this.getElement().addEventListener('click', this._filterChangeHandler);
  }

  getTemplate() {
    return filterMenuItemTemplate(this._filters, this._currentFilter);
  }

  setFilterChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterChangeHandler);
  }

  _filterChangeHandler(evt) {
    evt.preventDefault();
    const active = this.getElement().querySelector('.main-navigation__item--active');
    if (active) active.classList.remove('main-navigation__item--active');
    evt.target.classList.add('main-navigation__item--active');
    this._callback.filterTypeChange(evt.target.dataset.type);
  }
}
