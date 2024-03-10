import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hook/hooks';
import { getCartProducts } from '@/entities/cart/model/services/getCartProducts';
import {
  selectErrorCart,
  selectShoppingCart,
  selectStatusCart,
} from '@/entities/cart/model/slice/cart-slice';
import { SmCard } from '@/entities/cart/ui/SmCard';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';
import { Loader } from '@/shared/ui/loader/Loader';

export const CartPage = () => {
  const shoppingCart = useAppSelector(selectShoppingCart);
  const status = useAppSelector(selectStatusCart);
  const error = useAppSelector(selectErrorCart);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getCartProducts());
  }, [dispatch]);

  return (
    <>
      {status === 'pending' ? (
        <Loader />
      ) : error && status === 'failed' ? (
        error
      ) : (
        <div className='cart mt-1'>
          <h3 className='mb-3'>Shopping basket</h3>
          {/* <div className='d-flex flex-column-reverse flex-md-row w-100'> */}
          <div className='row'>
            {shoppingCart?.length ? (
              <>
                <div className='col-12 col-md-8 col-lg-9'>
                  <div className='cart-list'>
                    {shoppingCart?.map((product, id) => (
                      <div
                        key={product.id}
                        className='d-flex flex-row mb-2'
                      >
                        <Checkbox id={id} />
                        <SmCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='col col-md-4 col-lg-3'>
                  <div className='price-cart mx-auto mx-md-0 mb-3 ms-md-auto position-sticky top-0'>
                    <div className='p-2 bg-white rounded border border-warning position-sticky top-0'>
                      <div className='count-products d-flex border-bottom border-dark mb-2 pb-1'>
                        <span>All 10 product</span>
                        <span className='ms-auto'>{formatCurrency(200)}</span>
                      </div>
                      <div className='total-discount d-flex'>
                        <span>Discount amount:</span>
                        <span className='ms-auto text-danger'>
                          {'10%' ? '-' : ''}
                          {formatCurrency(5)}
                        </span>
                      </div>

                      <div className='total-price d-flex fs-4 fw-semibold'>
                        <span>Total</span>
                        <span className='ms-auto'>{formatCurrency(10)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className='text-center fs-5'>List is empty</div>
            )}
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};
