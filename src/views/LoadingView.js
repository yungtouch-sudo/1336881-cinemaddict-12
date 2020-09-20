import AbstractView from "./BaseView.js";
import loadingTemplate from "../templates/loadingTemplate";

export default class LoadingView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return loadingTemplate();
  }
}
