import { useEffect, useState } from 'react';
import { decrease } from '../lib/decrease';
import { findById } from '../lib/find-by-id';
import { increase } from '../lib/increase';
import { PaymentSchema } from '../types/cart-types';

import { useAppDispatch } from '@/app/hook/hooks';
import {
  decreaseProductCountAsync,
  deleteFormCart,
  getCartProducts,
  increaseProductCountAsync,
} from '@/entities/cart';
import { CartData } from '@/entities/cart/model/types/cart-type';
import { productsActions } from '@/entities/products';

const initialPayment = {
  discountAmount: 0,
  productsCount: 0,
  totalPrice: 0,
  discountPrice: 0,
};

export const useCart = (shoppingCart: CartData[] | null) => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const [paymentPrice, setPaymentPrice] = useState<PaymentSchema>(initialPayment);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!shoppingCart) {
      void dispatch(getCartProducts());
    }
  }, [dispatch, shoppingCart]);

  const handleIncreaseCount = (productId: string) => {
    void dispatch(increaseProductCountAsync(productId));
    dispatch(productsActions.increaseProductCount(productId));

    const currProduct = findById(shoppingCart, productId);

    if (currProduct && checked[productId]) {
      setPaymentPrice((prev) =>
        increase(prev, 1, currProduct.discountPercentage, currProduct.price)
      );
    }
  };

  const handleDecreaseCount = (productId: string) => {
    void dispatch(decreaseProductCountAsync(productId));
    dispatch(productsActions.decreaseProductCount(productId));

    const currProduct = findById(shoppingCart, productId);

    if (currProduct && checked[productId]) {
      setPaymentPrice((prev) =>
        decrease(prev, 1, currProduct.discountPercentage, currProduct.price)
      );
    }
  };

  const handleDeleteProduct = (productId: string) => {
    void dispatch(deleteFormCart(productId));
    dispatch(productsActions.deleteProductCount(productId));
  };

  const handlePrice = (check: boolean, product: CartData) => {
    const { count, discountPercentage, price, id } = product;

    setChecked((prev) => ({
      ...prev,
      [id]: check,
    }));

    setPaymentPrice((prev) => {
      if (check) {
        return increase(prev, count, discountPercentage, price);
      } else {
        return decrease(prev, count, discountPercentage, price);
      }
    });
  };

  return {
    paymentPrice,

    handlePrice,
    handleDeleteProduct,
    handleDecreaseCount,
    handleIncreaseCount,
  };
};
