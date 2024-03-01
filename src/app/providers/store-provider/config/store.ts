import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { counterReducer } from '@/pages/cart-page/counter';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export const setupStore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof setupStore.dispatch;
