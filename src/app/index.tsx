import { RouterProvider } from 'react-router-dom';
import { useRouter } from './providers/router';
import { StoreProvider } from './providers/store-provider';

export const Provider = () => {
  const router = useRouter();

  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
};
