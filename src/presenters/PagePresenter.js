import { renderElement } from '../utils/dom';
import FilterModel from '../models/FilterModel';
import FilmsModel from '../models/FilmsModel';
import SortModel from '../models/SortModel';
import FilterPresenter from "./FilterPresenter";
import MainPagePresenter from "./pages/MainPagePresenter";
import UserRankView from '../views/UserRankView';
import LoadingView from '../views/LoadingView';
import StatisticView from '../views/StatisticView';
import FilterMenuContainer from "../views/FilterMenuContainerView";
import { FILTER_TYPES } from "../consts";

export default class PagePresenter{
    constructor(api) {
        this._api = api;

        this._siteHeaderElement = document.querySelector(`.header`);
        this._siteMainElement = document.querySelector(`.main`);
        this._siteFooterElement = document.querySelector(`.footer`);

        this._filterModel = new FilterModel();
        this._sortModel = new SortModel();
        this._filmsModel = new FilmsModel(this._filterModel, this._sortModel);

        this._menuContainer = new FilterMenuContainer;

        this._filterPresenter = new FilterPresenter(this._menuContainer.getContainer(), this._filterModel, this._filmsModel);
        this._mainPagePresenter = new MainPagePresenter(this._siteMainElement, this._filmsModel, this._sortModel);

        this._userRankView = new UserRankView();
        this._loadingView = new LoadingView();
        this._statisticView = new StatisticView();

        this._currentPage = '';

        this._menuContainer.setStatisticClickHandler(this.renderStatistic.bind(this));
        this._filterModel.addObserver(this.renderMain.bind(this));
    }

    render() {
        renderElement(this._siteHeaderElement, this._userRankView.getElement());
        renderElement(this._siteMainElement, this._menuContainer.getElement());
        renderElement(this._siteMainElement, this._loadingView.getElement());
        this._filterPresenter.render();
        this._load().then(this.renderMain.bind(this));
    }

    renderMain() {
        if(this._currentPage !== 'main') {
            this._statisticView.getElement().remove();
            this._mainPagePresenter.render();
            this._currentPage = 'main';
        }
    }

    renderStatistic() {
        if(this._currentPage !== 'statistic') {
            this._mainPagePresenter.remove();
            this._filterModel.setFilter(FILTER_TYPES.NOTHING);
            renderElement(this._siteMainElement, this._statisticView.getElement());
            this._currentPage = 'statistic';
        }
    }

    _load() {
        return this._api.getFilms()
            .then((films) => {
                this._loadingView.removeElement();
                this._filmsModel.setFilms(films);
            });
    }
}
