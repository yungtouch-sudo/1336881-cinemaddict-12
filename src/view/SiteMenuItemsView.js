import AbstractView from "./BaseView.js";

const createSiteMenu = (filters, current) => {
  const items = filters.map((filter) => {
    return `<a href="#all" data-type="${filter.type}" class="main-navigation__item ${filter.type === current ? `main-navigation__item--active` : ``}">
      ${filter.name}
      <span class="main-navigation__item-count">${filter.count}</span>
    </a>`
  }).join('');

  return `<div class="main-navigation__items">
    ${items}
  </div>`;
};
export default class SiteMenuItemsView extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._callback = {};

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }

  getTemplate() {
    return createSiteMenu(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this.getElement().querySelector('.main-navigation__item--active').classList.remove('main-navigation__item--active');
    evt.target.classList.add('main-navigation__item--active');
    this._callback.filterTypeChange(evt.target.dataset.type);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
