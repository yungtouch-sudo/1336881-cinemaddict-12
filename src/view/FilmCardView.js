import {createElement} from "../utils";

const createFilmCard = ({title, poster, description, comments, rating, year, duration, genre}, index) => {
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
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
    </article>`
  ;
};
export default class FilmCardView {
  constructor(args) {
    this._element = null;
    this._args = args;
  }

  getTemplate() {
    return createFilmCard(this._args);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
