import AbstractView from "./BaseView.js";
import userRankTemplate from '../templates/userRankTemplate';

export default class UserRankView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return userRankTemplate();
  }
}
