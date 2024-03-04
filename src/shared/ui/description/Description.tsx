interface DescriptionProps {
  className?: string;
  description: string;
  short?: boolean;
}

export const Description = ({
  className,
  description,
  short = false,
}: DescriptionProps) => {
  let str;
  if (short) {
    str = description?.length > 45 ? description.slice(0, 46) + '...' : description;
  } else {
    str = description;
  }
  return (
    <>
      {short || <span className='text'>Description:</span>}
      <p className={['card-text', className].join(' ')}>{str}</p>
    </>
  );
};
