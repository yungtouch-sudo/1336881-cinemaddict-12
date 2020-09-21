
import {RENDER_POSITIONS} from '../consts';
import {renderElement} from "../utils/dom";
import FilmDetailsView from '../views/FilmDetailsView';
import CommentsView from '../views/CommentsView';
import CommentsModel from '../models/CommentsModel';

export default class FilmDetailsPresenter {
    constructor(filmData) {
        this._commentsModel = new CommentsModel(filmData.id);

        this._popupView = new FilmDetailsView(filmData);
        this._commentsView = new CommentsView(this._commentsModel);

        this._popupView.setCloseHandler(this._closeHandler.bind(this));

        this._mainContainer = document.querySelector(`.main`);
        this._commentsContainer = this._popupView.getElement().querySelector('.form-details__bottom-container');
        this._popupView.setAddCommentHandler(this._addCommentHandler.bind(this));

        this._commentsModel.addObserver(this._handleModelEvent.bind(this));

        this._opened = false;
    }

    open() {
        this._opened = true;
        this.render();
    }

    render() {
        if(this._opened) {
            this._commentsView.removeElement();
            renderElement(this._mainContainer, this._popupView.getElement(), RENDER_POSITIONS.BEFOREEND);
            renderElement(this._commentsContainer, this._commentsView.getElement(), RENDER_POSITIONS.BEFOREEND);
        }
    }

    setFilmUpdateHandler(callback) {
        this._popupView.setUpdateHandler(callback);
    }

    _handleModelEvent() {
        this.render();
    }

    _addCommentHandler(data) {
        if(this._opened) {
            this._commentsModel.add(data);
        }
    }

    _closeHandler() {
        this._opened = false;
    }
}
