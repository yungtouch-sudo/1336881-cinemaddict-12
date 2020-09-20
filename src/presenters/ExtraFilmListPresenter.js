import FilmPresenter from './FilmPresenter';

export default class ExtraFilmListPresenter {
  constructor(films, container) {
    this._container = container;
    this._films = films;
  }

  render() {
    for(let filmData of this._films) {
        const film = new FilmPresenter(filmData);
        film.renderCard(this._container);
    }
  }
}
