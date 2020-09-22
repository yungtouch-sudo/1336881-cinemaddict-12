import {FILTER_TYPES} from '../consts';

export const FILTERS = {
  [FILTER_TYPES.ALL]: (films) => films,
  [FILTER_TYPES.WATCHLIST]: (films) => films.filter((film) => film.isWatchList),
  [FILTER_TYPES.HISTORY]: (films) => films.filter((film) => film.isAllreadyWatched),
  [FILTER_TYPES.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
  [FILTER_TYPES.NOTHING]: (films) => films
};
