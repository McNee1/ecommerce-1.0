import { RouterProvider } from 'react-router-dom';

import { useRouter } from './providers/router';

export const Provider = () => {
  const router = useRouter();

  return <RouterProvider router={router} />;
};
