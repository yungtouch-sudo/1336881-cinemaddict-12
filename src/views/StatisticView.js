import AbstractView from "./BaseView.js";
import statisticTemplate from '../templates/statisticTemplate';

export default class StatisticView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return statisticTemplate();
  }
}
