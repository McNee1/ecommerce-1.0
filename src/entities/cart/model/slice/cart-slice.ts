import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from '../services/addToCart';
import { deleteFormCart } from '../services/deleteFromCart';
import { getCartProducts } from '../services/getCartProducts';
import { increaseProductsCount } from '../services/increaseProductsCount';
import { CartSchema } from '../types/cart-type';

import { StateSchema } from '@/app/providers/store-provider';

const initialState = {
  shoppingCart: [],
  error: null,
  actionStatus: 'idle',
  status: 'idle',
} satisfies CartSchema as CartSchema;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, { payload: product }) => {
        // if (state.shoppingCart?.length) {
        //   const itemIndex = state.shoppingCart.findIndex(
        //     (el) => el.id === action.payload.id
        //   );

        //   if (itemIndex !== -1) {
        //     state.shoppingCart[itemIndex] = action.payload;
        //   } else {
        //     state.shoppingCart = [...state.shoppingCart, action.payload];
        //   }
        // } else {
        //   state.shoppingCart?.push(action.payload);
        // }
        if (state.shoppingCart?.length) {
          state.shoppingCart = [...state.shoppingCart, product];
        } else {
          state.shoppingCart?.push(product);
        }

        state.actionStatus = 'succeeded';
      })
      .addCase(addToCart.pending, (state) => {
        state.actionStatus = 'pending';
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.actionStatus = 'failed';

        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      //

      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.shoppingCart = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getCartProducts.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.status = 'failed';

        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      //
      .addCase(deleteFormCart.fulfilled, (state, { payload: id }) => {
        if (state.shoppingCart) {
          state.shoppingCart = state.shoppingCart?.filter((product) => product.id !== id);
          state.actionStatus = 'succeeded';
          state.error = null;
        }
      })
      .addCase(deleteFormCart.pending, (state) => {
        state.actionStatus = 'pending';
      })
      .addCase(deleteFormCart.rejected, (state, action) => {
        state.actionStatus = 'failed';

        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      //
      .addCase(increaseProductsCount.fulfilled, (state, { payload: product }) => {
        if (!state.shoppingCart) {
          return;
        }
        const itemIndex = state.shoppingCart.findIndex((el) => el.id === product.id);

        state.shoppingCart[itemIndex] = product;
      });
  },
});

export const selectShoppingCart = (state: StateSchema) => state.cart.shoppingCart;
export const selectStatusCart = (state: StateSchema) => state.cart.status;
export const selectErrorCart = (state: StateSchema) => state.cart.error;

export const { actions: cartActions } = cartSlice;
export const { reducer: cartReducer } = cartSlice;
