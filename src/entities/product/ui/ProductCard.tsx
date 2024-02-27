import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { PRODUCT_DERAILS } from '@/app/providers/router/lib/path';
import { useImgObserver } from '@/shared/hooks/useImgObserver';
import { countDiscountPrice } from '@/shared/lib/discount';
import { formatCurrency } from '@/shared/lib/formatCurrency';

import { ProductSchema } from '../model/types/product-type';
import { ProductButton } from './ui/ProductButton/ProductButton';
import { ProductDescription } from './ui/ProductDescription/ProductDescription';
import { ProductRating } from './ui/ProductRating/ProductRating';

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
          <div className='card-title mb-1'>
            <div
              className={[
                'card-price',
                product.discountPercentage ? 'card-price_del' : 'card-price_def',
              ].join(' ')}
            >
              {formatCurrency(product.price)}
            </div>
            {(product.discountPercentage || !product.discountPercentage === 0) && (
              <div
                className='card-discount'
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <div style={{ fontWeight: '600', fontSize: '19px' }}>
                  {formatCurrency(
                    countDiscountPrice(product.price, product.discountPercentage)
                  )}
                </div>
                <div>
                  <span
                    className='ms-2 ps-1 pe-1 rounded-end rounded-5 fs-6'
                    style={{
                      backgroundColor: '#ec0000',
                      color: 'white',
                      padding: '1px 0',
                    }}
                  >
                    -{Math.floor(product.discountPercentage)} %
                  </span>
                </div>
              </div>
            )}
            <div className='card-name'>
              <p
                className='m-0'
                style={{ fontWeight: '500', color: '#726f6f' }}
              >
                {product.title}
              </p>
            </div>
          </div>
          <ProductRating
            className='mb-1'
            rating={product.rating}
          />
          <ProductDescription
            className='mb-2'
            isDescription={true}
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
