import { ImgHTMLAttributes,useEffect, useRef } from 'react';

interface LazyImgPros extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  src: string;
}

const options = {
  rootMargin: '0px',
  threshold: 0.1,
};
export const LazyImg = (props: LazyImgPros) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const { alt, src, ...rest } = props;

  useEffect(() => {
    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLImageElement;
          target.src = src;
          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [imgRef, src]);

  return (
    <img
      {...rest}
      alt={alt}
      ref={imgRef}
      style={props.style}
      src='/src/shared/assets/img/img_placeholder.png'
    />
  );
};
