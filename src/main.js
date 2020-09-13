import {generateFilms} from "./mocks/films.js";
import MovieList from "./utils/movieList.js";
import Filter from './presenters/filter';
import {QUANTITY} from "./mocks/consts.js";
import Movies from "./model/movies.js";
import FilterModel from "./model/filter";
import {renderElement} from "./utils";
import UserRankView from "./view/UserRankView";
import SiteMenuView from "./view/SiteMenuView";
import SiteSortingView from "./view/SiteSortingView";
import FilmsContainerView from "./view/FilmsContainerView";
import ButtonShowMoreView from "./view/ButtonShowMoreView";
import FilmExstraView from "./view/FilmExstraView";
import {SortType, FilterType} from "./consts.js";
import {sortFilmDate} from "./utils";
import {sortFilmRating} from "./utils";
import {filter} from './utils/filter';


const films = generateFilms(QUANTITY.MAX_CARD);

const filterModel = new FilterModel();
const moviesModel = new Movies(films, filterModel);
const mostCommentedMovieModel = new Movies(films.slice(0, 2), filterModel);
const topRatedMovieModel = new Movies(films.slice(2, 4), filterModel);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const userRank = new UserRankView();
const siteSorting = new SiteSortingView();
const filmsContainer = new FilmsContainerView();
const topRatedContainer = new FilmExstraView([`Top Rated`, `top-rated`]);
const mostCommentedContainer = new FilmExstraView([`Most commented`, `most-commented`]);

const filterPresenter = new Filter(siteMainElement, filterModel, moviesModel);

renderElement(siteHeaderElement, userRank.getElement());

filterPresenter.init();

renderElement(siteMainElement, siteSorting.getElement());
renderElement(siteMainElement, filmsContainer.getElement());

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsContainerElement = filmsElement.querySelector('.films-list__container');
const mostCommentedContainerElement = mostCommentedContainer.getElement().querySelector('.films-list__container');
const topRatedContainerElement = topRatedContainer.getElement().querySelector('.films-list__container');

const movieList = new MovieList(moviesModel, filmsContainerElement, QUANTITY.FILM_COUNT);
const topRatedMovieList = new MovieList(topRatedMovieModel, topRatedContainerElement, QUANTITY.FILM_COUNT, true);
const mostCommentedMovieList = new MovieList(mostCommentedMovieModel, mostCommentedContainerElement, QUANTITY.FILM_COUNT, true);


movieList.init();

renderElement(filmsElement, topRatedContainer.getElement());
renderElement(filmsElement, mostCommentedContainer.getElement());

topRatedMovieList.init();
mostCommentedMovieList.init();


siteSorting.setSortTypeChangeHandler(SortTypeChangeHandler);


function SortTypeChangeHandler(sortType) {
    if (moviesModel.sortType === sortType) {
      return;
    }
    moviesModel.sortType = sortType;
}
