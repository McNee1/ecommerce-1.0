interface CardDescriptionProps {
  isDescription: boolean;
  description: string;
}

export const CardDescription = ({ isDescription, description }: CardDescriptionProps) => {
  return (
    <>
      {isDescription && (
        <p className='card-text'>
          {description.length > 45 ? description.slice(0, 46) + '...' : description}
        </p>
      )}
    </>
  );
};
