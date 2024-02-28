import { countDiscountPrice } from '@/shared/lib/discount';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { DiscountBadge } from '@/shared/ui/discount-badge/DiscountBadge';
import { Price } from '@/shared/ui/price/Price';

interface TotalPriceProps {
  price: number;
  discount: number;
  className?: string;
}

export const TotalPrice = ({ discount, price, className }: TotalPriceProps) => {
  const formattedPrice = formatCurrency(countDiscountPrice(price, discount));

  return (
    <>
      <div className={['price', className].join(' ')}>
        <Price
          discount={discount}
          price={formatCurrency(price)}
        />

        {discount && (
          <div
            className='card-discount'
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <div style={{ fontWeight: '600', fontSize: '19px' }}>{formattedPrice}</div>
            <DiscountBadge discount={discount} />
          </div>
        )}
      </div>
    </>
  );
};
