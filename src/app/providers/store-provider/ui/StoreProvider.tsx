import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { setupStore } from '../config/store';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={setupStore}>{children}</Provider>;
};
