import { StateSchema } from '@/app/providers/store-provider';

export const selectProductsStatus = (state: StateSchema) => state.products.status;
