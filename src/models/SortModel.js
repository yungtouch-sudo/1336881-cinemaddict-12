import Observer from "../utils/Observer.js";
import {SORT_TYPES} from "../consts";

export default class SortModel extends Observer {
  constructor() {
    super();
    this._currentSort = SORT_TYPES.DEFAULT;
  }

  setSort(sort) {
    this._currentSort = sort;
    this._notify(sort);
  }

  getSort() {
    return this._currentSort;
  }
}
