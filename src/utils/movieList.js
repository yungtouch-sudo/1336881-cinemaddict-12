import MoviePresenter from "../presenters/moviePresenter";
import ButtonShowMoreView from "../view/ButtonShowMoreView";
import {renderElement} from "../utils";
import NoDataView from "../view/NoDataView";

export default class MovieList {
  constructor(moviesModel, container, quantity, noSort = false) {
    this._container = container;
    this._quantity = quantity;
    this._moviesModel = moviesModel;
    this._showMore = new ButtonShowMoreView();
    this._noData = new NoDataView();

    if(!noSort) {
      this._moviesModel.addObserver(this._handleModelEvent.bind(this));
    }

    this._showMore.getElement().addEventListener('click', this.showMoreHandler.bind(this));
    this._showed = 0;
  }

  init() {
    this._container.textContent = '';
    this._showed = 0;
    if(this._moviesModel.getAllMovies().length > 0){
      this.renderCards();
    } else {
      renderElement(this._container, this._noData.getElement());
    }
  }

  renderShowMoreBtn(){
    renderElement(this._container, this._showMore.getElement());
  }

  renderCards() {
    this._container.textContent = '';
    const renderCount = this._showed + this._quantity;
    let i = 0;
    const movies = this._moviesModel.getAllMovies()
    for(let film of movies) {
      i++;
      const movie = new MoviePresenter(film);
      movie.setUpdateHandler(this._moviePresenterUpdateHandler.bind(this));
      movie.setDeleteCommentHandler(((movieID, commentID) => {
        this._moviesModel.deleteComment(movieID, commentID)
      }).bind(this));
      movie.renderCard(this._container);
      if(i >= renderCount) break;
    }
    this._showed = renderCount;
    if(this._showed < movies.length) {
      this.renderShowMoreBtn();
    }
  }

  _moviePresenterUpdateHandler(id, update){
    this._moviesModel.updateMovie(id, update);
  }

  showMoreHandler() {
    this.renderCards();
    if(this._showed >= this._moviesModel.getAllMovies.length) {
      this._showMore.getElement().remove();
     }
  }

  _handleModelEvent() {
    this.init();
  }

}
