import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/fetch-products';
import { ProductSchema } from '../types/product-type';

const initialState: ProductSchema = {
  error: null,
  products: null,
  status: 'idle',
};

export const productsSlice = createSlice({
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
  initialState,
  name: 'productSlice',
  reducers: {},
});

export const { reducer: productsReducer } = productsSlice;
export const { actions: productsActions } = productsSlice;
