import { useAppDispatch } from '@/app/hook/hooks';
import { addToCart } from '@/entities/cart';
import { ProductData, productsActions } from '@/entities/products';

export const useAddToCart = () => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: ProductData) => {
    void dispatch(addToCart(product));
    dispatch(productsActions.addProductCount(product.id));
  };

  return { handleAddToCart };
};
