import { CartData } from '@/entities/cart/model/types/cart-type';

export const findById = (elements: CartData[] | null, id: string) => {
  return elements?.find((el) => el.id === id);
};
