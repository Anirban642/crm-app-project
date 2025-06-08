export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};