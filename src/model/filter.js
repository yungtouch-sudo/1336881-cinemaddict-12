import Observer from "../utils/Observer.js";
import {FilterType} from "../consts";

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(filter) {
    this._activeFilter = filter;
    this._notify(filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
