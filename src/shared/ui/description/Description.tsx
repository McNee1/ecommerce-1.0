import { useEffect, useRef } from 'react';

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
    str = description?.length > 47 ? description.slice(0, 48) + '...' : description;
  } else {
    str = description;
  }

  return (
    <>
      <p
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
        className={['card-text m-0', className].join(' ')}
      >
        <span className='text'>Description: </span>
        {str}
      </p>
    </>
  );
};
