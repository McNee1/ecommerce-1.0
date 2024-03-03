import type { StateSchema } from '@/app/providers/store-provider/config/state-schema';

export const selectProductsError = (state: StateSchema) => state.products.error;
