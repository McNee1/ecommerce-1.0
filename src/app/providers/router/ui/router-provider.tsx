import { createBrowserRouter } from 'react-router-dom';

import { CartPage } from '@/pages/cart-page';
import { MainPage } from '@/pages/main-page';
import { ProductDetailsPage } from '@/pages/product-page';
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
