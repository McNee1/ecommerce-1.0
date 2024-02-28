import { ReactNode } from 'react';

export const DiscountPrice = ({
  discountPrice,
  children,
  discount,
}: {
  discountPrice: string;
  children: ReactNode;
  discount: number;
}) => {
  return (
    <>
      {discount && (
        <div
          className='card-discount'
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <div style={{ fontWeight: '600', fontSize: '19px' }}>{discountPrice}</div>

          {children}
        </div>
      )}
    </>
  );
};
