import commentsView from "./CommentsView.js";
import AbstractView from "./BaseView";
import filmDetalisTemplate from '../templates/filmDetailsTemplate';

export default class FilmDetalis extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return filmDetalisTemplate(this._data);
  }

  setDeleteCommentHandler(callback) {
    this.getElement().querySelector('.form-details__bottom-container').addEventListener('click', (e) => {
      if(e.target.dataset.id) {
        callback(this._data.id, e.target.dataset.id);
      }
    });
  }

  setUpdateHandler(callback) {
    this.getElement().querySelector('.film-details__controls').addEventListener('click', (e) => {
      this._updateHandler(e.target, callback);
    })
  }

  setCloseHandler(callback) {
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => this._closeHandler(callback));
    document.addEventListener('keydown', (e) => {
      if(e.key === `Escape`) {
        this._closeHandler(callback);
      }
    });
  }

  setAddCommentHandler(callback) {
    document.addEventListener('keydown', (e) => {
      if(e.key === `Enter` && e.ctrlKey) {
        const date = new Date(Date.now())
        const form = new FormData(this.getElement().querySelector(`.film-details__inner`));
        callback({emoji: form.get(`comment-emoji`), text: form.get(`comment`), date: date.toISOString()});
      }
    })
  }

  _closeHandler(callback) {
    callback();
    this.removeElement();
  }

  _updateHandler(target, callback) {
    if(target.id === 'watchlist') {
      return callback(this._data.id, {isWatchList: !this._data.isWatchList});
    }
    if(target.id === 'watched') {
      return callback(this._data.id, {isAllreadyWatched: !this._data.isAllreadyWatched});
    }
    if(target.id === 'favorite') {
      return callback(this._data.id, {isFavorite: !this._data.isFavorite});
    }
  }
}
