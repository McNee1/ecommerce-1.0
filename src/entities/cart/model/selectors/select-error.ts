import { StateSchema } from '@/app/providers/store-provider';

export const selectErrorCart = (state: StateSchema) => state.cart.error;
