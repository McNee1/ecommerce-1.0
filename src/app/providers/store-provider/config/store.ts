import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './state-schema';

import { productsReducer } from '@/entities/products/model/slice/products-slice';
import { counterReducer } from '@/pages/cart-page/counter';

const rootReducer = combineReducers<StateSchema>({
  counter: counterReducer,
  products: productsReducer,
});

export const setupStore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof setupStore.dispatch;
