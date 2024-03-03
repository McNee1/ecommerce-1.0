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
  product: ProductData;
  activeClass: number;
}

export const LgCard = ({ product, activeClass }: LgCardProps) => {
  return (
    <div>
      <div className='card border-0'>
        <div className='row gx-2'>
          <div className='col-md-4 col-lg-5'>
            <LazyImg
              alt={product.title}
              src={product.images[activeClass]}
              style={{
                maxWidth: '300px',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                aspectRatio: '1/1',
              }}
              className='img-fluid rounded'
            />
          </div>
          <div className='col-md-8 col-lg-7'>
            <div className='card-body pt-1 p-0 pt-md-0'>
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
                rating={product.rating}
                className='mb-2'
              />
              <div className='mb-2'>
                <span className='text'>Brand: </span>
                {product.brand}
              </div>
              <div className='category mb-2'>
                <span className='text'>Category: </span>
                {product.category}
              </div>

              <Description description={product.description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
