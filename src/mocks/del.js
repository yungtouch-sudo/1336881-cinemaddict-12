import {generateFilms} from "./films";
import ButtonShowMoreView from "../view/ButtonShowMoreView";
import {renderElement, renderTemplate} from "../utils";
import SiteSortingView from "../view/SiteSortingView";

const films = generateFilms(QUANTITY_FILMS.MAX_CARD);
const extraFilms1 = generateFilms(2);
const extraFilms2 = generateFilms(2);

const showMore = new ButtonShowMoreView();
renderElement(filmsElement, showMore.getElement());

const userRank = new UserRank();
renderElement(siteHeaderElement, userRank.getElement());

const siteSorting = new SiteSortingView();
renderElement(siteMainElement, siteSorting.getElement());


let addFilmsCount = QUANTITY_FILMS.CARD_LINE;

const renderFilmCards = () => {
  const FilmsCount = addFilmsCount;
  addFilmsCount += QUANTITY_FILMS.ADD_MORE;
  if (addFilmsCount > films.length) {
    addFilmsCount = films.length;
    document.querySelector(`.films-list__show-more`).remove();
  }
  for (let i = FilmsCount; i < addFilmsCount; i++) {
    renderTemplate(filmListContainer, createFilmCard(films[i], i));
  }
};


export const addShowMoreButton = (evt) =>
  document.querySelector(`.films-list__show-more`).addEventListener(`click`, evt);


for (let i = 0; i < FILM_COUNT; i++) {
  renderTemplate(filmListContainer, createFilmCard(films[i], i));
}
addShowMoreButton(renderFilmCards);

const renderedExtra1 = extraFilms1.map((card, i) => createFilmCard(card, i)).join(``);
const renderedExtra2 = extraFilms2.map((card, i) => createFilmCard(card, i)).join(``);

//renderTemplate(filmsElement, FilmExstra(renderedExtra1, `Top Rated`, `top-rated`));
//renderTemplate(filmsElement, FilmExstra(renderedExtra2, `Most commented`, `most-commented`));


const filmExtra = new FilmExstra();
renderElement(siteMainElement, filmExtra.getElement());

const createPopup = (target, filmsArr) => {
  const index = target.closest(`.film-card`).getAttribute(`data-id`);
  renderTemplate(siteMainElement, createFilmDetalis(filmsArr[index]));
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

