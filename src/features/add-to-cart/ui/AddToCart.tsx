import { useAddToCart } from '../model/hook/use-add-to-cart';

import { ProductData } from '@/entities/products';
import { AppButton } from '@/shared/ui/app-button/AppButton';

interface AddToCartProps {
  product: ProductData;
}

export const AddToCart = ({ product }: AddToCartProps) => {
  const { handleAddToCart } = useAddToCart();
  return (
    <AppButton
      className='btn-success mt-auto p-1'
      onClick={() => handleAddToCart(product)}
    >
      click, me
    </AppButton>
  );
};
