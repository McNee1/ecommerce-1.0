import { useCallback, useEffect } from 'react';

const options = {
  rootMargin: '0px',
  threshold: 0.1,
};

export const useImgObserver = (imgRef: HTMLElement | null) => {
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLImageElement;

          if (target.dataset.src) {
            target.src = target.dataset.src;
            observer.unobserve(target);
          }
        }
      });
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (imgRef) {
      observer.observe(imgRef);
    }
    return () => {
      if (imgRef) observer.disconnect();
    };
  }, [callback, imgRef]);
};
