import { ReactNode } from 'react';

interface ImageBarProps {
  images: string[];
  className?: string;
  renderImg: (img: string, id: number) => ReactNode;
}
export const ImageBar = ({ images, className, renderImg }: ImageBarProps) => {
  return (
    images && (
      <div className={['d-flex flex-column me-3', className].join(' ')}>
        {images.map((img, id) => renderImg(img, id))}
      </div>
    )
  );
};
