interface PriceProps {
  price: string;
  discount: number;
}

export const Price = ({ price, discount }: PriceProps) => {
  return (
    <div className='d-flex align-items-center'>
      <span style={{ fontWeight: '500', color: '#726f6f' }}>Price:</span>

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
