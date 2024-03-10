import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartData } from '../types/cart-type';

import { StateSchema } from '@/app/providers/store-provider';
import { ProductData } from '@/entities/products';

export const increaseProductsCount = createAsyncThunk<CartData, ProductData | CartData>(
  'increaseProductsCount',
  async (product, { getState, rejectWithValue }) => {
    const state = getState() as StateSchema;

    const { shoppingCart } = state.cart;

    const foundProductById = shoppingCart?.find((el) => el.id === String(product.id));

    if (foundProductById) {
      const updatedProduct = {
        ...foundProductById,
        id: foundProductById?.id,
        count: foundProductById.count + 1,
      } as CartData;

      const response = await axios.put<CartData>(
        `http://localhost:3000/cart/${foundProductById.id}`,
        updatedProduct
      );

      return response.data;
    } else {
      return rejectWithValue('product with id no found');
    }
  }
);
