import { ProductData } from '@/entities/products';

type T = 'failed' | 'idle' | 'pending' | 'succeeded';

export interface CartSchema {
  addingStatus: T;
  error: string | null;
  shoppingCart: ProductData[] | null;
  status: T;
}
