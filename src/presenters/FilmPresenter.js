import FilmCardView from "../views/FilmCardView";
import FilmDetailsPresenter from './FilmDetailsPresenter';
import {RENDER_POSITIONS} from '../consts';
import {renderElement} from "../utils/dom";

export default class FilmPresenter {
    constructor(filmData) {
        this._cardView = new FilmCardView(filmData);
        this._popupPresenter = new FilmDetailsPresenter(filmData);

        this._openPopupHandler = this.renderPopup.bind(this);

        this._cardView.setOpenHandler(this._openPopupHandler);
    }

    renderCard(container) {
        renderElement(container, this._cardView.getElement(), RENDER_POSITIONS.BEFOREEND);
    }

    renderPopup() {
        this._popupPresenter.open();
    }

    setUpdateHandler(callback) {
        this._cardView.setUpdateHandler(callback);
        this._popupPresenter.setFilmUpdateHandler(callback);
    }

}
