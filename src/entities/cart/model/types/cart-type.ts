import { ProductData } from '@/entities/products';

type T = 'failed' | 'idle' | 'pending' | 'succeeded';

export interface CartData extends Omit<ProductData, 'id' | 'countInCart'> {
  count: number;
  id: string;
}

export interface CartSchema {
  actionStatus: T;
  error: null | string;
  shoppingCart: CartData[] | null;
  status: T;
}
