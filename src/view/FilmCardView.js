import AbstractView from "./BaseView";

const createFilmCard = ({title, poster, description, comments, rating, year, duration, genre, isWatchList, isAllreadyWatched, isFavorite}, index) => {
  return `<article data-id = "${index}" class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description.length > 140 ? description.slice(0, 139) + `...` : description}</p>
        <a class="film-card__comments">${comments.length}</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchList ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isAllreadyWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
        </form>
    </article>`;
};
export default class FilmCardView extends AbstractView {
  constructor(args) {
    super();
    this._args = args;
  }

  getTemplate() {
    return createFilmCard(this._args);
  }

  setUpdateHandler(callback) {
    this.getElement().querySelector('.film-card__controls').addEventListener('click', (e) => {
      e.stopPropagation();
      this._updateHandler(e.target, callback);
    })
  }

  _updateHandler(target, callback) {
    if(target.classList.contains('film-card__controls-item--add-to-watchlist')) {
      return callback(this._args.id, {isWatchList: !this._args.isWatchList});
    }
    if(target.classList.contains('film-card__controls-item--mark-as-watched')) {
      return callback(this._args.id, {isAllreadyWatched: !this._args.isAllreadyWatched});
    }
    if(target.classList.contains('film-card__controls-item--favorite')) {
      return callback(this._args.id, {isFavorite: !this._args.isFavorite});
    }

  }
}
