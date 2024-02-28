import axios, { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductSchema } from '@/entities/product';
import { useImgObserver } from '@/shared/hooks/useImgObserver';
import { countDiscountPrice } from '@/shared/lib/discount';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { Description } from '@/shared/ui/description/Description';
import { DiscountBadge } from '@/shared/ui/discount-badge/DiscountBadge';
import { DiscountPrice } from '@/shared/ui/discount-pice/DiscountPrice';
import { Loader } from '@/shared/ui/loader/Loader';
import { Price } from '@/shared/ui/price/Price';
import { Rating } from '@/shared/ui/rating/Rating';

type StatusType = 'idle' | 'success' | 'loading';

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<ProductSchema>({});
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<StatusType>('idle');
  const imgRef = useRef<HTMLImageElement | null>(null);

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

  useImgObserver(imgRef.current);

  if (isLoading == 'loading' || isLoading == 'idle') {
    return <Loader />;
  }

  if (error) {
    return error.message;
  }

  return (
    <div className='d-flex flex-row mt-4'>
      {product.images && (
        <div className='d-flex flex-column me-3'>
          {product.images.map((img, id) => (
            <img
              alt={product.title}
              // src={img}
              // ref={(img) => (sideImgs.current[id] = img)}
              src={'/src/assets/img_placeholder.png'}
              // data-src={img}
              // className={[
              //   'mb-1 p-1',
              //   id == activeClass ? 'border border-warning p-1' : '',
              // ].join(' ')}
              // onClick={() => {
              //   onSetImgCard(img);
              //   onSetActiveClass(id);
              // }}
              key={img}
              style={{ width: '70px', height: '70px', cursor: 'pointer' }}
            />
          ))}
        </div>
      )}

      <div className='card border-0'>
        <div className='row gx-2'>
          <div className='col-md-4 col-lg-5'>
            <img
              alt={product.title}
              ref={imgRef}
              // src={
              //   activeClass == 0 || activeClass
              //     ? imgCard
              //     : '/src/assets/img_placeholder.png'
              // }
              data-src={product.thumbnail}
              src='/src/shared/assets/img/img_placeholder.png'
              style={{
                maxWidth: '300px',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                aspectRatio: '1/1',
              }}
              className='img-fluid rounded'
            />
          </div>
          <div className='col-md-8 col-lg-auto'>
            <div className='card-body pt-1 p-0 pt-md-0'>
              <h5 className='card-title mb-1'>{product.title}</h5>
              <div className='price'>
                <Price
                  discount={product.discountPercentage}
                  price={formatCurrency(product.price)}
                />

                <DiscountPrice
                  discount={product.discountPercentage}
                  discountPrice={formatCurrency(
                    countDiscountPrice(product.price, product.discountPercentage)
                  )}
                >
                  <DiscountBadge discount={product.discountPercentage} />
                </DiscountPrice>
              </div>

              <Rating
                rating={product.rating}
                className='mb-2'
              />
              <div className='mb-2'>
                <span className='text'>Brand: </span>
                {product.brand}
              </div>
              <div className='category mb-2'>
                <span className='text'>Category: </span>
                {product.category}
              </div>

              <Description description={product.description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
