interface PriceProps {
  discount: number;
  price: string;
}

export const Price = ({ discount, price }: PriceProps) => {
  return (
    <div className='d-flex align-items-center'>
      <span style={{ color: '#726f6f', fontWeight: '500' }}>Price:</span>

      <div
        className={[
          'card-price ms-2',
          discount ? 'card-price_del' : 'card-price_def',
        ].join(' ')}
      >
        {price}
      </div>
    </div>
  );
};
