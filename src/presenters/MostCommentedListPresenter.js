import {RENDER_POSITIONS} from '../consts';
import {renderElement} from "../utils/dom";
import extraContainerView from '../views/ExtraContainerView';
import ExtraFilmListPresenter from './ExtraFilmListPresenter';

export default class MostCommentedFilmsPresenter extends ExtraFilmListPresenter{
    constructor(filmsModel, container){
        const containerView = new extraContainerView([`Most commented`, `most-commented`]);
        const films = filmsModel.getMostCommented();

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
