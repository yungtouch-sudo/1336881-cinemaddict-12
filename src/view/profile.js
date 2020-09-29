import AbstractView from './abstract.js';
import {getUserRank} from '../utils/common.js';

const createProfile = (rank) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class Profile extends AbstractView {

  constructor(quantityOfWatched) {
    super();
    this._rank = getUserRank(quantityOfWatched);
  }

  getTemplate() {
    return createProfile(this._rank);
  }
}
