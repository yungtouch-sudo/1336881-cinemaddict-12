export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place = RenderPosition.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

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

export const sortFilmDate = (filmA, filmB) => {
  const dataA = filmA.card._args;
  const dataB = filmB.card._args;
  const weight = getWeightForNullDate(dataA.year, dataB.year);

  if (weight !== null) {
    return weight;
  }

  return dataA.year - dataB.year;
};

export const sortFilmRating = (filmA, filmB) => {
  const dataA = filmA.card._args;
  const dataB = filmB.card._args;
  const weight = getWeightForNullDate(dataA.rating, dataB.rating);

  if (weight !== null) {
    return weight;
  }

  return dataA.rating - dataB.rating;
};
