interface ProductDescriptionProps {
  isDescription: boolean;
  description: string;
  className: string;
}

export const ProductDescription = ({
  isDescription,
  description,
  className,
}: ProductDescriptionProps) => {
  return (
    <>
      {isDescription && (
        <p className={['card-text', className].join(' ')}>
          {description.length > 45 ? description.slice(0, 46) + '...' : description}
        </p>
      )}
    </>
  );
};
