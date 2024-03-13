import { useCart } from '../model/hooks/use-cart';
import { CardList } from './card-list/ui/CardList';
import { Payment } from './payment/ui/Payment';

import { useAppSelector } from '@/app/hook/hooks';
import { selectErrorCart, selectShoppingCart, selectStatusCart } from '@/entities/cart';
import { Loader } from '@/shared/ui/loader/Loader';

export const CartPage = () => {
  const shoppingCart = useAppSelector(selectShoppingCart);
  const status = useAppSelector(selectStatusCart);
  const error = useAppSelector(selectErrorCart);

  const {
    paymentPrice,
    handleDecreaseCount,
    handleDeleteProduct,
    handleIncreaseCount,
    handlePrice,
  } = useCart(shoppingCart);
  return (
    <>
      {status === 'pending' ? (
        <Loader />
      ) : error && status === 'failed' ? (
        error
      ) : (
        <div
          className='cart mt-1 m-auto'
          style={{ maxWidth: '1200px' }}
        >
          <h3 className='mb-3'>Shopping basket</h3>
          {/* <div className='d-flex flex-column-reverse flex-md-row w-100'> */}
          <div className='row'>
            {shoppingCart?.length ? (
              <>
                <div className='col-12 col-md-8 col-lg-9'>
                  <CardList
                    onChecked={handlePrice}
                    shoppingCart={shoppingCart}
                    onDecreaseCount={handleDecreaseCount}
                    onDeleteProduct={handleDeleteProduct}
                    onIncreaseCount={handleIncreaseCount}
                  />
                </div>
                <div className='col col-md-4 col-lg-3'>
                  <Payment paymentPrice={paymentPrice} />
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
