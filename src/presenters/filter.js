import FilterView from "../view/SiteMenuView";
import FilterItemsView from "../view/SiteMenuItemsView";
import {renderElement} from "../utils";
import {filter} from "../utils/filter.js";
import {FilterType} from "../consts.js";

export default class Filter {
  constructor(filterContainer, filterModel, moviesModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;

    this._filterComponent = null;
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._isFirstInit = true;
  }

  init() {
    if(this._isFirstInit) {
      const filterView = new FilterView;
      renderElement(this._filterContainer, filterView.getElement());
      this._filterContainer = filterView.getElement().querySelector('.main-navigation__items-container');
      this._isFirstInit = false;
    }
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();

    this._filterComponent = new FilterItemsView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    this._filterContainer.textContent = ``;
    renderElement(this._filterContainer, this._filterComponent.getElement(), `afterbegin`);

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    //this._filterModel.addObserver(this._handleModelEvent);

  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(filterType);
  }

  _handleModelEvent() {
    this.init();
  }

  _getFilters() {
    const tasks = this._moviesModel.getAllMoviesWithoutFilters();

    return [
      {
        type: FilterType.ALL,
        name: `All`,
        count: filter[FilterType.ALL](tasks).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](tasks).length
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filter[FilterType.HISTORY](tasks).length
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](tasks).length
      },
    ];
  }
}
