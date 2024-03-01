import { Dispatch, SetStateAction } from 'react';

import { LazyImg } from '@/shared/ui/lazy-img/LazyImg';

interface ImageBarProps {
  images: string[];
  title: string;
  activeClass: number;
  onActivateImg: Dispatch<SetStateAction<number>>;
}
export const ImageBar = ({
  images,
  title,
  activeClass,
  onActivateImg,
}: ImageBarProps) => {
  return (
    images && (
      <div className='d-flex flex-column me-3'>
        {images.map((img, id) => (
          <LazyImg
            src={img}
            alt={title}
            role='presentation'
            className={[
              'mb-2 p-1 rounded lazy',
              id == activeClass && 'border border-warning',
            ].join(' ')}
            onClick={() => onActivateImg(id)}
            key={img}
            style={{
              width: '70px',
              height: '70px',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    )
  );
};
