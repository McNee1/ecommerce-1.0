export const discount = (price: number, discountPercent: number): number => {
  return (price * Math.floor(discountPercent)) / 100;
};

export const countDiscountPrice = (price: number, discountPercent: number): number => {
  return +(price - discount(price, discountPercent)).toFixed(2);
};
