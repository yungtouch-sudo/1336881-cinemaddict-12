const TITLES = [
  {
    title: `Созданы друг для друга`,
    original: `Made for Each Other`
  },
  {
    title: `Папай-морячок встречается с Синдбадом-мореходом`,
    original: `Popeye the sailor meets Sindbab the sailor`
  },
  {
    title: `След в полыни`,
    original: `Sagebrush trail`
  },
  {
    title: `Санта Клаус завоёвывает марсиан`,
    original: `Santa Claus conquers the Marthians`
  },
  {
    title: `Танец жизни`,
    original: `The dance of life`
  },
  {
    title: `Великий Фламарион`,
    original: `The great Flamarion`
  },
  {
    title: `Человек с золотой рукой`,
    original: `The man with the golden arm`
  }
];

const AGES = [`0+`, `6+`, `12+`, `16+`, `18+`];

const COUNTRIES = [
  `Россия`,
  `Польша`,
  `Канада`,
  `Китай`,
  `Япония`,
  `Германия`,
];

const NAMES = [
  `Олег`,
  `Сережа`,
  `Женя`,
  `Федя`,
];

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const FILM_RATING = {
  MIN: 0,
  MAX: 10,
};

const DESCRIPTION_QUANTITY = {
  MIN: 1,
  MAX: 5,
};

const COMMENTS_QUANTITY = {
  MIN: 0,
  MAX: 5
};
const COMMENT_DAY = [
  `2016/11/31 13:39`,
  `2013/4/31 11:29`,
  `2011/7/31 6:19`,
  `2018/3/31 7:23`,
  `2013/8/31 8:44`,

];
const EMOJI = [`smile.png`, `sleeping.png`, `puke.png`, `angry.png`];
const FILM_DATE = [`1555`, `1777`, `1666`, `1888`, `1999`];

const FILM_DURATION = [`2h 16m`, `1h 46m`, `1h 54m`, `2h 36m`, `3h 36m`];

const GENRES = [
  `Боевик`,
  `Комедия`,
  `Триллер`,
  `Драма`,
  `Комедия`,
  `Фэнтeзи`,
];

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomGenres = (commentsArr) => {
  const result = [];
  const commentsNumber = (Math.random() * (3 - 0) + 0);
  for (let i = 0; i <= commentsNumber; i += 1) {
    result.push(getRandomItem(commentsArr));
  }
  return result;
};

const getRandomRating = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(1);
};

const getRandomDescription = (text) => {
  const numberOfSentence = getRandomIntInclusive(DESCRIPTION_QUANTITY.MIN, DESCRIPTION_QUANTITY.MAX);
  return text.split(`. `, numberOfSentence).join(`. `);
};

const generateFilm = () => {
  const titles = getRandomItem(TITLES);
  return {
    title: titles.title,
    original: titles.original,
    poster: getRandomItem(POSTERS),
    description: getRandomDescription(DESCRIPTIONS),
    rating: getRandomRating(FILM_RATING.MIN, FILM_RATING.MAX),
    year: getRandomItem(FILM_DATE),
    duration: getRandomItem(FILM_DURATION),
    genre: getRandomGenres(GENRES),
    ages: getRandomItem(AGES),
    countries: getRandomItem(COUNTRIES),
    comments: generateComments(getRandomIntInclusive(COMMENTS_QUANTITY.MIN, COMMENTS_QUANTITY.MAX)),
    director: getRandomItem(NAMES),
    writers: getRandomItem(NAMES),
    actors: getRandomItem(NAMES),
    isWatchList: false,
    isAllreadyWatched: false,
    isFavorite: false,
  };
};


export const generateFilms = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

const generateComment = () => {
  return {
    text: getRandomDescription(DESCRIPTIONS),
    emoji: getRandomItem(EMOJI),
    author: getRandomItem(NAMES),
    date: getRandomItem(COMMENT_DAY),
  };
};

const generateComments = (count) => {
  return new Array(count).fill(``).map(generateComment);
};
