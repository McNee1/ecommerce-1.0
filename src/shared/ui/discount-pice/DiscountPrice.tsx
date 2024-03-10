export const DiscountPrice = ({
  discount,
  discountPrice,
}: {
  discount: number;
  discountPrice: string;
}) => {
  return (
    <>
      {discount && (
        <span
          className='card-discount'
          style={{ fontSize: '19px', fontWeight: '600' }}
        >
          {discountPrice}
        </span>
      )}
    </>
  );
};
