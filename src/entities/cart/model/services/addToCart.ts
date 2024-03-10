import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartData } from '../types/cart-type';

import { ProductData } from '@/entities/products';

export const addToCart = createAsyncThunk<CartData, ProductData>(
  'cart/addToCart',
  async (product) => {
    const updatedProduct = {
      ...product,
      id: String(product.id),
      count: 1,
    } as CartData;

    const response = await axios.post<CartData>(
      `http://localhost:3000/cart`,
      updatedProduct
    );
    return response.data;
  }
);
