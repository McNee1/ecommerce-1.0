import { useEffect } from 'react';
import { LIMIT_PER_PAGE } from '../const/constants';

import { useAppDispatch } from '@/app/hook/hooks';
import { getProducts, ProductData } from '@/entities/products';

export const useGetProducts = (products: ProductData[] | null) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!products) {
      void dispatch(getProducts({ limit: LIMIT_PER_PAGE, skip: 0 }));
    }
  }, [dispatch, products]);
};
