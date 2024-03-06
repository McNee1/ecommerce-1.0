import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './state-schema';

import { cartReducer } from '@/entities/cart';
import { productsReducer } from '@/entities/products';

export const setupStore = configureStore<StateSchema>({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof setupStore.getState>;

export type AppDispatch = typeof setupStore.dispatch;

export default setupStore;
