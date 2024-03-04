import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { isAxiosError } from 'axios';
import { ProductApiResponse } from '../types/product-type';

export const fetchProducts = createAsyncThunk<
  ProductApiResponse,
  number,
  { rejectValue: null | string }
>('products/fetchProducts', async (limit: number, thunkAPI) => {
  try {
    const response = axios.get<ProductApiResponse>(
      `https://dummyjson.com/products?limit=${limit ?? 10}`
    );

    return (await response).data;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      return thunkAPI.rejectWithValue('Error occurred while making API call');
    }
  }
});
