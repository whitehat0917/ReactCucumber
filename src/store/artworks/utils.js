const filterIsEmpty = (filter) => filter.categories.length === 0
  && !filter.price.min && !filter.price.max
  && filter.statuses.length === 0
  && filter.years.length === 0;

export const buildFilterQuery = (filter) => {
  if (filterIsEmpty(filter)) return '';
  const filters = [];
  if (filter.price.min) {
    filters.push(`price__gte=${filter.price.min}`);
  }
  if (filter.price.max) {
    filters.push(`price__lte=${filter.price.max}`);
  }
  if (filter.categories.length > 0) {
    const categoryFilter = filter.categories.map((category) => `${category}`).join(', ');
    filters.push(categoryFilter ? `category__in=${categoryFilter}` : null);
  }
  if (filter.statuses.length > 0) {
    const statusFilter = filter.statuses.map((status) => `${status}`).join(', ');
    filters.push(statusFilter ? `status__in=${statusFilter}` : null);
  }
  if (filter.years.length > 0) {
    const yearFilter = filter.years.map((year) => `${year}`).join(', ');
    filters.push(yearFilter ? `year__in==${yearFilter}` : null);
  }
  return filters.filter((v) => v).join('&');
};

export const buildSortingQuery = (sorting) => {
  let key = sorting.key;
  if (sorting.key === 'uploaded') {
    key = 'created';
  }
  // TODO: no support for size sorting
  if (sorting.key === 'size') {
    key = 'volume';
  }
  const ordering = sorting.order === 'desc' ? '-' : '';
  return `ordering=${ordering}${key}`;
};
