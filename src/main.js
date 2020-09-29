import {render, RenderPosition} from './utils/render.js';
import {MenuItem, UpdateType} from './const.js';
import Config from "./config.js";
import MovieModel from './model/movies.js';
import FilterModel from './model/filter.js';
import UserProfilePresenter from './presenter/profile.js';
import MovieList from './presenter/movie-list.js';
import FilterPresenter from "./presenter/filter.js";
import FooterStatistic from './view/footer-statisctic.js';
import Statistics from './view/statistics.js';
import Api from './api/index.js';
import Store from "./api/store.js";
import Provider from "./api/provider.js";


const STORE_NAME = `${Config.STORE_PREFIX}-${Config.STORE_VER}`;

const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteHeaderElement = document.querySelector(`.header`);

const moviesModel = new MovieModel();
const filtersModel = new FilterModel();

const api = new Api(Config.END_POINT, Config.AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filterPresenter = new FilterPresenter(siteMainElement, filtersModel, moviesModel);
const moviePresenter = new MovieList(siteMainElement, moviesModel, filtersModel, apiWithProvider);

const handleMainMenuClick = (menuItem) => {
  if (menuItem === currentMenuMode) {
    return;
  }

  switch (menuItem) {
    case MenuItem.FILTER:
      currentMenuMode = menuItem;
      siteStatistic.destroy();
      moviePresenter.init();
      break;
    case MenuItem.STATISTICS:
      currentMenuMode = menuItem;
      siteStatistic = new Statistics(moviesModel.get(), siteMainElement);
      moviePresenter.destroy();
      break;
  }
};

let siteStatistic = null;
let currentMenuMode = MenuItem.FILTER;

filterPresenter.init();
moviePresenter.init();

apiWithProvider.getMovies().then((films) => {

  moviesModel.set(UpdateType.INIT, films);
  filterPresenter.turnOnFilters();
  filterPresenter.setMenuClickHandler(handleMainMenuClick);
  const userProfilePresenter = new UserProfilePresenter(siteHeaderElement, moviesModel);
  userProfilePresenter.init();
  render(siteFooterElement, new FooterStatistic(moviesModel.get().length), RenderPosition.BEFOREEND);
})
.catch(() => {
  moviesModel.set(UpdateType.INIT, []);
});


window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  moviePresenter.setConnectionModeOnline();
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
  moviePresenter.setConnectionModeOffline();
});
