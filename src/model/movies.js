import Observer from "../utils/Observer.js";
import {SortType} from "../consts.js";
import {sortFilmDate, sortFilmRating} from "../utils";
import {filter} from '../utils/filter';

export default class Movies extends Observer{
  constructor(array = [], filterModel) {
    super();
    this._array = array;
    this._sortType = SortType.DEFAULT;
    this._filterModel = filterModel;

    this._filterModel.addObserver(this._filterHandler.bind(this));
  }

  get sortType() {
    return this._sortType;
  }

  set sortType(type) {
    this._sortType = type;
    this._notify();
  }

  getAllMovies() {
    const filterType = this._filterModel.getFilter();
    return this.sortFilms(filter[filterType](this._array.slice()));
  }

  getAllMoviesWithoutFilters() {
    return this._array;
  }

  getMovie(id) {
    return this._array.find((movie) => {
      return movie.id === id;
    });
  }

  addMovie(movie) {
    this._array.push(movie);
  }

  updateMovie(id, update) {
    const movie = this.getMovie(id);
    const updateKeys = Object.keys(update);
    updateKeys.forEach((key) => {
      movie[key] = update[key];
    });
    this._notify();
  }

  deleteComment(movieID, commentID){
    const movie = this.getMovie(movieID);
    movie.comments = movie.comments.filter(({id}) => commentID !== id);
  }

  sortFilms(films) {
    switch (this._sortType) {
      case SortType.DATE:
        return films.sort(sortFilmDate);
      case SortType.RATING:
        return films.sort(sortFilmRating);
      default:
        return films;
    }
  }

  _filterHandler() {
    this._notify();
  }

}
