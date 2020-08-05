const TITLES = [
  {title: `Made for Each Other`},
  {title: `Sagebrush trail`},
  {title: `Santa Claus conquers the Marthians`},
  {title: `The dance of life`},
  {title: `The great Flamarion`},
  {title: `The man with the golden arm`},
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

const COMMENTS_QUANTITY = [`1 comment`, `2 comments`, `3 comments`, `4 comments`, `5 comments`]; //комментарии — это отдельная структура данных с эмоцией, датой, автором и сообщением, а не просто массив строк в структуре фильма.


const FILM_DATE = [`1555`, `1777`, `1666`, `1888`, `1999`];

const FILM_DURATION = [`2h 16m`, `1h 46m`, `1h 54m`, `2h 36m`, `3h 36m`];

const GENRES = [
  `Боевик`,
  `Комедия`,
  `Триллер`,
  `Драма`,
  `Комедия`,
  `Фэнтeзи`,
  `Документальный`,
];

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomRating = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(1);
};

const getRandomDescription = (text) => {
  const numberOfSentence = getRandomIntInclusive(DESCRIPTION_QUANTITY.MIN, DESCRIPTION_QUANTITY.MAX);
  return text.split(`. `, numberOfSentence).join(`. `);
};

const generateFilm = () => {
  return {
    title: getRandomItem(TITLES).title,
    poster: getRandomItem(POSTERS),
    description: getRandomDescription(DESCRIPTIONS),
    comments: getRandomItem(COMMENTS_QUANTITY),
    rating: getRandomRating(FILM_RATING.MIN, FILM_RATING.MAX),
    year: getRandomItem(FILM_DATE),
    duration: getRandomItem(FILM_DURATION),
    genre: getRandomItem(GENRES),
  };
};


export const generateFilms = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

