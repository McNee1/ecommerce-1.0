import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { ProductData } from '../model/types/product-type';

import { PRODUCT_DERAILS } from '@/app/providers/router/lib/path';
import { countDiscountPrice } from '@/shared/lib/discount';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { DiscountBadge } from '@/shared/ui/discount-badge/DiscountBadge';
import { DiscountPrice } from '@/shared/ui/discount-pice/DiscountPrice';
import { LazyImg } from '@/shared/ui/lazy-img/LazyImg';
import { Price } from '@/shared/ui/price/Price';
import { Rating } from '@/shared/ui/rating/Rating';

interface MdCardProps {
  product: ProductData;
  renderAddToCart: (product: ProductData) => ReactNode;
  renderDecreaseCount: (id: number) => ReactNode;
  renderIncreaseCount: (id: number) => ReactNode;
}

export const MdCard = ({
  product,
  renderAddToCart,
  renderDecreaseCount,
  renderIncreaseCount,
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
        <h5 className='card-title mb-1'>
          {product.title} {product.id}
        </h5>
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
            {renderDecreaseCount(product.id)}
            <div className='text-center px-1 w-25'>{product.countInCart}</div>

            {renderIncreaseCount(product.id)}
          </div>
        ) : (
          renderAddToCart(product)
        )}
      </div>
    </div>
  );
};
