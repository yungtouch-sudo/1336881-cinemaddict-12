import {renderElement} from "../utils";
import UserRankView from "../view/UserRankView";
import NoDataView from "../view/NoDataView";
import {QUANTITY} from "../mocks/consts.js";
import SiteMenuView from "../view/SiteMenuView";
import SiteSortingView from "../view/SiteSortingView";
import FilmsContainerView from "../view/FilmsContainerView";
import FilmCardView from "../view/FilmCardView";
import FilmDetalisView from "../view/FilmDetalisView";
import ButtonShowMoreView from "../view/ButtonShowMoreView";
import FilmExstraView from "../view/FilmExstraView";
import {RenderPosition} from "../utils";
import {SortType} from "../consts.js";
import {sortFilmDate} from "../utils";
import {sortFilmRating} from "../utils";
import Popup from "../view/FilmCardView";
import Movie from "../model/movies";
import FilterModel from "../model/filter";



const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
// const siteFooterElement = document.querySelector(`.footer`);

export default class MovieList {
  constructor(movies, topRatedFilms, mostCommentedFilms) {
    const filters = [
      {
        type: `all`,
        name: `ALL`,
        count: 0
      }
    ];


    this.movies = movies;
    this._currentSortType = SortType.DEFAULT;
    this.userRank = new UserRankView();
    this.siteMenu = new SiteMenuView(filters, `all`);
    this.siteSorting = new SiteSortingView();
    this.filmsContainer = new FilmsContainerView();

    this.topRatedFilms = topRatedFilms;
    this.mostCommentedFilms = mostCommentedFilms;
    this.topRatedFilmCards = topRatedFilms.map((film) => {
      const card = new FilmCardView(film);
      card.setAddWatchListHandler(this.AddToWatchListHandler.bind(this));
      card.setAllreadyWatchedHandler(this.AllreadyWatchedHandler.bind(this));
      card.setFavoriteHandler(this.FavoriteHandler.bind(this));
      const popup = new FilmDetalisView(film);
      popup.setAddWatchListHandler(this.AddToWatchListHandler.bind(this));
      popup.setAllreadyWatchedHandler(this.AllreadyWatchedHandler.bind(this));
      popup.setFavoriteHandler(this.FavoriteHandler.bind(this));

      return {card, popup};
    });
    this.topRatedContainer = new FilmExstraView([`Top Rated`, `top-rated`]);
    this.mostCommendFilmCard = mostCommentedFilms.map((film) => {
      const card = new FilmCardView(film);
      const popup = new FilmDetalisView(film);
      return {card, popup};
    });
    this.mostCommentedContainer = new FilmExstraView([`Most commented`, `most-commented`]);
    this.showMore = new ButtonShowMoreView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._sortComponent = new SiteSortingView();
    this._currentSortType = SortType.DEFAULT;
    this._renderedFilmCount = 5;
    this.showedFilm = 5;
    this._popup = new Popup();
  }

  getFilmCardRender(movies, containerSelector, quantity, isShowMore = false) {
    const container = document.querySelector(containerSelector);
    return () => {
      if (movies.length === 0) {
        const getNoData = new NoDataView();
        renderElement(container, getNoData.getElement());
      } else {
        let showed = 0;
        for (let movie of movies) {
          if (showed >= this.showedFilm) {
            break;
          }
          showed++;
          renderElement(container, movie.card.getElement());

          movie.card.setEventListener(`click`, () => {
            this.openPopup(movie.popup);
          });

        }
        if (isShowMore) {
          this.showedFilm += QUANTITY.ADD_MORE;
          if (Number(this.showedFilm) >= Number(movies.length) && isShowMore) {
            this.showMore.getElement().remove();
          }
        }
      }
    };
  }

  render() {
    this._sourcedMovieListCards = this.movies.getAllMovies().slice();
    renderElement(siteHeaderElement, this.userRank.getElement());
    renderElement(siteMainElement, this.siteMenu.getElement());
    this._renderSort();
    renderElement(siteMainElement, this.filmsContainer.getElement());
    this._renderFilmList(true);
  }

  _renderFilmList(isReload = false) {
    const filmsElement = siteMainElement.querySelector(`.films`);
    this.filmCardsRender = this.getFilmCardRender(this.movies, `.films-list__container`, QUANTITY.FILM_COUNT, true);
    this.filmCardsRender();
    if (this.movies.length > 0 && isReload) {
      renderElement(filmsElement, this.showMore.getElement());
      this.showMore.setEventListener(`click`, () => {
        this._clearFilmList();
        this.filmCardsRender();
      });
    }
    renderElement(filmsElement, this.topRatedContainer.getElement());
    this.getFilmCardRender(this.topRatedFilmCards, `.top-rated .films-list__container`, this.topRatedFilms.length)();
    renderElement(filmsElement, this.mostCommentedContainer.getElement());
    this.getFilmCardRender(this.mostCommendFilmCard, `.most-commented .films-list__container`, this.mostCommentedFilms.length)();

  }

  openPopup(popup) {
    renderElement(siteMainElement, popup.getElement());
    popup.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => popup.removeElement());
    document.addEventListener(`keydown`, (e) => {
      if (e.key === `Escape`) {
        popup.removeElement();
      }
    });
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSort() {
    renderElement(siteMainElement, this.siteSorting.getElement(), RenderPosition.BEFOREEND);
    this.siteSorting.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this.filmCards = this.filmCards.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this.filmCards = this.filmCards.sort(sortFilmRating);
        break;
      default:
        this.filmCards = this._sourcedMovieListCards.slice();
    }

    this._currentSortType = sortType;
  }

  _clearFilmList() {
    document.querySelector(`.films-list__container`).innerHTML = ``;
    this._renderedFilmCount = 5;
  }
  AddToWatchListHandler(object) {
    object.isWatchList = true;
  }
  AllreadyWatchedHandler(object) {
    object.isAllreadyWatched = true;
  }
  FavoriteHandler(object) {
    object.isFavorite = true;
  }
}

