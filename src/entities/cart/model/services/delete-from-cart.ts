import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartData } from '../types/cart-type';

export const deleteFormCart = createAsyncThunk(
  'cart/deleteProduct',
  async (id: string | number) => {
    const response = await axios.delete<CartData>(`http://localhost:3000/cart/${id}`);

    console.log(response);

    return response.data.id;
  }
);
