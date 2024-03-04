export const formatCurrency = (currency: number) => {
  return new Intl.NumberFormat('en-En', {
    currency: 'USD',
    style: 'currency',
  }).format(currency);
};
