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
import NoDataView from "./view/NoDataView.js";

const QUANTITY_FILMS = {
  FILM_COUNT: 5,
  MAX_CARD: 0,
  CARD_LINE: 5,
  ADD_MORE: 5,
};

const openPopup = (popupElement) => {
  renderElement(siteMainElement, popupElement);
  popupElement.querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, () => popupElement.remove());
  document.addEventListener(`keydown`, (e) => {
    if (e.key === `Escape`) {
      popupElement.remove();
    }
  });
};


const getFilmCardRender = (filmCard, containerSelector, quantity) => {
  let start = 0;
  const container = document.querySelector(containerSelector);
  return () => {
    if (filmCard.length === 0) {
      const getNoData = new NoDataView();
      renderElement(container, getNoData.getElement());
    } else {
      for (let i = start; i < start + quantity; i += 1) {
        renderElement(container, filmCard[i].card.getElement());

        filmCard[i].card.getElement().addEventListener(`click`, () => {
          openPopup(filmCard[i].popup.getElement());
        });

      }
      start += QUANTITY_FILMS.ADD_MORE;
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

const filmCardsRender = getFilmCardRender(filmCards, `.films-list__container`, QUANTITY_FILMS.FILM_COUNT);
filmCardsRender();

const filmsElement = siteMainElement.querySelector(`.films`);

if (films.length > 0) {
  const showMore = new ButtonShowMoreView();
  renderElement(filmsElement, showMore.getElement());
  showMore.getElement().addEventListener(`click`, filmCardsRender);
}

const topRatedFilmCards = topRatedFilms.map((film) => {
  const card = new FilmCardView(film);
  const popup = new FilmDetalisView(film);
  return {card, popup};
});

const topRatedContainer = new FilmExstraView([`Top Rated`, `top-rated`]);
renderElement(filmsElement, topRatedContainer.getElement());
getFilmCardRender(topRatedFilmCards, `.top-rated .films-list__container`, topRatedFilms.length)();


const mostCommendFilmCard = mostCommentedFilms.map((film) => {
  const card = new FilmCardView(film);
  const popup = new FilmDetalisView(film);
  return {card, popup};
});

const mostCommentedContainer = new FilmExstraView([`Most commented`, `most-commented`]);
renderElement(filmsElement, mostCommentedContainer.getElement());
getFilmCardRender(mostCommendFilmCard, `.most-commented .films-list__container`, mostCommentedFilms.length)();

