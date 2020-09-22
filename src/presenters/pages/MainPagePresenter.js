import { renderElement } from '../../utils/dom';
import MainFilmListPresenter from '../MainFilmListPresenter';
import MostCommentedListPresenter from '../MostCommentedListPresenter';
import TopRatedListPresenter from '../TopRatedListPresenter';
import FilmsContainerView from "../../views/FilmsContainerView";
import SortPresenter from "../SortPresenter";

export default class MainPagePresenter {
    constructor(container, filmsModel, sortModel) {
        this._container = container;

        this._sortModel = sortModel;
        this._filmsModel = filmsModel;

        this._filmsContainerView = new FilmsContainerView();

        this._sortPresenter = new SortPresenter(this._container, this._sortModel);
        this._mainFilmListPresenter = new MainFilmListPresenter(this._filmsModel, this._filmsContainerView.getContainer());

        this._mostCommentedListPresenter = new MostCommentedListPresenter(this._filmsModel, this._filmsContainerView.getElement());
        this._topRatedListPresenter = new TopRatedListPresenter(this._filmsModel, this._filmsContainerView.getElement());
    }

    render() {
        this._sortPresenter.render();

        renderElement(this._container, this._filmsContainerView.getElement());

        this._mainFilmListPresenter.render();
        this._topRatedListPresenter.render();
        this._mostCommentedListPresenter.render();
    }

    remove() {
        this._filmsContainerView.getElement().remove();
    }

}
