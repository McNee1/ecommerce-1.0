interface DiscountBadgeProps {
  discount: number;
  className?: string;
}

export const DiscountBadge = ({ discount, className }: DiscountBadgeProps) => {
  return (
    <>
      {discount && (
        <div className={['badge ms-1', className].join(' ')}>
          <span
            className='px-1 rounded-end rounded-5'
            style={{
              backgroundColor: '#ec0000',
              color: 'white',
              fontSize: '14px',
              padding: '1px 0',
            }}
          >
            -{Math.floor(discount)} %
          </span>
        </div>
      )}
    </>
  );
};
