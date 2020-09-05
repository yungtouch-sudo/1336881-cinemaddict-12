import {generateFilms} from "./mocks/films.js";
import MovieList from "./presenters/movieList.js";
import {QUANTITY} from "./mocks/consts.js";
import Movie from "./model/movies.js";
import Filter from "./presenters/filter.js";
import FilterModel from "./model/filter";


const films = generateFilms(QUANTITY.MAX_CARD);
const movies = new Movie(films);
const topRatedFilms = generateFilms(2);
const mostCommentedFilms = generateFilms(2);

const filterModel = new FilterModel();
const filterPresenter = new Filter(siteMainElement, filterModel, tasksModel);

filterPresenter.init();


const movieList = new MovieList(movies, topRatedFilms, mostCommentedFilms);
movieList.render();



