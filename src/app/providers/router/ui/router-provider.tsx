import { createBrowserRouter } from 'react-router-dom';
import { PathRoute } from '../lib/path';

import { CartPage } from '@/pages/cart-page';
import { MainPage } from '@/pages/main-page';
import { ProductDetailsPage } from '@/pages/product-page';
import { Root } from '@/widgets/layout/ui/Root';

export const useRouter = () => {
  const router = createBrowserRouter([
    {
      children: [
        { element: <MainPage />, path: PathRoute.MAIN },
        { element: <CartPage />, path: PathRoute.CART },
        { element: <ProductDetailsPage />, path: PathRoute.PRODUCT },
      ],

      element: <Root />,
    },
  ]);

  return router;
};
