import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hook/hooks';
import { addToCart } from '@/entities/cart/model/services/addToCart';
import { increaseProductsCount } from '@/entities/cart/model/services/increaseProductsCount';
import {
  getProducts,
  MdCard,
  ProductData,
  productsActions,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
} from '@/entities/products';
import { Loader } from '@/shared/ui/loader/Loader';

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    if (!products?.length) {
      void dispatch(getProducts(10));
    }
  }, [dispatch, products]);

  const handleAddToCart = (product: ProductData) => {
    void dispatch(addToCart(product));
    dispatch(productsActions.addProductCount(product.id));
  };

  const handleIncreaseCount = (product: ProductData) => {
    void dispatch(increaseProductsCount(product));
    dispatch(productsActions.increaseProductCount(product.id));
  };
  const handleDecreaseCount = (product: ProductData) => {
    void dispatch(increaseProductsCount(product));
  };

  return (
    <>
      {status === 'pending' ? (
        <Loader />
      ) : error && status === 'failed' ? (
        error
      ) : (
        <>
          <div className='my-2'>
            <h1>Shop</h1>
          </div>

          <div className='row gx-2 gy-3'>
            <>
              {products ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'
                  >
                    <MdCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onDecreaseCount={handleDecreaseCount}
                      onIncreaseCount={handleIncreaseCount}
                    />
                  </div>
                ))
              ) : (
                <div className='text-center fs-5'>List is empty</div>
              )}
            </>
          </div>
        </>
      )}
    </>
  );
};
