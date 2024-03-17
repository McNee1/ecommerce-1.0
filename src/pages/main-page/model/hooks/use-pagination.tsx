import { useMemo, useState } from 'react';
import { LIMIT_PER_PAGE } from '../const/constants';

import { useAppDispatch } from '@/app/hook/hooks';
import { getProducts, ProductData } from '@/entities/products';
import { chunkArray } from '@/shared/lib/chunk-array';
import { findIndex } from '@/shared/lib/find-index';

export const usePagination = (products: ProductData[] | null) => {
  const [skipCount, setSkipCount] = useState<number>(LIMIT_PER_PAGE);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState<number[]>([1, 2, 3, 4, 5]);

  const dispatch = useAppDispatch();

  const handlePageChanger = (id: number) => {
    setPageNumber(id);

    if (chunkedArray?.[id - 1]) {
      return;
    }

    const newSkipCount = id * LIMIT_PER_PAGE;

    setSkipCount(newSkipCount);
    void dispatch(
      getProducts({ limit: id * LIMIT_PER_PAGE - skipCount, skip: skipCount })
    );
  };

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

  const chunkedArray = useMemo(() => {
    if (products) {
      const array = chunkArray(products, LIMIT_PER_PAGE);
      return array;
    }
  }, [products]);

  return {
    handlePageChanger,
    handleNextPage,
    handlePrevPage,
    chunkedArray,
    pageNumber,
    pages,
  };
};
