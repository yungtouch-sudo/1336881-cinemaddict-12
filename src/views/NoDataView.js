import AbstractView from "./BaseView.js";
import noDataTemplate from "../templates/noDataTemplate";

export default class NoDataView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return noDataTemplate();
  }
}
