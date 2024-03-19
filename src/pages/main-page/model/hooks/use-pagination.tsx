import { useEffect, useMemo, useState } from 'react';
import { generatePagesForPagination } from '../../lib/generate-pages';
import { INIT_PAGE_NUMBER, LIMIT_PER_PAGE } from '../const/constants';

import { ProductData } from '@/entities/products';
import { useMySearchParams } from '@/shared/hooks/useMySearchParams';
import { chunkArray } from '@/shared/lib/chunk-array';
import { findIndex } from '@/shared/lib/find-index';

export const usePagination = (products: ProductData[] | null) => {
  const [skipCount, setSkipCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pages, setPages] = useState<number[]>([1, 2, 3, 4, 5]);

  const { hasKeyName, pageNumberParam, setSearchParams } = useMySearchParams();

  useEffect(() => {
    if (hasKeyName) {
      const newPages = generatePagesForPagination(pageNumberParam, pages.length);
      newPages && setPages(newPages);

      setPageNumber(pageNumberParam);
    } else {
      setPageNumber(INIT_PAGE_NUMBER);
    }
  }, [hasKeyName, pageNumberParam, pages.length]);

  const handlePageChanger = (pageId: number) => {
    setPageNumber(pageId);
    const newSkipCount = pageNumber * LIMIT_PER_PAGE;

    setSkipCount(newSkipCount);
    setSearchParams({ page: String(pageId) });
  };
  const chunkedArray = useMemo(() => {
    if (products) {
      const array = chunkArray(products, LIMIT_PER_PAGE);
      return array;
    }
  }, [products]);

  const curPageData = useMemo(() => {
    return chunkedArray?.[pageNumber - 1] ?? null;
  }, [chunkedArray, pageNumber]);

  const handleNextPage = () => {
    handlePageChanger(pageNumber + 1);

    const id = findIndex(pages, pageNumber);

    if (id === pages.length - 1) {
      setPages((prev) => prev.map((num) => num + 1));
    }
  };
  const handlePrevPage = () => {
    handlePageChanger(pageNumber - 1);

    const id = findIndex(pages, pageNumber);
    if (id === 0) {
      setPages((prev) => prev.map((num) => num - 1));
    }
  };

  return {
    handlePageChanger,
    handleNextPage,
    handlePrevPage,
    curPageData,
    pageNumber,
    pages,
    skipCount,
  };
};
