import FilmPresenter from "../presenters/FilmPresenter";
import ButtonShowMoreView from "../views/ButtonShowMoreView";
import NoDataView from "../views/NoDataView";
import { renderElement } from "../utils/dom";


export default class MainFilmListPresenter {
  constructor(filmsModel, container) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._showMore = new ButtonShowMoreView();
    this._noData = new NoDataView();

    this._quantityFilms = 5;
    this._showedFilms = 0;

    this._filmsModel.addObserver(this._handleModelEvent.bind(this))

    this._showMore.setShowMoreHandler(this._showMoreHandler.bind(this));
  }

  render() {
    this._showedFilms = 0;
    this._clearContainer();

    if(this._filmsModel.getFiltered().length > 0){
      this._renderFilms();
    } else {
      renderElement(this._container, this._noData.getElement());
    }
  }

  _renderFilms() {
    this._clearContainer();

    const films = this._filmsModel.getFiltered();
    this._showedFilms += this._quantityFilms;

    for(let i = 0; i < this._showedFilms; i++) {
      if(films[i]) {
        this._renderFilm(films[i]);
      }
    }

    if(this._showedFilms < films.length) {
      renderElement(this._container, this._showMore.getElement());
      this._isShowMoreBtnRendered = true;
    }
  }

  _renderFilm(filmData) {
    const film = new FilmPresenter(filmData);
    film.setUpdateHandler(this._updateHandler.bind(this));
    film.renderCard(this._container);
}

  _clearContainer() {
    this._container.textContent = '';
  }

  _updateHandler(id, update){
    this._filmsModel.update(id, update);
  }

  _showMoreHandler() {
    this._renderFilms();
  }

  _handleModelEvent() {
    this.render();
  }

}
