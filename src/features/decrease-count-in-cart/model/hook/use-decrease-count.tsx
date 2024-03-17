import { useAppDispatch } from '@/app/hook/hooks';
import { decreaseProductCountAsync } from '@/entities/cart';
import { productsActions } from '@/entities/products';

export const useDecreaseCount = () => {
  const dispatch = useAppDispatch();

  const handleDecreaseCount = (id: number) => {
    void dispatch(decreaseProductCountAsync(id));
    dispatch(productsActions.decreaseProductCount(id));
  };

  return { handleDecreaseCount };
};
