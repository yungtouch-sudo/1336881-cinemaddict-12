import {createElement} from "../utils.js";

const createFilmExtra = ([title, cssClass]) => {
  return `<section class="films-list--extra ${cssClass}">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">

      </div>
    </section>`
  ;
};
export default class FilmExtra {
  constructor(args) {
    this._element = null;
    this._args = args;
  }

  getTemplate() {
    return createFilmExtra(this._args);
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

