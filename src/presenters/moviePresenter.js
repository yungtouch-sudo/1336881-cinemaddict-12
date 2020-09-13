import FilmCardView from "../view/FilmCardView";
import FilmDetalisView from "../view/FilmDetalisView";
import {renderElement} from "../utils";

class MoviePresenter {
    constructor(filmData) {
        this._siteMainElement = document.querySelector(`.main`);

        this._card = new FilmCardView(filmData);
        this._popup = new FilmDetalisView(filmData);



        this._card.getElement().addEventListener('click', this.openPopupHandler.bind(this));
        document.addEventListener('keydown', this.closePopupHandler.bind(this));
        this._popup.getElement().querySelector(`.film-details__close-btn`)
            .addEventListener('click', this.closePopupHandler.bind(this));
    }

    renderCard(container) {
        renderElement(container, this._card.getElement());
    }

    renderPopup() {
        renderElement(this._siteMainElement, this._popup.getElement());
    }

    closePopup() {
        this._popup.getElement().remove();
    }

    openPopupHandler() {
        this.renderPopup();
    }

    closePopupHandler(e) {
        if(e.type === 'click' || e.key === 'Escape') {
            this.closePopup();
        }
    }

    setDeleteCommentHandler(callback) {
        this._popup.setDeleteCommentHandler(callback);
    }

    setUpdateHandler(callback) {
        this._card.setUpdateHandler(callback);
        this._popup.setUpdateHandler(callback);
    }

}

export default MoviePresenter;
