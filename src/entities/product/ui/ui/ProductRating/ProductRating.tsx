interface ProductRatingProps {
  rating: number;
  className?: string;
}

export const ProductRating = ({ rating, className }: ProductRatingProps) => {
  return (
    <>
      {rating && (
        <div
          style={{ fontWeight: '500', color: '#726f6f' }}
          className={className}
        >
          Rating: <span style={{ color: 'red' }}>{rating}</span>
        </div>
      )}
    </>
  );
};
