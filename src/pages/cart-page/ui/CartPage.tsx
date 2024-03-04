import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch,useAppSelector } from '@/app/hook/hooks';
import { fetchProducts,selectProducts, selectProductsStatus } from '@/entities/products';
import { countDiscountPrice } from '@/shared/lib/discount';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { Description } from '@/shared/ui/description/Description';
import { DiscountBadge } from '@/shared/ui/discount-badge/DiscountBadge';
import { DiscountPrice } from '@/shared/ui/discount-pice/DiscountPrice';
import { Loader } from '@/shared/ui/loader/Loader';
import { Price } from '@/shared/ui/price/Price';
import { Rating } from '@/shared/ui/rating/Rating';

export const CartPage = () => {
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchProducts(10));
  }, [dispatch]);

  if (status === 'pending') {
    return <Loader />;
  }

  return (
    <>
      <div className='cart mt-1'>
        <h3 className='mb-3'>Shopping basket</h3>
        <div className='d-flex flex-column-reverse flex-md-row'>
          <div className='row'>
            <div className='col w-100'>
              <div className='cart-list'>
                {products ? (
                  products.map((product, id) => (
                    <div
                      key={product.id}
                      className='d-flex flex-row'
                    >
                      <div className='custom-checkbox  '>
                        <input
                          id={'foo'}
                          type='checkbox'
                          // onChange={onChange}
                        />
                        <label htmlFor={'foo'} />
                      </div>
                      <div className='card bg-light   w-100 flex-row'>
                        <Link to={`/product/${product.id}`}>
                          <div
                            style={{
                              height: '150px',
                              width: '150px',
                            }}
                          >
                            <img
                              style={{
                                height: '100%',
                                objectFit: 'cover',
                                width: '100%',
                              }}
                              className=''
                              alt={product.title}
                              src={product.images}
                              // src={'src/assets/img_placeholder.png'}
                              // data-src={product.thumbnail}
                              // ref={ref}
                              // style={imgOpt?.size}
                            />
                          </div>
                        </Link>
                        {/* {isDelete && (
                        <AppButton
                          onClick={() => onDelete(product.id)}
                          myClass={
                            'warning position-absolute top-0 end-0 btn btn-sm text-white rounded-circle d-flex justify-content-center align-items-center'
                          }
                          styles={{
                            height: '1.5rem',
                            width: '1.5rem',
                            transform: 'translate(20%, -30%)',
                            fontSize: '0.7rem',
                          }}
                        >
                          X
                        </AppButton>
                      )} */}
                        <div className='card-body p-1 ps-3 overflow-hidden'>
                          <div className='card-title'>
                            <Price
                              discount={product.discountPercentage}
                              price={formatCurrency(product.price)}
                            />
                            <DiscountPrice
                              discountPrice={formatCurrency(
                                countDiscountPrice(
                                  product.price,
                                  product.discountPercentage
                                )
                              )}
                              discount={product.discountPercentage}
                            >
                              <DiscountBadge discount={product.discountPercentage} />
                            </DiscountPrice>
                            <Rating rating={product.rating} />
                            <Description description={product.description} />
                          </div>
                          {/* <CartButtons
                          product={product}
                          {...rest}
                        /> */}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center fs-5'>List is empty</div>
                )}
              </div>
            </div>
            <div className='col'>
              <div className='price-cart mx-auto mx-md-0 mb-3 ms-md-auto position-sticky top-0'>
                <div className='p-2 bg-white rounded border border-warning position-sticky top-0'>
                  <div className='count-products d-flex border-bottom border-dark mb-2 pb-1'>
                    <span>All 10 product</span>
                    <span className='ms-auto'>{formatCurrency(200)}</span>
                  </div>
                  <div className='total-discount d-flex'>
                    <span>Discount amount:</span>
                    <span className='ms-auto text-danger'>
                      {'10%' ? '-' : ''}
                      {formatCurrency(5)}
                    </span>
                  </div>

                  <div className='total-price d-flex fs-4 fw-semibold'>
                    <span>Total</span>
                    <span className='ms-auto'>{formatCurrency(10)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
