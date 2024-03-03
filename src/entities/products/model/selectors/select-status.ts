import type { StateSchema } from '@/app/providers/store-provider/config/state-schema';

export const selectProductsStatus = (state: StateSchema) => state.products.status;
