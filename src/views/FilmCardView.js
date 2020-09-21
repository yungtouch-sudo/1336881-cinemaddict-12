import AbstractView from "./BaseView";
import filmCardTemplate from '../templates/filmCardTemplate';

export default class FilmCardView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return filmCardTemplate(this._data);
  }

  setOpenHandler(callback) {
    this.getElement().addEventListener('click', callback);
  }

  setUpdateHandler(callback) {
    this.getElement().querySelector('.film-card__controls').addEventListener('click', (e) => {
      e.stopPropagation();
      this._updateHandler(e.target, callback);
    })
  }

  _updateHandler(target, callback) {
    if(target.classList.contains('film-card__controls-item--add-to-watchlist')) {
      return callback(this._data.id, {isWatchList: !this._data.isWatchList});
    }
    if(target.classList.contains('film-card__controls-item--mark-as-watched')) {
      return callback(this._data.id, {isAllreadyWatched: !this._data.isAllreadyWatched});
    }
    if(target.classList.contains('film-card__controls-item--favorite')) {
      return callback(this._data.id, {isFavorite: !this._data.isFavorite});
    }
  }
}
