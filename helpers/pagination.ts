// Define an interface for the pagination object
interface PaginationObject {
  currentPage: number;
  limitItems: number;
  skip?: number;
  totalPages?: number;
}

// Define the query type
interface QueryParams {
  page?: string;
  limit?: string;
}

const paginationHelper = (objectPagination: PaginationObject, query: QueryParams, countTotalItems: number):PaginationObject  => {
  const pagination = { ...objectPagination };
  // If the query parameters are not provided, set default values
  if (query.page) {
    pagination.currentPage = parseInt(query.page);
  }

  if (query.limit) {
    pagination.limitItems = parseInt(query.limit);
  }

  // Check if page is not a number. If it's not, set it to 1 and skip to 0. This will prevent any errors.
  if (isNaN(pagination.currentPage)) {
    pagination.currentPage = 1;
    pagination.skip = 0;
  }

  // Calculate the total number of pages skip
  pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;

  const totalPages = Math.ceil(countTotalItems / pagination.limitItems);

  pagination.totalPages = totalPages;

  return pagination;
}
export default paginationHelper;