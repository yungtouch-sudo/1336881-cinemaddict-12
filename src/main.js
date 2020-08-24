import {generateFilms} from "./mocks/films.js";
import MovieList from "./presenters/movieList.js";
import {QUANTITY} from "./mocks/consts.js";

const films = generateFilms(QUANTITY.MAX_CARD);
const topRatedFilms = generateFilms(2);
const mostCommentedFilms = generateFilms(2);

const movieList = new MovieList(films, topRatedFilms, mostCommentedFilms);
movieList.render();
