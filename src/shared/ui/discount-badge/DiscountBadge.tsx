interface DiscountBadgeProps {
  className?: string;
  discount: number;
}

export const DiscountBadge = ({ className, discount }: DiscountBadgeProps) => {
  return (
    <>
      {discount && (
        <span
          style={{
            backgroundColor: '#ec0000',
            color: 'white',
            fontSize: '14px',
            padding: '4px',
          }}
          className={['badge rounded-end rounded-5 ms-1', className].join(' ')}
        >
          -{Math.floor(discount)} %
        </span>
      )}
    </>
  );
};
