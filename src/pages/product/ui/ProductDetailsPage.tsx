import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductSchema } from '@/entities/product';

type StatusType = 'idle' | 'success' | 'loading' | 'error';

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<ProductSchema>([]);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<StatusType>('idle');

  const { id } = useParams();

  console.log(id);

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

  return (
    <div className='container'>
      <div className='d-flex flex-row mt-4'>
        {/* {images && (
          <div className='d-flex flex-column me-3'>
            {images.map((img, id) => (
              <img
                ref={(img) => (sideImgs.current[id] = img)}
                src={'/src/assets/img_placeholder.png'}
                data-src={img}
                className={[
                  'mb-1 p-1',
                  id == activeClass ? 'border border-warning p-1' : '',
                ].join(' ')}
                onClick={() => {
                  onSetImgCard(img);
                  onSetActiveClass(id);
                }}
                key={img}
                style={{ width: '70px', height: '70px', cursor: 'pointer' }}
              />
            ))}
          </div>
        )} */}

        {/* <ProductIdCard
          product={product}
          activeClass={activeClass}
          imgCard={imgCard}
        /> */}
      </div>
    </div>
  );
};
