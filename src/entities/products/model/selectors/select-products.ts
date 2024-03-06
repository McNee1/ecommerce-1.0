import { StateSchema } from '@/app/providers/store-provider';

export const selectProducts = (state: StateSchema) => state.products.products;
