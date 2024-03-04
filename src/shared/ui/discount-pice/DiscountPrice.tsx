import { ReactNode } from 'react';

export const DiscountPrice = ({
  children,
  discount,
  discountPrice,
}: {
  children: ReactNode;
  discount: number;
  discountPrice: string;
}) => {
  return (
    <>
      {discount && (
        <div
          className='card-discount'
          style={{ alignItems: 'center', display: 'inline-flex' }}
        >
          <div style={{ fontSize: '19px', fontWeight: '600' }}>{discountPrice}</div>

          {children}
        </div>
      )}
    </>
  );
};
