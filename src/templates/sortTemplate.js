import {SORT_TYPES} from '../consts';

export default () => {
    return `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active" data-sort-type = '${SORT_TYPES.DEFAULT}' >Sort by default</a></li>
        <li><a href="#" class="sort__button" data-sort-type = '${SORT_TYPES.DATE}' >Sort by date</a></li>
        <li><a href="#" class="sort__button" data-sort-type = '${SORT_TYPES.RATING}' >Sort by rating</a></li>
      </ul>`;
  };
