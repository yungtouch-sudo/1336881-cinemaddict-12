import AbstractView from "./BaseView.js";

const createSiteMenu = () => {
  return `<nav class="main-navigation">
      <div class="main-navigation__items-container">
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};
export default class SiteMenuView extends AbstractView {
  constructor() {
    super();

  }

  getTemplate() {
    return createSiteMenu();
  }
}
