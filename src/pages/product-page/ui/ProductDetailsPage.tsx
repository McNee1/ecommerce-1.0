import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductSchema } from '@/entities/product';
import { countDiscountPrice } from '@/shared/lib/discount';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { Description } from '@/shared/ui/description/Description';
import { DiscountBadge } from '@/shared/ui/discount-badge/DiscountBadge';
import { DiscountPrice } from '@/shared/ui/discount-pice/DiscountPrice';
import { LazyImg } from '@/shared/ui/lazy-img/LazyImg';
import { Loader } from '@/shared/ui/loader/Loader';
import { Price } from '@/shared/ui/price/Price';
import { Rating } from '@/shared/ui/rating/Rating';

import { ImageBar } from './ui/ImageBar';

type StatusType = 'idle' | 'success' | 'loading';

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<ProductSchema | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<StatusType>('idle');

  const [activeClass, setActiveClass] = useState(0);
  // const [activeImg, setActiveImg] = useState('');

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
        images={product.images}
        title={product.title}
        activeClass={activeClass}
        onActivateImg={setActiveClass}
      />

      <div className='card border-0'>
        <div className='row gx-2'>
          <div className='col-md-4 col-lg-5'>
            <LazyImg
              alt={product.title}
              src={product.images[activeClass]}
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
          <div className='col-md-8 col-lg-7'>
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
