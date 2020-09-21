import FilterMenuContainer from "../views/FilterMenuContainerView";
import FilterMenuItem from "../views/FilterMenuItemView";
import {renderElement} from "../utils/dom";
import {FILTERS} from "../utils/filters";
import {FILTER_TYPES} from "../consts.js";

export default class FilterPresenter {
  constructor(container, filterModel, filmsModel) {
    this.container = container;

    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._isFirstInit = true;

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    //this._filterModel.addObserver(this._handleModelEvent);
  }

  render() {
    if(this._isFirstInit) {
      this._prerender();
    }

    this._currentFilter = this._filterModel.getFilter();

    const filtersData = this._getFiltersData();

    this._filterComponent = new FilterMenuItem(filtersData, this._currentFilter);
    this._filterComponent.setFilterChangeHandler(this._handleFilterTypeChange);

    this.container.textContent = ``;
    renderElement(this.container, this._filterComponent.getElement(), `afterbegin`);
  }

  _prerender() {
    const filterView = new FilterMenuContainer;

    renderElement(this.container, filterView.getElement());
    this.container = filterView.getElement().querySelector('.main-navigation__items-container');

    this._isFirstInit = false;
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(filterType);
  }

  _handleModelEvent() {
    this.render();
  }

  _getFiltersData() {
    const tasks = this._filmsModel.getAll();

    return [
      {
        type: FILTER_TYPES.ALL,
        name: `All`,
        count: FILTERS[FILTER_TYPES.ALL](tasks).length
      },
      {
        type: FILTER_TYPES.WATCHLIST,
        name: `Watchlist`,
        count: FILTERS[FILTER_TYPES.WATCHLIST](tasks).length
      },
      {
        type: FILTER_TYPES.HISTORY,
        name: `History`,
        count: FILTERS[FILTER_TYPES.HISTORY](tasks).length
      },
      {
        type: FILTER_TYPES.FAVORITES,
        name: `Favorites`,
        count: FILTERS[FILTER_TYPES.FAVORITES](tasks).length
      },
    ];
  }
}
