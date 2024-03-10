import { Link } from 'react-router-dom';
import { deleteFormCart } from '../model/services/deleteFromCart';
import { increaseProductsCount } from '../model/services/increaseProductsCount';
import { CartData } from '../model/types/cart-type';

import { useAppDispatch } from '@/app/hook/hooks';
import { productsActions } from '@/entities/products';
import { countDiscountPrice } from '@/shared/lib/discount';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { AppButton } from '@/shared/ui/app-button/AppButton';
import { DiscountBadge } from '@/shared/ui/discount-badge/DiscountBadge';
import { DiscountPrice } from '@/shared/ui/discount-pice/DiscountPrice';
import { Price } from '@/shared/ui/price/Price';

interface SmCardProps {
  product: CartData;
}

export const SmCard = ({ product }: SmCardProps) => {
  const discountPrice = countDiscountPrice(product.price, product.discountPercentage);
  const formattedCurrency = formatCurrency(discountPrice);

  const dispatch = useAppDispatch();

  return (
    <div
      style={{ height: '130px' }}
      className='card w-100 flex-row border-0'
    >
      <Link to={`/product/${product.id}`}>
        <img
          style={{
            height: '100%',
            objectFit: 'cover',
            width: '150px',
          }}
          className=''
          alt={product.title}
          src={product.images}
          // src={'src/assets/img_placeholder.png'}
          // data-src={product.thumbnail}
          // ref={ref}
          // style={imgOpt?.size}
        />
      </Link>
      {/* {isDelete && (
  <AppButton
    onClick={() => onDelete(product.id)}
    myClass={
      'warning position-absolute top-0 end-0 btn btn-sm text-white rounded-circle d-flex justify-content-center align-items-center'
    }
    styles={{
      height: '1.5rem',
      width: '1.5rem',
      transform: 'translate(20%, -30%)',
      fontSize: '0.7rem',
    }}
  >
    X
  </AppButton>
)} */}
      <div className='card-body p-1 ps-3 overflow-hidden d-flex flex-column h-100'>
        <h5 className='card-title mb-1 fs-6'>{product.title}</h5>
        <Price
          price={formattedCurrency}
          discount={product.discountPercentage}
        />
        <p className='m-0 d-flex align-items-center'>
          <DiscountPrice
            discountPrice={formattedCurrency}
            discount={product.discountPercentage}
          />
          <DiscountBadge
            className='ms-2'
            discount={product.discountPercentage}
          />
        </p>

        <div className='mt-auto w-100 d-flex'>
          <AppButton
            onClick={() => {
              void dispatch(deleteFormCart(product.id));
              dispatch(productsActions.deleteProductCount(+product.id));
            }}
            className='p-0'
            // disabled={addingStatus === 'loading'}
          >
            &#10005;
          </AppButton>

          <div className='btn-group align-items-center bg-warning ms-auto'>
            <AppButton className='btn-warning p-1'>
              <svg
                width='16'
                height='16'
                fill='currentColor'
                viewBox='0 0 16 16'
                className='bi bi-dash-lg'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z'
                />
              </svg>
            </AppButton>
            <div className='text-center px-1 w-25'>{product.count}</div>
            <AppButton
              onClick={() => {
                void dispatch(increaseProductsCount(product));
                dispatch(productsActions.increaseProductCount(+product.id));
              }}
              className='btn-warning p-1'
            >
              <svg
                width='15'
                height='16'
                fill='currentColor'
                viewBox='0 0 16 16'
                className='bi bi-plus-lg'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z'
                />
              </svg>
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
};
