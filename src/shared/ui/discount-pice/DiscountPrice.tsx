export const DiscountPrice = ({ discountPrice }: { discountPrice: string }) => {
  return (
    <>
      {discountPrice && (
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
