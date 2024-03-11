import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartData } from '../types/cart-type';

import { StateSchema } from '@/app/providers/store-provider';

export const decreaseProductCountAsync = createAsyncThunk<CartData, string | number>(
  'cart/decreaseProductCount',
  async (productId, { getState, rejectWithValue }) => {
    const state = getState() as StateSchema;

    const { shoppingCart } = state.cart;

    const foundProductById = shoppingCart?.find((el) => el.id === String(productId));

    if (foundProductById) {
      const updatedProduct = {
        ...foundProductById,
        id: foundProductById?.id,
        count: foundProductById.count - 1,
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
