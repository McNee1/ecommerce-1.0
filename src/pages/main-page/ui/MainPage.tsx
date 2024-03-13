import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hook/hooks';
import { decreaseProductCountAsync, increaseProductCountAsync } from '@/entities/cart';
import { addToCart } from '@/entities/cart/model/services/add-to-cart';
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
    if (!products) {
      void dispatch(getProducts(10));
    }
  }, [dispatch, products]);

  const handleAddToCart = (product: ProductData) => {
    void dispatch(addToCart(product));
    dispatch(productsActions.addProductCount(product.id));
  };

  const handleIncreaseCount = (id: number) => {
    void dispatch(increaseProductCountAsync(id));
    dispatch(productsActions.increaseProductCount(id));
  };
  const handleDecreaseCount = (id: number) => {
    void dispatch(decreaseProductCountAsync(id));
    dispatch(productsActions.decreaseProductCount(id));
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
