import {FilterType} from "../consts.js";

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isWatchList),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isAllreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};
