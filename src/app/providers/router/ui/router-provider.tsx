import { createBrowserRouter } from 'react-router-dom';

import { CartPage } from '@/pages/cart';
import { MainPage } from '@/pages/main';
import { ProductDetailsPage } from '@/pages/product';
import { Root } from '@/widgets/layout/ui/Root';

import { PathRoute } from '../lib/path';

export const useRouter = () => {
  const router = createBrowserRouter([
    {
      element: <Root />,

      children: [
        { path: PathRoute.MAIN, element: <MainPage /> },
        { path: PathRoute.CART, element: <CartPage /> },
        { path: PathRoute.PRODUCT, element: <ProductDetailsPage /> },
      ],
    },
  ]);

  return router;
};
