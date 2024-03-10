interface PriceProps {
  discount: number;
  price: string;
}

export const Price = ({ discount, price }: PriceProps) => {
  return (
    <p className='d-flex align-items-center m-0'>
      <span style={{ color: '#726f6f', fontWeight: '500' }}>Price:</span>

      <span
        className={[
          'card-price ms-2',
          discount ? 'card-price_del' : 'card-price_def',
        ].join(' ')}
      >
        {price}
      </span>
    </p>
  );
};
