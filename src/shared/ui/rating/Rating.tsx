interface RatingProps {
  className?: string;
  rating: number;
}

export const Rating = ({ className, rating }: RatingProps) => {
  return (
    <>
      {rating && (
        <p className={['m-0 text', className].join(' ')}>
          Rating: <span style={{ color: 'red' }}>{rating}</span>
        </p>
      )}
    </>
  );
};
