import PagePresenter from './presenters/PagePresenter';
import Api from './utils/Api';
import CONFIG from './config';

const api = new Api(CONFIG.END_POINT, CONFIG.AUTHORIZATION);

const pagePresenter = new PagePresenter(api);

pagePresenter.render();
