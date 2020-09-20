export default (filters, current) => {
    const items = filters.map((filter) => {
      return `<a href="#all" data-type="${filter.type}" class="main-navigation__item ${filter.type === current ? `main-navigation__item--active` : ``}">
        ${filter.name}
        <span class="main-navigation__item-count">${filter.count}</span>
      </a>`
    }).join('');

    return `<div class="main-navigation__items">
      ${items}
    </div>`;
  };
