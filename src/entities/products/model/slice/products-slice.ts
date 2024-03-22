import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '../services/get-products';
import { ProductSchema } from '../types/product-type';

const initialState = {
  error: null,
  products: null,
  status: 'idle',
  total: null,
  initCategory: false,
  currentCategory: '',
} satisfies ProductSchema as ProductSchema;

export const productsSlice = createSlice({
  initialState,
  name: 'products',
  reducers: {
    increaseProductCount: (state, { payload: id }: PayloadAction<string | number>) => {
      if (state.products) {
        state.products = state.products?.map((product) =>
          product.id === Number(id)
            ? { ...product, countInCart: product.countInCart! + 1 }
            : { ...product }
        );
      }
    },
    deleteProductCount: (state, { payload: id }: PayloadAction<string>) => {
      if (state.products) {
        state.products = state.products?.map((product) =>
          product.id === Number(id) ? { ...product, countInCart: 0 } : { ...product }
        );
      }
    },
    decreaseProductCount: (state, { payload: id }: PayloadAction<string | number>) => {
      if (state.products) {
        state.products = state.products?.map((product) =>
          product.id === Number(id)
            ? { ...product, countInCart: product.countInCart! - 1 }
            : { ...product }
        );
      }
    },
    addProductCount: (state, action: PayloadAction<number>) => {
      if (state.products) {
        state.products = state.products?.map((product) =>
          product.id === action.payload ? { ...product, countInCart: 1 } : { ...product }
        );
      }
    },
    resetProducts: (state) => {
      console.log('reset');
      state.products = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getProducts.rejected, (state, actions) => {
      state.status = 'failed';
      if (actions.payload) {
        state.error = actions.payload;
      }
    });
    builder.addCase(getProducts.fulfilled, (state, { payload: productData }) => {
      if (!state.products || state.products.length === 0) {
        state.products = productData.products;
      } else {
        state.products = [...state.products, ...productData.products];
      }

      state.total = productData.total;
      state.status = 'succeeded';
      state.error = null;
    });
  },
});

export const { actions: productsActions } = productsSlice;
export const { reducer: productsReducer } = productsSlice;
