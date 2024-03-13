import { StateSchema } from '@/app/providers/store-provider';

export const selectActionStatus = (state: StateSchema) => state.cart.actionStatus;
