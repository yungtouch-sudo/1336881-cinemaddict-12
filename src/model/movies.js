import FilmCardView from "../view/FilmCardView";
import FilmDetalisView from "../view/FilmDetalisView";

export default class Movies {
  constructor(array = []) {
    this._array = array.map((film) => {
      return ({data: film, card: new FilmCardView(film), popup: new FilmDetalisView(film)});
    });
  }

  get length() {
    return this._array.length;
  }

  getAllMovies() {
    return this._array.map((movie) => {
      return movie.data;
    });
  }

  getMovie(id) {
    return this._array.find((movie) => {
      return movie.id === id;
    }).data;
  }

  getCard(id) {
    return this._array.find((movie) => {
      return movie.id === id;
    }).card;
  }

  getPopup(id) {
    return this._array.find((movie) => {
      return movie.id === id;
    }).popup;
  }

  addMovie(movie) {
    this._array.push({data: movie, card: new FilmCardView(movie), popup: new FilmDetalisView(movie)});
  }

  updateMovie(id, update) {
    const movie = this.getMovie(id);
    const updateKeys = Object.keys(update);
    updateKeys.forEach((key) => {
      movie[key] = update[key];
    });
  }

  [Symbol.iterator]() {
    let index = 0;
    const that = this;
    return {
      next() {
        return that._array[index]
          ? {value: that._array[index++], done: false}
          : {done: true};
      },
    };
  }
}
