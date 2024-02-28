import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { PRODUCT_DERAILS } from '@/app/providers/router/lib/path';
import { useImgObserver } from '@/shared/hooks/useImgObserver';
import { countDiscountPrice } from '@/shared/lib/discount';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { Description } from '@/shared/ui/description/Description';
import { DiscountBadge } from '@/shared/ui/discount-badge/DiscountBadge';
import { DiscountPrice } from '@/shared/ui/discount-pice/DiscountPrice';
import { Price } from '@/shared/ui/price/Price';
import { Rating } from '@/shared/ui/rating/Rating';
import { TotalPrice } from '@/widgets/total-price';

import { ProductSchema } from '../model/types/product-type';
import { ProductButton } from './ui/product-button/ProductButton';

interface ProductCardProps {
  product: ProductSchema;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useImgObserver(imgRef.current);

  return (
    <div className='card border-0 h-100'>
      <div className='card bg-light h-100 col'>
        <Link to={{ pathname: `${PRODUCT_DERAILS}/${product.id}` }}>
          <img
            alt={product.title}
            className={['card-img-top', 'position-relative lazy-img'].join(' ')}
            src={'/src/shared/assets/img/img_placeholder.png'}
            data-src={product.images}
            ref={imgRef}
            style={{
              height: '100%',
              aspectRatio: 1 / 1,
            }}
          />
        </Link>

        <div className='card-body overflow-hidden p-2 d-flex flex-column'>
          <h5 className='card-title mb-1'>{product.title}</h5>
          <div className='price'>
            <Price
              discount={product.discountPercentage}
              price={formatCurrency(product.price)}
            />
            <DiscountPrice
              discount={product.discountPercentage}
              discountPrice={formatCurrency(
                countDiscountPrice(product.price, product.discountPercentage)
              )}
            >
              <DiscountBadge discount={product.discountPercentage} />
            </DiscountPrice>
          </div>
          <Rating
            className='mb-1'
            rating={product.rating}
          />
          <Description
            className='mb-2'
            short
            description={product.description}
          />

          <ProductButton
            isButton
            product={product}
            // {...rest}
          />
        </div>
      </div>
    </div>
  );
};
