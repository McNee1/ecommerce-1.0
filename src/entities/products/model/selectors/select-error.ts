import { StateSchema } from '@/app/providers/store-provider';

export const selectProductsError = (state: StateSchema) => state.products.error;
