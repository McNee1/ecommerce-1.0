import { useAppDispatch } from '@/app/hook/hooks';
import { increaseProductCountAsync } from '@/entities/cart';
import { productsActions } from '@/entities/products';

export const useIncreaseCount = () => {
  const dispatch = useAppDispatch();

  const handleIncreaseCount = (id: number) => {
    void dispatch(increaseProductCountAsync(id));
    dispatch(productsActions.increaseProductCount(id));
  };

  return { handleIncreaseCount };
};
