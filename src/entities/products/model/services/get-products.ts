import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { isAxiosError } from 'axios';
import { ProductApiResponse, ProductData } from '../types/product-type';

import { getCartProducts } from '@/entities/cart/model/services/get-cart-products';
import { CartData } from '@/entities/cart/model/types/cart-type';

interface TOptions {
  category?: string;
  limit: number;
  skip: number;
}

export const getProducts = createAsyncThunk<
  {
    products: ProductData[];
    total: number;
    category: string;
  },
  TOptions,
  { rejectValue: null | string }
>('products/getProducts', async (options, thunkApi) => {
  try {
    const response = await axios.get<ProductApiResponse>(
      `https://dummyjson.com/products${options.category ? '/category/' + options.category : ''}?limit=${options.limit}&skip=${options.skip}`
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

    return {
      products: updatedProductsByCartCount,
      total: response.data.total,
      category: options.category,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.message);
    } else {
      return thunkApi.rejectWithValue('Error occurred while making API call');
    }
  }
});
