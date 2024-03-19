interface PaginationProps {
  limitPerPage: number;
  onNextPage: () => void;
  onPageChanger: (pageId: number) => void;
  onPrevPage: () => void;
  pageNumber: number;
  pages: number[];
  total: number | null;
}

export const Pagination = ({
  pageNumber,
  pages,
  total,
  limitPerPage,
  onNextPage,
  onPageChanger,
  onPrevPage,
}: PaginationProps) => {
  return (
    <nav className='d-flex mt-2 mb-1'>
      <div className='pagination m-auto'>
        <button
          onClick={onPrevPage}
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
            onClick={onNextPage}
          >
            &raquo;
          </button>
        )}
      </div>
    </nav>
  );
};
