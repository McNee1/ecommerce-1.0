import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { productsReducer } from '@/entities/products/model/slice/products-slice';
import { counterReducer } from '@/pages/cart-page/counter';

import { StateSchema } from './state-schema';

const rootReducer = combineReducers<StateSchema>({
  counter: counterReducer,
  products: productsReducer,
});

export const setupStore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof setupStore.dispatch;
