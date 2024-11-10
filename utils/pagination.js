export function calculatePagination(total, limit, page) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const offset = (currentPage - 1) * limit;

  return {
    currentPage,
    totalPages,
    offset,
  };
}
