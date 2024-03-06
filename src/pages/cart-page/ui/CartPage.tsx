import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/hook/hooks';
import { selectShoppingCart } from '@/entities/cart/model/slice/cart-slice';
import { selectProducts, selectProductsStatus } from '@/entities/products';
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
  const shoppingCart = useAppSelector(selectShoppingCart);

  // useEffect(() => {
  //   void dispatch(fetchProducts(10));
  // }, [dispatch]);

  if (status === 'pending') {
    return <Loader />;
  }

  return (
    <>
      <div className='cart mt-1'>
        <h3 className='mb-3'>Shopping basket</h3>
        {/* <div className='d-flex flex-column-reverse flex-md-row w-100'> */}
        <div className='row'>
          {shoppingCart ? (
            <>
              <div className='col-12 col-md-8 col-lg-9'>
                <div className='cart-list'>
                  {shoppingCart?.map((product, id) => (
                    <div
                      key={product.id}
                      className='d-flex flex-row mb-2'
                    >
                      <div className='custom-checkbox'>
                        <input
                          id={id}
                          type='checkbox'
                          // onChange={onChange}
                        />
                        <label htmlFor={id} />
                      </div>
                      <div
                        style={{ height: '130px' }}
                        className='card w-100 flex-row'
                      >
                        <Link to={`/product/${product.id}`}>
                          <img
                            style={{
                              height: '100%',
                              objectFit: 'cover',
                              width: '150px',
                            }}
                            className=''
                            alt={product.title}
                            src={product.images}
                            // src={'src/assets/img_placeholder.png'}
                            // data-src={product.thumbnail}
                            // ref={ref}
                            // style={imgOpt?.size}
                          />
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
                          <h5 className='card-title mb-1 fs-6'>{product.title}</h5>
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
                          <Description
                            description={product.description}
                            // short
                          />

                          {/* <CartButtons
                          product={product}
                          {...rest}
                        /> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='col col-md-4 col-lg-3'>
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
            </>
          ) : (
            <div className='text-center fs-5'>List is empty</div>
          )}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
