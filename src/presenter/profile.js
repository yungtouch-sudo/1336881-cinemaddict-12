import Profile from '../view/profile.js';
import {render, RenderPosition, replace, remove} from "../utils/render.js";

export default class UserProfilePresenter {
  constructor(profileContainer, moviesModel) {
    this._moviesModel = moviesModel;
    this._profileContainer = profileContainer;
    this._userProfileComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    const countWatchedFilms = this._moviesModel.get()
      .filter((movie) => movie.isWatched).length;

    const prevProfileComponent = this._userProfileComponent;
    this._userProfileComponent = new Profile(countWatchedFilms);

    if (prevProfileComponent === null) {
      render(this._profileContainer, this._userProfileComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._userProfileComponent, prevProfileComponent);

    remove(prevProfileComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
