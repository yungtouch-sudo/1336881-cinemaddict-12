import {RENDER_POSITIONS} from '../consts';
import {renderElement} from "../utils/dom";
import extraContainerView from '../views/ExtraContainerView';
import ExtraFilmListPresenter from './ExtraFilmListPresenter';

export default class TopRatedFilmsPresenter extends ExtraFilmListPresenter{
    constructor(filmsModel, container){
        const containerView = new extraContainerView([`Top Rated`, `top-rated`]);
        const films = filmsModel.getTopRated();

        super(films, containerView.getContainer());

        this._mainContainer = container;
        this._films = films;
        this._containerView = containerView;
    }

    render() {
        if(this._films.length > 0) {
            renderElement(this._mainContainer, this._containerView.getElement(), RENDER_POSITIONS.BEFOREEND);
            super.render();
        }
    }
}
