import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { MdCard, ProductApiResponse, ProductSchema } from '@/entities/products';

export const MainPage = () => {
  const [products, setProducts] = useState<ProductSchema[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void axios
      .get<ProductApiResponse>('https://dummyjson.com/products?limit=10')
      .then(({ data }) => setProducts(data.products))
      .catch((error) => {
        console.log(error);
        if (isAxiosError(error)) {
          setError(error.name);
        } else {
          setError('Error occurred while making API call');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return 'loading';
  }
  if (error) {
    return error;
  }

  return (
    <>
      <div className='my-2'>
        <h1>Shop</h1>
      </div>

      <div className='row gx-2 gy-3'>
        <>
          {products.length ? (
            products.map((product) => (
              <div
                key={product.id}
                className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'
              >
                <MdCard product={product} />
              </div>
            ))
          ) : (
            <div className='text-center fs-5'>List is empty</div>
          )}
        </>
      </div>
    </>
  );
};
