import type { StateSchema } from '@/app/providers/store-provider/config/state-schema';

export const selectProducts = (state: StateSchema) => state.products.products;
