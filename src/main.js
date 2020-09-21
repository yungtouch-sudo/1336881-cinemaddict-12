import { renderElement } from './utils/dom';
import FilterModel from './models/FilterModel';
import FilmsModel from './models/FilmsModel';
import SortModel from './models/SortModel';
import FilterPresenter from "./presenters/FilterPresenter";
import MainFilmListPresenter from './presenters/MainFilmListPresenter';
import MostCommentedListPresenter from './presenters/MostCommentedListPresenter';
import TopRatedListPresenter from './presenters/TopRatedListPresenter';
import FilmsContainerView from "./views/FilmsContainerView";
import UserRankView from './views/UserRankView';
import LoadingView from './views/LoadingView';
import SortPresenter from "./presenters/SortPresenter";
import Api from './utils/Api';
import CONFIG from './config';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const api = new Api(CONFIG.END_POINT, CONFIG.AUTHORIZATION);

const filterModel = new FilterModel();
const sortModel = new SortModel();
const filmsModel = new FilmsModel(filterModel, sortModel);

const filmsContainerView = new FilmsContainerView();

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const sortPresenter = new SortPresenter(siteMainElement, sortModel);
const mainFilmListPresenter = new MainFilmListPresenter(filmsModel, filmsContainerView.getContainer());
const mostCommentedListPresenter = new MostCommentedListPresenter(filmsModel, filmsContainerView.getElement());
const topRatedListPresenter = new TopRatedListPresenter(filmsModel, filmsContainerView.getElement());

const userRankView = new UserRankView();
const loadingView = new LoadingView();

renderElement(siteHeaderElement, userRankView.getElement());
renderElement(siteMainElement, loadingView.getElement());

api.getFilms().then((films) => {
    loadingView.removeElement();

    filmsModel.setFilms(films);

    filterPresenter.render();
    sortPresenter.render();

    renderElement(siteMainElement, filmsContainerView.getElement());

    mainFilmListPresenter.render();
    topRatedListPresenter.render();
    mostCommentedListPresenter.render();
});
