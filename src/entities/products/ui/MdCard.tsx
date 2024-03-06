import { Link } from 'react-router-dom';
import type { ProductData } from '../model/types/product-type';
import { ProductButton } from './ui/product-button/ProductButton';

import { useAppDispatch } from '@/app/hook/hooks';
import { PRODUCT_DERAILS } from '@/app/providers/router/lib/path';
import { cartActions } from '@/entities/cart';
import { countDiscountPrice } from '@/shared/lib/discount';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { AppButton } from '@/shared/ui/app-button/AppButton';
import { DiscountBadge } from '@/shared/ui/discount-badge/DiscountBadge';
import { DiscountPrice } from '@/shared/ui/discount-pice/DiscountPrice';
import { LazyImg } from '@/shared/ui/lazy-img/LazyImg';
import { Price } from '@/shared/ui/price/Price';
import { Rating } from '@/shared/ui/rating/Rating';

interface MdCardProps {
  product: ProductData;
}

export const MdCard = ({ product }: MdCardProps) => {
  const discountPrice = formatCurrency(
    countDiscountPrice(product.price, product.discountPercentage)
  );

  const dispatch = useAppDispatch();

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
          <DiscountPrice
            discountPrice={discountPrice}
            discount={product.discountPercentage}
          >
            <DiscountBadge discount={product.discountPercentage} />
          </DiscountPrice>
        </div>
        <Rating
          className='mb-1'
          rating={product.rating}
        />
        <AppButton
          className='success mt-auto'
          onClick={() => dispatch(cartActions.addToCart(product))}
        >
          click, me
        </AppButton>

        {/* <ProductButton
          product={product}
          isButton
          // {...rest}
        /> */}
      </div>
    </div>
  );
};
