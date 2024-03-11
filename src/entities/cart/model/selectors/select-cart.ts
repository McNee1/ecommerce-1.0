import { StateSchema } from '@/app/providers/store-provider';

export const selectShoppingCart = (state: StateSchema) => state.cart.shoppingCart;
