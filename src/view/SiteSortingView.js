import AbstractView from "./BaseView.js";
import {SortType} from "../consts.js";
const createSiteSorting = () => {
  return `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type = '${SortType.DEFAULT}' >Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type = '${SortType.DATE}' >Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type = '${SortType.RATING}' >Sort by rating</a></li>
    </ul>`;
};
export default class SiteSortingView extends AbstractView {
  constructor() {
    super();
    this._callback = {};
    this.setSortTypeChangeHandler = this._setSortTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createSiteSorting();
  }
  _setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler.bind(this));
  }
  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}


