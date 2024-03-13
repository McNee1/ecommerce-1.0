import { PaymentSchema } from '../../../model/types/cart-types';

import { formatCurrency } from '@/shared/lib/formatCurrency';

interface PaymentProps {
  paymentPrice: PaymentSchema;
}

export const Payment = ({ paymentPrice }: PaymentProps) => {
  return (
    <div className='price-cart mx-auto mx-md-0 mb-3 ms-md-auto position-sticky top-0'>
      <div className='p-2 bg-white rounded border border-warning position-sticky top-0'>
        <div className='count-products d-flex border-bottom border-dark mb-2 pb-1'>
          <span>All {paymentPrice.productsCount} product</span>
          <span className='ms-auto'>{formatCurrency(paymentPrice.totalPrice)}</span>
        </div>
        <div className='total-discount d-flex'>
          <span>Discount amount:</span>
          <span className='ms-auto text-danger'>
            {formatCurrency(paymentPrice.discountAmount)}
          </span>
        </div>

        <div className='total-price d-flex fs-5 fw-semibold'>
          <span>Total</span>
          <span className='ms-auto'>{formatCurrency(paymentPrice.discountPrice)}</span>
        </div>
      </div>
    </div>
  );
};
