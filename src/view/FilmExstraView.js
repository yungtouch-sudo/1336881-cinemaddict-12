import AbstractView from "./BaseView.js";

const createFilmExtra = ([title, cssClass]) => {
  return `<section class="films-list--extra ${cssClass}">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">

      </div>
    </section>`
  ;
};
export default class FilmExtra extends AbstractView {
  constructor(args) {
    super();
    this._args = args;
  }

  getTemplate() {
    return createFilmExtra(this._args);
  }
}

