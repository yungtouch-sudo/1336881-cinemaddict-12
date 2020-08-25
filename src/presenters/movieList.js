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

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
//const siteFooterElement = document.querySelector(`.footer`);

export default class MovieList {
  constructor(films, topRatedFilms, mostCommentedFilms) {
    this.films = films;
    this.userRank = new UserRankView();
    this.siteMenu = new SiteMenuView();
    this.siteSorting = new SiteSortingView();
    this.filmsContainer = new FilmsContainerView();
    this.filmCards = films.map((film) => {
      const card = new FilmCardView(film);
      const popup = new FilmDetalisView(film);
      return {card, popup};
    });

    this.topRatedFilms = topRatedFilms;
    this.mostCommentedFilms = mostCommentedFilms;
    this.topRatedFilmCards = topRatedFilms.map((film) => {
      const card = new FilmCardView(film);
      const popup = new FilmDetalisView(film);
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
  }

  getFilmCardRender(filmCard, containerSelector, quantity, isShowMore = false) {
    let start = 0;
    const container = document.querySelector(containerSelector);
    return () => {
      if (filmCard.length === 0) {
        const getNoData = new NoDataView();
        renderElement(container, getNoData.getElement());
      } else {
        for (let i = start; i < start + quantity; i += 1) {
          renderElement(container, filmCard[i].card.getElement());

          filmCard[i].card.setEventListener(`click`, () => {
            this.openPopup(filmCard[i].popup.getElement());
          });

        }
        start += QUANTITY.ADD_MORE;
        if (Number(start) >= Number(filmCard.length) && isShowMore) {
          this.showMore.getElement().remove();
        }
      }
    };
  }

  render() {
    renderElement(siteHeaderElement, this.userRank.getElement());
    renderElement(siteMainElement, this.siteMenu.getElement());
    renderElement(siteMainElement, this.siteSorting.getElement());
    renderElement(siteMainElement, this.filmsContainer.getElement());
    const filmsElement = siteMainElement.querySelector(`.films`);
    this.filmCardsRender = this.getFilmCardRender(this.filmCards, `.films-list__container`, QUANTITY.FILM_COUNT, true);
    this.filmCardsRender();
    if (this.films.length > 0) {
      renderElement(filmsElement, this.showMore.getElement());
      this.showMore.setEventListener(`click`, this.filmCardsRender);
    }
    renderElement(filmsElement, this.topRatedContainer.getElement());
    this.getFilmCardRender(this.topRatedFilmCards, `.top-rated .films-list__container`, this.topRatedFilms.length)();
    renderElement(filmsElement, this.mostCommentedContainer.getElement());
    this.getFilmCardRender(this.mostCommendFilmCard, `.most-commented .films-list__container`, this.mostCommentedFilms.length)();
  }

  openPopup(popupElement) {
    renderElement(siteMainElement, popupElement);
    popupElement.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => popupElement.remove());
    document.addEventListener(`keydown`, (e) => {
      if (e.key === `Escape`) {
        popupElement.remove();
      }
    });
  }

}

