import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hook/hooks';
import {
  fetchProducts,
  MdCard,
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
    void dispatch(fetchProducts(10));
  }, [dispatch]);

  if (status === 'pending') {
    return <Loader />;
  }
  if (error) {
    return error;
  }

  return (
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
                <MdCard product={product} />
              </div>
            ))
          ) : (
            <div className='text-center fs-5'>List is empty</div>
          )}
        </>
      </div>
    </>
  );
};
