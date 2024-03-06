import { CartSchema } from '@/entities/cart/model/types/cart-type';
import { ProductSchema } from '@/entities/products';

export interface StateSchema {
  cart: CartSchema;
  products: ProductSchema;
}
