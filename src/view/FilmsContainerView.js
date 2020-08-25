import AbstractView from "./BaseView.js";

const createFilms = () => {
  return `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
        </div>
      </section>`;
};
export default class FilmsContainerView extends AbstractView {
  getTemplate() {
    return createFilms();
  }
}

