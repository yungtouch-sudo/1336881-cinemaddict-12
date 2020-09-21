import { SORT_TYPES } from "../consts";

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortFilmDate = (filmA, filmB) => {
    const weight = getWeightForNullDate(filmA.year, filmB.year);

    if (weight !== null) {
      return weight;
    }

    return filmA.year - filmB.year;
  };

  const sortFilmRating = (filmA, filmB) => {
    const weight = getWeightForNullDate(filmA.rating, filmB.rating);

    if (weight !== null) {
      return weight;
    }

    return filmA.rating - filmB.rating;
  };

  export default {
    [SORT_TYPES.DEFAULT]: (films) => films,
    [SORT_TYPES.DATE]: (films) => films.sort(sortFilmDate),
    [SORT_TYPES.RATING]: (films) => films.sort(sortFilmRating),
  }
