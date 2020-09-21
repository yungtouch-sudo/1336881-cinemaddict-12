import Observer from "../utils/Observer.js";
import {FILTERS} from '../utils/filters';
import SORTS from '../utils/sort';

export default class FilmsModel extends Observer{
  constructor(filterModel, sortModel) {
    super();

    this._films = [];

    this._sortModel = sortModel;
    this._filterModel = filterModel;

    this._filterModel.addObserver(this._filterHandler.bind(this));
    this._sortModel.addObserver(this._sortHandler.bind(this));
  }

  setFilms(films) {
    this._films = this._films.concat(films);
    this._notify();
  }

  getFiltered() {
    const filterType = this._filterModel.getFilter();
    const sortType = this._sortModel.getSort();
    const filteredFilms = FILTERS[filterType](this._films.slice());
    const sortedFilms = SORTS[sortType](filteredFilms.slice());
    return sortedFilms;
  }

  getAll() {
    return this._films;
  }

  getMostCommented() {
      return this._films.slice(0, 2);
  }

  getTopRated() {
      return this._films.slice(3, 5);
  }

  getByID(id) {
    return this._films.find((movie) => {
      return movie.id === id;
    });
  }

  add(movie) {
    this._films.push(movie);
  }

  update(id, update) {
    const movie = this.getByID(id);
    const updateKeys = Object.keys(update);
    updateKeys.forEach((key) => {
      movie[key] = update[key];
    });
    this._notify();
  }


  static adaptToClient(data) {
    return {
      id: data.id,
      title: data.film_info.title,
      original: data.film_info.alternative_title,
      poster: data.film_info.poster,
      description: data.film_info.description,
      rating: data.film_info.total_rating,
      date: data.film_info.release.date,
      duration: data.film_info.runtime,
      genre: data.film_info.genre,
      ages: data.film_info.age_rating,
      countries: data.film_info.release.release_country,
      director: data.film_info.director,
      writers: data.film_info.writers,
      actors: data.film_info.actors,
      comments: data.comments.length,
      tags: {
        isWatchList: data.user_details.watchlist,
        isAllreadyWatched: data.user_details.already_watched,
        isFavorite: data.favorite,
      }
    };
  }

  static adaptToServer(data) {
    return {
      id: data.id,
      film_info: {
            title: data.title,
            alternative_title: data.original,
            total_rating: data.rating,
            poster: data.poster,
            age_rating: data.ages,
            director: data.director,
            writers: data.writers,
            actors: data.actors,
            release: {
                date: data.date,
                release_country: data.country
            },
            runtime: data.duration,
            genre: data.genre,
            description: data.description
        },
        user_details: {
            watchlist: data.tags.isWatchList,
            already_watched: data.tags.isAllreadyWatched,
            favorite: data.tags.isFavorite
        }
      };
  }

  _filterHandler() {
    this._notify();
  }

  _sortHandler() {
    this._notify();
  }

}
