import { useEffect, useMemo, useState } from 'react';
import { INIT_PAGE_NUMBER, LIMIT_PER_PAGE } from '../const/constants';

import { ProductData } from '@/entities/products';
import { useMySearchParams } from '@/shared/hooks/use-search-params';
import { chunkArray } from '@/shared/lib/chunk-array';

export const usePagination = (
  products: ProductData[] | null,
  selectedCategory: string
) => {
  const [skipCount, setSkipCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const { hasKeyName, getParam, setSearchParams } = useMySearchParams();

  useEffect(() => {
    if (hasKeyName('page')) {
      setPageNumber(Number(getParam('page')));
    } else {
      setPageNumber(INIT_PAGE_NUMBER);
    }
  }, [hasKeyName, getParam]);

  useEffect(() => {
    if (selectedCategory) {
      setSkipCount(0);
      setPageNumber(1);
    }
  }, [selectedCategory]);

  const handlePageChanger = (pageId: number) => {
    setPageNumber(pageId);
    const newSkipCount = pageNumber * LIMIT_PER_PAGE;

    setSkipCount(newSkipCount);

    if (selectedCategory) {
      setSearchParams({ page: String(pageId), select: selectedCategory });
    } else {
      setSearchParams({ page: String(pageId) });
    }
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
    const nextPage = pageNumber + 1;
    handlePageChanger(nextPage);
  };
  const handlePrevPage = () => {
    const prevPage = pageNumber - 1;
    handlePageChanger(prevPage);
  };

  return {
    handlePageChanger,
    handleNextPage,
    handlePrevPage,
    setPageNumber,
    setSkipCount,
    curPageData,
    pageNumber,
    skipCount,
  };
};
