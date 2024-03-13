import { Link } from 'react-router-dom';
import type { ProductData } from '../model/types/product-type';

import { PRODUCT_DERAILS } from '@/app/providers/router/lib/path';
import { countDiscountPrice } from '@/shared/lib/discount';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { AppButton } from '@/shared/ui/app-button/AppButton';
import { DiscountBadge } from '@/shared/ui/discount-badge/DiscountBadge';
import { DiscountPrice } from '@/shared/ui/discount-pice/DiscountPrice';
import { LazyImg } from '@/shared/ui/lazy-img/LazyImg';
import { Price } from '@/shared/ui/price/Price';
import { Rating } from '@/shared/ui/rating/Rating';

interface MdCardProps {
  onAddToCart: (product: ProductData) => void;
  onDecreaseCount: (id: number) => void;
  onIncreaseCount: (id: number) => void;
  product: ProductData;
}

export const MdCard = ({
  product,
  onAddToCart,
  onDecreaseCount,
  onIncreaseCount,
}: MdCardProps) => {
  const discountPrice = formatCurrency(
    countDiscountPrice(product.price, product.discountPercentage)
  );

  return (
    <div className='card bg-light col h-100'>
      <Link to={{ pathname: `${PRODUCT_DERAILS}/${product.id}` }}>
        <LazyImg
          style={{
            aspectRatio: 1 / 1,
            height: '100%',
            objectFit: 'cover',
          }}
          alt={product.title}
          src={product.images}
          className='card-img-top position-relative lazy-img'
        />
      </Link>

      <div className='card-body overflow-hidden p-2 d-flex flex-column'>
        <h5 className='card-title mb-1'>{product.title}</h5>
        <div className='price'>
          <Price
            price={formatCurrency(product.price)}
            discount={product.discountPercentage}
          />
          {product.discountPercentage && (
            <p className='m-0 d-flex align-items-center'>
              <DiscountPrice discountPrice={discountPrice} />

              <DiscountBadge
                className='ms-2'
                discount={product.discountPercentage}
              />
            </p>
          )}
        </div>
        <Rating
          className='mb-1'
          rating={product.rating}
        />

        {product.countInCart ? (
          <div className='btn-group align-items-center bg-warning mt-auto'>
            <AppButton
              className='btn-warning p-1'
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
            <div className='text-center px-1 w-25'>{product.countInCart}</div>
            <AppButton
              className='btn-warning p-1'
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
        ) : (
          <AppButton
            className='btn-success mt-auto p-1'
            onClick={() => onAddToCart(product)}
          >
            click, me
          </AppButton>
        )}
      </div>
    </div>
  );
};
