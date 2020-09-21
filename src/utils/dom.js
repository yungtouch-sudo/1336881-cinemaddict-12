import {RENDER_POSITIONS} from '../consts';

export const createElement = (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;

    return newElement.firstChild;
};

export const renderElement = (container, element, place = RENDER_POSITIONS.BEFOREEND) => {
    switch (place) {
      case RENDER_POSITIONS.AFTERBEGIN:
        container.prepend(element);
        break;
      case RENDER_POSITIONS.BEFOREEND:
        container.append(element);
        break;
    }
  };
