import AbstractView from "./BaseView.js";

const createButtonShowMore = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ButtonShowMoreView extends AbstractView {
  getTemplate() {
    return createButtonShowMore();
  }
}


