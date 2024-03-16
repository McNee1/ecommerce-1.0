import { StateSchema } from '@/app/providers/store-provider';

export const selectTotalCount = (state: StateSchema) => state.products.total;
