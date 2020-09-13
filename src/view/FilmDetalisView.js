import commentsView from "./CommentsView.js";
import AbstractView from "./BaseView";

const createFilmDetalis = ({title, ages, poster, original, rating, description, countries, year, duration, director, writers, actors, genre, comments, isFavorite, isWatchList, isAllreadyWatched}) => {
  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${ages}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${original}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${year}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${countries}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                 ${genre.map((g) => `<span class="film-details__genre">${g}</span>`).join(``)}
               </td>
            </tr>
          </table>

          <p class="film-details__film-description">
             ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" ${isWatchList ? `checked="checked"` : ``} name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" ${isAllreadyWatched ? `checked="checked"` : ``} name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" ${isFavorite ? `checked="checked"` : ``} name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
    ${commentsView(comments)}
    </div>
  </div>`;
};

export default class FilmDetalis extends AbstractView {
  constructor(args) {
    super();
    this._args = args;
  }

  getTemplate() {
    return createFilmDetalis(this._args);
  }

  setDeleteCommentHandler(callback) {
    this.getElement().querySelector('.form-details__bottom-container').addEventListener('click', (e) => {
      if(e.target.dataset.id) {
        callback(this._args.id, e.target.dataset.id);
      }
    })
  }


  setUpdateHandler(callback) {
    this.getElement().querySelector('.film-details__controls').addEventListener('click', (e) => {
      this._updateHandler(e.target, callback);
    })
  }

  _updateHandler(target, callback) {
    if(target.id === 'watchlist') {
      return callback(this._args.id, {isWatchList: !this._args.isWatchList});
    }
    if(target.id === 'watched') {
      return callback(this._args.id, {isAllreadyWatched: !this._args.isAllreadyWatched});
    }
    if(target.id === 'favorite') {
      return callback(this._args.id, {isFavorite: !this._args.isFavorite});
    }

  }
}
