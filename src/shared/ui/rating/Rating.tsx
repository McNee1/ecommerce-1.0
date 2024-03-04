interface RatingProps {
  className?: string;
  rating: number;
}

export const Rating = ({ className, rating }: RatingProps) => {
  return (
    <>
      {rating && (
        <div className={['text', className].join(' ')}>
          Rating: <span style={{ color: 'red' }}>{rating}</span>
        </div>
      )}
    </>
  );
};
