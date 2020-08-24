import AbstractView from "./BaseView.js";

const getNoData = () => {
  return `<section class="films-list">
    <h2 class="films-list__title">There are no movies in our database</h2>
  </section>`;
};

export default class NoDataView extends AbstractView {
  getTemplate() {
    return getNoData();
  }
}

