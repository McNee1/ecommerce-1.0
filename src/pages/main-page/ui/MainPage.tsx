/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hook/hooks';
import { decreaseProductCountAsync, increaseProductCountAsync } from '@/entities/cart';
import { addToCart } from '@/entities/cart/model/services/add-to-cart';
import {
  getProducts,
  MdCard,
  ProductData,
  productsActions,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
  selectTotalCount,
} from '@/entities/products';
import { findIndex } from '@/shared/lib/find_index';
import { Loader } from '@/shared/ui/loader/Loader';

const LIMIT_PER_PAGE = 10;

export const MainPage = () => {
  const [skipCount, setSkipCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [pages, setPages] = useState<number[]>([1, 2, 3, 4, 5]);

  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const total = useAppSelector(selectTotalCount);

  useEffect(() => {
    if (!products && !isLoading) {
      setIsLoading(true);
      void dispatch(getProducts({ limit: LIMIT_PER_PAGE, skip: skipCount }));
      setSkipCount(skipCount + LIMIT_PER_PAGE);
    }
  }, [dispatch, products, skipCount, isLoading]);

  const slicedArray = useMemo(() => {
    function sliceArray<T>(array: T[], sliceLength: number) {
      const slicedArray = [];

      for (let i = 0; i < array.length; i += sliceLength) {
        slicedArray.push(array.slice(i, i + sliceLength));
      }
      return slicedArray;
    }
    if (products) {
      const array = sliceArray(products, LIMIT_PER_PAGE);
      return array;
    }
  }, [products]);

  const handlePageChanger = (id: number) => {
    setPageNumber(id);
    if (slicedArray?.[id - 1]) {
      return;
    }

    const newSkipCount = id * LIMIT_PER_PAGE;
    setSkipCount(newSkipCount);
    void dispatch(
      getProducts({ limit: id * LIMIT_PER_PAGE - skipCount, skip: skipCount })
    );
  };

  const handleNextPage = () => {
    handlePageChanger(pageNumber + 1);

    const id = findIndex(pages, pageNumber);

    if (id === pages.length - 1) {
      setPages((prev) => prev.map((num) => num + 1));
    }
  };
  const handlePrevPage = () => {
    handlePageChanger(pageNumber - 1);

    const id = findIndex(pages, pageNumber);
    if (id === 0) {
      setPages((prev) => prev.map((num) => num - 1));
    }
  };

  const handleAddToCart = (product: ProductData) => {
    void dispatch(addToCart(product));
    dispatch(productsActions.addProductCount(product.id));
  };

  const handleIncreaseCount = (id: number) => {
    void dispatch(increaseProductCountAsync(id));
    dispatch(productsActions.increaseProductCount(id));
  };
  const handleDecreaseCount = (id: number) => {
    void dispatch(decreaseProductCountAsync(id));
    dispatch(productsActions.decreaseProductCount(id));
  };

  return (
    <>
      {status === 'pending' ? (
        <Loader />
      ) : error && status === 'failed' ? (
        error
      ) : (
        <>
          <div className='my-2'>
            <h1>Shop</h1>
          </div>

          <div className='row gx-2 gy-3'>
            <>
              {slicedArray ? (
                slicedArray[pageNumber - 1].map((product) => (
                  <div
                    key={product.id}
                    className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'
                  >
                    <MdCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onDecreaseCount={handleDecreaseCount}
                      onIncreaseCount={handleIncreaseCount}
                    />
                  </div>
                ))
              ) : (
                <div className='text-center fs-5'>List is empty</div>
              )}
            </>
          </div>

          <nav className='d-flex mt-2 mb-1'>
            <ul className='pagination m-auto'>
              <li className='page-item'>
                <a
                  href='#'
                  aria-label='Previous'
                  onClick={handlePrevPage}
                  className={['page-link', pageNumber <= 1 && 'disabled'].join(' ')}
                >
                  <span aria-hidden='true'>&laquo;</span>
                </a>
              </li>
              {total &&
                pages.map((number) => (
                  <li
                    className={['page-item', number === pageNumber ? 'active' : ''].join(
                      ' '
                    )}
                    key={number}
                    onClick={() => handlePageChanger(number)}
                  >
                    <a
                      href='#'
                      className='page-link'
                    >
                      {number}
                    </a>
                  </li>
                ))}
              {total && (
                <li className='page-item'>
                  <a
                    className={[
                      'page-link',
                      pageNumber >= total / LIMIT_PER_PAGE && 'disabled',
                    ].join(' ')}
                    href='#'
                    aria-label='Next'
                    onClick={handleNextPage}
                  >
                    <span aria-hidden='true'>&raquo;</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </>
      )}
    </>
  );
};
