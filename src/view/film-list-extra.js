export const createFilmExtra = (cards, title, cssClass) => {
  return (
    `<section class="films-list--extra ${cssClass}">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">
        ${cards}
      </div>
    </section>`
  );
};
