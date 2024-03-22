import { useEffect, useState } from 'react';

import { generatePagesForPagination } from '@/pages/main-page/lib/generate-pages';

interface PaginationProps {
  className?: string;
  limitPerPage: number;
  onNextPage: () => void;
  onPageChanger: (pageId: number) => void;
  onPrevPage: () => void;
  pageNumber: number;
  pagesInView: number;
  total: number | null;
}

export const Pagination = ({
  pageNumber,
  pagesInView,
  total,
  limitPerPage,
  onNextPage,
  onPageChanger,
  onPrevPage,
  className,
}: PaginationProps) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    if (total) {
      const totalPages = Math.ceil(total / limitPerPage);
      const pagesToDisplay = Math.min(pagesInView, totalPages);
      const initPages = Array.from({ length: pagesToDisplay }, (_, index) => index + 1);
      setPages(initPages);
    }
  }, [limitPerPage, pagesInView, total]);

  useEffect(() => {
    const updatedPages = generatePagesForPagination(pageNumber, pagesInView);

    if (updatedPages) {
      setPages(updatedPages);
    }
  }, [pageNumber, pagesInView]);

  const nextPageHandler = () => {
    onNextPage();
  };

  const prevPageHandler = () => {
    onPrevPage();
  };

  return (
    <nav className={['d-flex', className].join(' ')}>
      <div className='pagination m-auto'>
        <button
          onClick={prevPageHandler}
          className={['page-link', pageNumber <= 1 && 'disabled'].join(' ')}
        >
          &laquo;
        </button>

        {total &&
          pages.map((pageId) => (
            <button
              key={pageId}
              onClick={() => onPageChanger(pageId)}
              className={['page-link', pageId === pageNumber ? 'active' : ''].join(' ')}
            >
              {pageId}
            </button>
          ))}
        {total && (
          <button
            className={[
              'page-link',
              pageNumber >= total / limitPerPage && 'disabled',
            ].join(' ')}
            onClick={nextPageHandler}
          >
            &raquo;
          </button>
        )}
      </div>
    </nav>
  );
};
