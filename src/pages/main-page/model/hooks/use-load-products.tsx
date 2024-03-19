import { useEffect } from 'react';
import { LIMIT_PER_PAGE } from '../const/constants';

import { useAppDispatch } from '@/app/hook/hooks';
import { getProducts, ProductData } from '@/entities/products';

export const useLoadProducts = (
  pageNumber: number,
  currChunkedPage: ProductData[] | null,
  skipCount: number
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const load = () => {
      if (pageNumber && !currChunkedPage) {
        void dispatch(
          getProducts({
            limit: pageNumber * LIMIT_PER_PAGE - skipCount,
            skip: skipCount,
          })
        );
      }
    };

    load();
  }, [currChunkedPage, dispatch, pageNumber, skipCount]);
};
