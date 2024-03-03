import { createSlice } from '@reduxjs/toolkit';

import { fetchProducts } from '../services/fetch-products';
import { ProductSchema } from '../types/product-type';

const initialState: ProductSchema = {
  products: null,
  status: 'idle',
  error: null,
};

export const productsSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    });
    builder.addCase(fetchProducts.rejected, (state, actions) => {
      state.status = 'failed';
      if (actions.payload) {
        state.error = actions.payload;
      }
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.products = payload.products;
      state.status = 'succeeded';
      state.error = null;
    });
  },
});

export const { reducer: productsReducer } = productsSlice;
export const { actions: productsActions } = productsSlice;
