export const generatePagesForPagination = (
  currentPageNumber: number,
  totalPages: number
) => {
  if (currentPageNumber >= totalPages) {
    const newPages = [];
    for (let i = currentPageNumber - totalPages + 1; i <= currentPageNumber; i++) {
      newPages.push(i);
    }
    return newPages;
  }
  return null;
};
