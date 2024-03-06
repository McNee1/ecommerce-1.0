import { ProductData } from '@/entities/products';
import { countDiscountPrice } from '@/shared/lib/discount';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { Description } from '@/shared/ui/description/Description';
import { DiscountBadge } from '@/shared/ui/discount-badge/DiscountBadge';
import { DiscountPrice } from '@/shared/ui/discount-pice/DiscountPrice';
import { LazyImg } from '@/shared/ui/lazy-img/LazyImg';
import { Price } from '@/shared/ui/price/Price';
import { Rating } from '@/shared/ui/rating/Rating';

interface LgCardProps {
  activeClass: number;
  product: ProductData;
}

export const LgCard = ({ activeClass, product }: LgCardProps) => {
  return (
    <div>
      <div className='card border-0'>
        <div className='row'>
          <div className='col-md-4 col-lg-4'>
            <LazyImg
              alt={product.title}
              className='w-100 h-100'
              src={product.images[activeClass]}
            />
          </div>
          <div className='col-md-8 col-lg-8 flex-grow-0'>
            <div className='card-body pt-1 p-0 pt-md-0'>
              <h5 className='card-title mb-1'>{product.title}</h5>
              <div className='price'>
                <Price
                  price={formatCurrency(product.price)}
                  discount={product.discountPercentage}
                />

                <DiscountPrice
                  discountPrice={formatCurrency(
                    countDiscountPrice(product.price, product.discountPercentage)
                  )}
                  discount={product.discountPercentage}
                >
                  <DiscountBadge discount={product.discountPercentage} />
                </DiscountPrice>
              </div>

              <Rating
                className='mb-2'
                rating={product.rating}
              />
              <p className='mb-2'>
                <span className='text'>Brand: </span>
                {product.brand}
              </p>
              <p className='category mb-2'>
                <span className='text'>Category: </span>
                {product.category}
              </p>

              <Description description={product.description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
