import { Link } from 'react-router-dom';
import { CartData } from '../model/types/cart-type';

import { countDiscountPrice } from '@/shared/lib/discount';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { AppButton } from '@/shared/ui/app-button/AppButton';
import { DiscountBadge } from '@/shared/ui/discount-badge/DiscountBadge';
import { DiscountPrice } from '@/shared/ui/discount-pice/DiscountPrice';
import { LazyImg } from '@/shared/ui/lazy-img/LazyImg';
import { Price } from '@/shared/ui/price/Price';

type T = (id: string) => void;

interface SmCardProps {
  onDecreaseCount: T;
  onDeleteProduct: T;
  onIncreaseCount: T;
  product: CartData;
}

export const SmCard = ({
  product,
  onIncreaseCount,
  onDecreaseCount,
  onDeleteProduct,
}: SmCardProps) => {
  const discountPrice = formatCurrency(
    countDiscountPrice(product.price, product.discountPercentage)
  );

  return (
    <div
      className='card w-100 flex-row border-0'
      style={{ height: '130px', maxWidth: '650px' }}
    >
      <Link to={`/product/${product.id}`}>
        <LazyImg
          style={{
            height: '100%',
            objectFit: 'cover',
            width: '150px',
          }}
          alt={product.title}
          src={product.images}
          className='rounded-1'
        />
      </Link>

      <div className='card-body p-1 ps-3 overflow-hidden d-flex flex-column h-100'>
        <h5 className='card-title mb-1 fs-6'>{product.title}</h5>
        <Price
          price={formatCurrency(product.price)}
          discount={product.discountPercentage}
        />
        {!!product.discountPercentage && (
          <p className='m-0 d-flex align-items-center'>
            <DiscountPrice discountPrice={discountPrice} />
            <DiscountBadge
              className='ms-2'
              discount={product.discountPercentage}
            />
          </p>
        )}

        <div className='mt-auto w-100 d-flex'>
          <AppButton
            className='p-0'
            onClick={() => onDeleteProduct(product.id)}
          >
            &#10005;
          </AppButton>

          <div className='btn-group align-items-center bg-warning ms-auto'>
            <AppButton
              className='btn-warning px-2 py-1'
              onClick={() => onDecreaseCount(product.id)}
            >
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
            <div className='text-center px-2 w-100'>{product.count}</div>
            <AppButton
              className='btn-warning px-2 py-1'
              onClick={() => onIncreaseCount(product.id)}
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
