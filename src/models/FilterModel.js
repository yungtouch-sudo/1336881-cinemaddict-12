import Observer from "../utils/Observer.js";
import {FILTER_TYPES} from "../consts";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = FILTER_TYPES.ALL;
  }

  setFilter(filter) {
    this._activeFilter = filter;
    this._notify(filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
