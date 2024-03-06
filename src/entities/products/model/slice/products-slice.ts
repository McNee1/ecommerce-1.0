import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/fetch-products';
import { ProductSchema } from '../types/product-type';

const initialState = {
  error: null,
  products: null,
  status: 'idle',
} satisfies ProductSchema as ProductSchema;

export const productsSlice = createSlice({
  initialState,
  name: 'products',
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

export const { actions: productsActions } = productsSlice;
export const { reducer: productsReducer } = productsSlice;
