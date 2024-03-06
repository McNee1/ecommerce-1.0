import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartSchema } from '../types/cart-type';

import { RootState } from '@/app/providers/store-provider';
import { ProductData } from '@/entities/products';

const initialState: CartSchema = {
  shoppingCart: null,
  error: null,
  addingStatus: 'idle',
  status: 'idle',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductData>) => {
      console.log(action.payload);
      state.shoppingCart = state.shoppingCart
        ? [...state.shoppingCart, action.payload]
        : [action.payload];
    },
  },
});

export const selectShoppingCart = (state: RootState) => state.cart.shoppingCart;

export const { actions: cartActions } = cartSlice;
export const { reducer: cartReducer } = cartSlice;
