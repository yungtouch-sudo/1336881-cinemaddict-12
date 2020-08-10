const FILM_COUNT = 5;

const QUANTITY_FILMS = {
  MAX_CARD: 30,
  CARD_LINE: 5,
  ADD_MORE: 5,
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
//const siteFooterElement = document.querySelector(`.footer`);

import {createUserRank} from "./view/UserRank.js";
import {createSiteMenu} from "./view/SiteMenu.js";
import {createSiteSorting} from "./view/SiteSorting.js";
import {createFilms} from "./view/Films.js";
import {createFilmCard} from "./view/FilmCard.js";
import {createButtonShowMore} from "./view/ButtonShowMore.js";
import {createFilmDetalis} from "./view/film-popup.js";
import {generateFilms} from "./mocks/films.js";
import {createFilmExtra} from "./view/film-list-extra.js";


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createUserRank());
render(siteMainElement, createSiteMenu());
render(siteMainElement, createSiteSorting());
render(siteMainElement, createFilms());

const filmsElement = siteMainElement.querySelector(`.films`);
let filmListContainer = filmsElement.querySelector(`.films-list__container`);

const films = generateFilms(QUANTITY_FILMS.MAX_CARD);
const extraFilms1 = generateFilms(2);
const extraFilms2 = generateFilms(2);

render(filmsElement, createButtonShowMore());

let addFilmsCount = QUANTITY_FILMS.CARD_LINE;

const renderFilmCards = () => {
  const FilmsCount = addFilmsCount;
  addFilmsCount += QUANTITY_FILMS.ADD_MORE;
  if (addFilmsCount > films.length) {
    addFilmsCount = films.length;
    document.querySelector(`.films-list__show-more`).remove();
  }
  for (let i = FilmsCount; i < addFilmsCount; i++) {
    render(filmListContainer, createFilmCard(films[i], i));
  }
};


export const addShowMoreButton = (evt) =>
  document.querySelector(`.films-list__show-more`).addEventListener(`click`, evt);


for (let i = 0; i < FILM_COUNT; i++) {
  render(filmListContainer, createFilmCard(films[i], i));
}
addShowMoreButton(renderFilmCards);

const renderedExtra1 = extraFilms1.map((card, i) => createFilmCard(card, i)).join(``);
const renderedExtra2 = extraFilms2.map((card, i) => createFilmCard(card, i)).join(``);

render(filmsElement, createFilmExtra(renderedExtra1, `Top Rated`, `top-rated`));
render(filmsElement, createFilmExtra(renderedExtra2, `Most commented`, `most-commented`));

const createPopup = (target, filmsArr) => {
  const index = target.closest(`.film-card`).getAttribute(`data-id`);
  render(siteMainElement, createFilmDetalis(filmsArr[index]));
  const popup = document.querySelector(`.film-details`);
  const closePopup = (e) => {
    if (e.type === `click` || e.key === `Escape`) {
      popup.remove();
    }
  };
  popup.querySelector(`.film-details__close-btn`).addEventListener(`click`, closePopup);
  window.addEventListener(`keydown`, closePopup);
};


filmListContainer.addEventListener(`click`, (e) => {
  createPopup(e.target, films);
});

document.querySelector(`.top-rated`).addEventListener(`click`, (e) => {
  createPopup(e.target, extraFilms1);
});

document.querySelector(`.most-commented`).addEventListener(`click`, (e) => {
  createPopup(e.target, extraFilms2);
});

