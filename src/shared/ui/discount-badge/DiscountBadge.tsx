interface DiscountBadgeProps {
  className?: string;
  discount: number;
}

export const DiscountBadge = ({ className, discount }: DiscountBadgeProps) => {
  return (
    <>
      {discount && (
        <div className={['badge ms-1', className].join(' ')}>
          <span
            style={{
              backgroundColor: '#ec0000',
              color: 'white',
              fontSize: '14px',
              padding: '1px 0',
            }}
            className='px-1 rounded-end rounded-5'
          >
            -{Math.floor(discount)} %
          </span>
        </div>
      )}
    </>
  );
};
