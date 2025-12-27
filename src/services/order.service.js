import api from './api';

export const placeOrder = (data) => {
  return api.post('/orders', data);
};
export const getMyOrders = () => {
  return api.get('/orders/my');
};
