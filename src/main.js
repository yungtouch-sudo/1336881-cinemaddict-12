import UserRankView from "./view/UserRankView.js";
import SiteMenuView from "./view/SiteMenuView.js";
import SiteSortingView from "./view/SiteSortingView.js";
import FilmsContainerView from "./view/FilmsContainerView.js";
import FilmCardView from "./view/FilmCardView.js";
import ButtonShowMoreView from "./view/ButtonShowMoreView.js";
import FilmDetalisView from "./view/FilmDetalisView.js";
import FilmExstraView from "./view/FilmExstraView.js";
import {renderElement} from "./utils.js";
import {generateFilms} from "./mocks/films.js";

const QUANTITY_FILMS = {
  FILM_COUNT: 5,
  MAX_CARD: 30,
  CARD_LINE: 5,
  ADD_MORE: 5,
};

const getFilmCardRender = (filmCard, containerSelector) => {
  const start = 0;
  const container = document.querySelector(containerSelector);
  return () => {
    for (let i = start; i < start + QUANTITY_FILMS.FILM_COUNT; i += 1) {
      renderElement(container, filmCard[i].card.getElement());

      filmCard[i].card.getElement().addEventListener(`click`, () => {
        renderElement(siteMainElement, filmCard[i].popup.getElement());
        filmCard[i].popup.getElement().querySelector(`.film-details__close-btn`)
          .addEventListener(`click`, () => filmCard[i].popup.getElement().remove);
      });

    }
  };
};

const films = generateFilms(QUANTITY_FILMS.MAX_CARD);
const topRatedFilms = generateFilms(2);
const mostCommentedFilms = generateFilms(2);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
//const siteFooterElement = document.querySelector(`.footer`);

const userRank = new UserRankView();
renderElement(siteHeaderElement, userRank.getElement());

const siteMenu = new SiteMenuView();
renderElement(siteMainElement, siteMenu.getElement());

const siteSorting = new SiteSortingView();
renderElement(siteMainElement, siteSorting.getElement());

const filmsContainer = new FilmsContainerView();
renderElement(siteMainElement, filmsContainer.getElement());

const filmCards = films.map((film) => {
  const card = new FilmCardView(film);
  const popup = new FilmDetalisView(film);
  return {card, popup};
});

const filmCardsRender = getFilmCardRender(filmCards, `.films-list__container`);
filmCardsRender();

const filmsElement = siteMainElement.querySelector(`.films`);

const showMore = new ButtonShowMoreView();
renderElement(filmsElement, showMore.getElement());


const topRatedFilmCards = topRatedFilms.map((film) => {
  return new FilmCardView(film);
});

const topRatedContainer = new FilmExstraView([`Top Rated`, `top-rated`]);
renderElement(filmsElement, topRatedContainer.getElement());
topRatedFilmCards.forEach((film) => {
  renderElement(document.querySelector(`.top-rated .films-list__container`), film.getElement());
});

const mostCommendFilmCard = mostCommentedFilms.map((film) => {
  return new FilmCardView(film);
});

const mostCommentedContainer = new FilmExstraView([`Most commented`, `most-commented`]);
renderElement(filmsElement, mostCommentedContainer.getElement());
mostCommendFilmCard.forEach((film) => {
  renderElement(document.querySelector(`.most-commented .films-list__container`), film.getElement());
});
