import { StateSchema } from '@/app/providers/store-provider';

export const selectStatusCart = (state: StateSchema) => state.cart.status;
