import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from '../services/add-to-cart';
import { decreaseProductCountAsync } from '../services/decrease-product-count';
import { deleteFormCart } from '../services/delete-from-cart';
import { getCartProducts } from '../services/get-cart-products';
import { increaseProductCountAsync } from '../services/increase-product-count';
import { CartSchema } from '../types/cart-type';

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
        if (state.shoppingCart?.length) {
          state.shoppingCart = [...state.shoppingCart, product];
        } else {
          state.shoppingCart?.push(product);
        }

        state.actionStatus = 'succeeded';
      })
      .addCase(addToCart.pending, (state) => {
        state.actionStatus = 'pending';
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.actionStatus = 'failed';

        if (action.error.message) {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.shoppingCart = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getCartProducts.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.status = 'failed';

        if (action.error.message) {
          state.error = action.error.message;
        }
      });

    builder
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
      });

    builder
      .addCase(increaseProductCountAsync.fulfilled, (state, { payload: product }) => {
        if (!state.shoppingCart) {
          return;
        }
        const itemIndex = state.shoppingCart.findIndex((el) => el.id === product.id);

        state.shoppingCart[itemIndex] = product;
        state.actionStatus = 'succeeded';
        state.error = null;
      })
      .addCase(increaseProductCountAsync.pending, (state) => {
        state.actionStatus = 'pending';
        state.error = null;
      })
      .addCase(increaseProductCountAsync.rejected, (state, payload) => {
        state.actionStatus = 'failed';
        if (payload.error.message) {
          state.error = payload.error.message;
        }
      });
    builder
      .addCase(decreaseProductCountAsync.fulfilled, (state, { payload: product }) => {
        if (!state.shoppingCart) {
          return;
        }
        const itemIndex = state.shoppingCart.findIndex((el) => el.id === product.id);

        state.shoppingCart[itemIndex] = product;
        state.actionStatus = 'succeeded';
        state.error = null;
      })
      .addCase(decreaseProductCountAsync.pending, (state) => {
        state.actionStatus = 'pending';
        state.error = null;
      })
      .addCase(decreaseProductCountAsync.rejected, (state, action) => {
        state.actionStatus = 'failed';
        if (action.error.message) {
          state.error = action.error.message;
        }
      });
  },
});

export const { actions: cartActions } = cartSlice;
export const { reducer: cartReducer } = cartSlice;
