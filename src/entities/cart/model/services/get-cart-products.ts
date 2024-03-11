import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartData } from '../types/cart-type';

export const getCartProducts = createAsyncThunk<CartData[]>(
  'cart/getCartProducts',
  async () => {
    const response = await axios.get<CartData[]>(`http://localhost:3000/cart`);

    const data = response.data;

    return data;
  }
);
