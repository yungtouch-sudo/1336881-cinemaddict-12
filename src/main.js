const FILM_COUNT = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

import {createUserRank} from "./view/UserRank.js";
import {createSiteMenu} from "./view/SiteMenu.js";
import {createSiteSorting} from "./view/SiteSorting.js";
import {createFilms} from "./view/Films.js";
import {createFilmCard} from "./view/FilmCard.js";
import {createButtonShowMore} from "./view/ButtonShowMore.js";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createUserRank());
render(siteMainElement, createSiteMenu());
render(siteMainElement, createSiteSorting());
render(siteMainElement, createFilms());

const filmsElement = siteMainElement.querySelector(`.films`);
let filmListContainer = filmsElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmListContainer, createFilmCard());
}
render(filmsElement, createButtonShowMore());


