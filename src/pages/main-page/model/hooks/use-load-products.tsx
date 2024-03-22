import { useEffect } from 'react';
import { LIMIT_PER_PAGE } from '../const/constants';

import { useAppDispatch } from '@/app/hook/hooks';
import { getProducts, ProductData } from '@/entities/products';

export const useLoadProducts = (
  pageNumber: number,
  curPageData: ProductData[] | null,
  skipCount: number,
  selectedCategory: string
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const load = () => {
      if (pageNumber && !curPageData?.length) {
        console.log(curPageData);
        void dispatch(
          getProducts({
            category: selectedCategory,
            limit: pageNumber * LIMIT_PER_PAGE - skipCount,
            skip: skipCount,
          })
        );
      }
    };

    void load();
  }, [dispatch, pageNumber, skipCount, selectedCategory, curPageData]);
};
