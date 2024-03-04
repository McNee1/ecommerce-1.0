import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import { LgCard } from '@/entities/product-item';
import { ProductSchema } from '@/entities/products';
import { ImageBar } from '@/shared/ui/img-bar/ImageBar';
import { LazyImg } from '@/shared/ui/lazy-img/LazyImg';
import { Loader } from '@/shared/ui/loader/Loader';

type StatusType = 'idle' | 'loading' | 'success';

const styleImg = {
  cursor: 'pointer',
  height: '70px',
  width: '70px',
};

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<ProductSchema | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<StatusType>('idle');

  const [activeClass, setActiveClass] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const loadProduct = () => {
      setIsLoading('loading');
      setError(null);

      axios
        .get<ProductSchema>(`https://dummyjson.com/product/${id}`)
        .then(({ data }) => {
          setProduct(data);
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            setError(error);
          } else {
            setError(null);
          }
        })
        .finally(() => setIsLoading('success'));
    };

    loadProduct();
  }, [id]);

  if (isLoading == 'loading' || isLoading == 'idle') {
    return <Loader />;
  }

  if (!product) {
    return 'no data';
  }

  if (error) {
    return error.message;
  }

  return (
    <div className='d-flex flex-row mt-4'>
      <ImageBar
        renderImg={(img: string, id: number) => (
          <LazyImg
            className={[
              'mb-2 p-1 rounded lazy',
              id == activeClass && 'border border-warning',
            ].join(' ')}
            key={img}
            src={img}
            style={styleImg}
            alt={product.title}
            onClick={() => setActiveClass(id)}
          />
        )}
        images={product.images}
      />

      <LgCard
        product={product}
        activeClass={activeClass}
      />
    </div>
  );
};
