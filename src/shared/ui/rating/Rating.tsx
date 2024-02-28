interface RatingProps {
  rating: number;
  className?: string;
}

export const Rating = ({ rating, className }: RatingProps) => {
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
