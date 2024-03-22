import { LIMIT_PER_PAGE } from '../model/const/constants';
import { useLoadProducts } from '../model/hooks/use-load-products';
import { usePagination } from '../model/hooks/use-pagination';
import { useSelect } from '../model/hooks/use-select';

import { useAppSelector } from '@/app/hook/hooks';
import {
  MdCard,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
  selectTotalCount,
} from '@/entities/products';
import { AddToCart } from '@/features/add-to-cart';
import { DecreaseCountInCart } from '@/features/decrease-count-in-cart';
import { IncreaseCountInCart } from '@/features/increase-count-in-cart';
import { AppSelect } from '@/shared/ui/app-select/AppSelect';
import { Loader } from '@/shared/ui/loader/Loader';
import { Pagination } from '@/shared/ui/pagination/Pagination';

export const MainPage = () => {
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const total = useAppSelector(selectTotalCount);

  const { categories, handleSelect, selectedCategory } = useSelect();

  const {
    pageNumber,
    handleNextPage,
    handlePageChanger,
    handlePrevPage,
    curPageData,
    skipCount,
  } = usePagination(products, selectedCategory);

  useLoadProducts(pageNumber, curPageData, skipCount, selectedCategory);

  if (status === 'pending' || status === 'idle') {
    return <Loader />;
  } else if (error && status === 'failed') {
    return error;
  } else {
    return (
      <>
        <div className='my-2'>
          <h1>Shop</h1>
        </div>
        <AppSelect
          options={categories}
          onChange={handleSelect}
          defaultValue={selectedCategory}
        />
        <div className='row gx-2 gy-3'>
          <>
            {curPageData ? (
              curPageData?.map((product) => (
                <div
                  key={product.id}
                  className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'
                >
                  <MdCard
                    product={product}
                    renderDecreaseCount={(id) => <DecreaseCountInCart id={id} />}
                    renderIncreaseCount={(id) => <IncreaseCountInCart id={id} />}
                    renderAddToCart={(product) => <AddToCart product={product} />}
                  />
                </div>
              ))
            ) : (
              <div className='text-center fs-5'>List is empty</div>
            )}
          </>
        </div>

        <Pagination
          total={total}
          pagesInView={5}
          className='mt-2 mb-1'
          pageNumber={pageNumber}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          limitPerPage={LIMIT_PER_PAGE}
          onPageChanger={handlePageChanger}
        />
      </>
    );
  }
};
