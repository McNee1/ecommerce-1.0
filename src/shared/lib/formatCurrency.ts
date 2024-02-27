export const formatCurrency = (currency: number) => {
  return new Intl.NumberFormat('en-En', {
    style: 'currency',
    currency: 'USD',
  }).format(currency);
};
