import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { isAxiosError } from 'axios';
import { ProductApiResponse, ProductData } from '../types/product-type';

import { getCartProducts } from '@/entities/cart/model/services/getCartProducts';
import { CartData } from '@/entities/cart/model/types/cart-type';

export const getProducts = createAsyncThunk<
  ProductData[],
  number,
  { rejectValue: null | string }
>('products/getProducts', async (limit: number, thunkApi) => {
  try {
    const response = await axios.get<ProductApiResponse>(
      `https://dummyjson.com/products?limit=${limit ?? 10}`
    );

    const cartProducts = (await thunkApi.dispatch(getCartProducts()))
      .payload as CartData[];

    const updatedProductsByCartCount: ProductData[] = response.data.products.map(
      (product) => {
        const founded = cartProducts.find(({ id }) => String(product.id) === id);

        return founded
          ? ({ ...product, countInCart: founded.count } as ProductData)
          : product;
      }
    );

    return updatedProductsByCartCount;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.message);
    } else {
      return thunkApi.rejectWithValue('Error occurred while making API call');
    }
  }
});
