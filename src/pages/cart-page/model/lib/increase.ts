import { PaymentSchema } from '../types/cart-types';

import { countDiscountPrice, discountAmount } from '@/shared/lib/discount';

export const increase = (
  prev: PaymentSchema,
  count: number,
  discountPercentage: number,
  price: number
): PaymentSchema => {
  return {
    productsCount: prev.productsCount + count,
    totalPrice: prev.totalPrice + price * count,
    discountPrice: +(
      prev.discountPrice +
      countDiscountPrice(price, discountPercentage) * count
    ).toFixed(2),
    discountAmount: +(
      prev.discountAmount +
      discountAmount(price, discountPercentage) * count
    ).toFixed(2),
  };
};
