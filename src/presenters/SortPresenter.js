import SortView from '../views/SortView';
import {RENDER_POSITIONS} from '../consts';
import {renderElement} from "../utils/dom";

export default class SortPresenter {
    constructor(container, sortModel) {
        this._container = container;
        this._sortModel = sortModel;

        this._view = new SortView;

        this._view.setSortTypeChangeHandler(this._sortTypeChangeHandler.bind(this));
    }

    render() {
        renderElement(this._container, this._view.getElement(), RENDER_POSITIONS.BEFOREEND);
    }

    _sortTypeChangeHandler(sortType) {
        if (this._sortModel.getSort() === sortType) {
        return;
        }
        this._sortModel.setSort(sortType);
    }
}
