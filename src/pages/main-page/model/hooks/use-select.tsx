import { useEffect, useState } from 'react';
import axios from 'axios';
import { INIT_PAGE_NUMBER } from '../const/constants';

import { useAppDispatch } from '@/app/hook/hooks';
import { productsActions } from '@/entities/products';
import { useMySearchParams } from '@/shared/hooks/use-search-params';

export const useSelect = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const { getParam, setSearchParams } = useMySearchParams();

  const initialCategory = getParam('select') ?? '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const dispatch = useAppDispatch();

  const handleSelect = (select: string) => {
    setSelectedCategory(select);

    dispatch(productsActions.resetProducts());

    if (select) {
      setSearchParams({ page: String(INIT_PAGE_NUMBER), select: select });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    const loadCategory = async () => {
      try {
        if (categories.length) {
          return;
        }
        const { data } = await axios.get<string[]>(
          'https://dummyjson.com/products/categories'
        );

        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    void loadCategory();
  }, [categories]);

  return { selectedCategory, handleSelect, categories };
};
