import api from './api';

export const createPaymentOrder = (data) => {
  return api.post('/payments/create', data);
};

export const verifyPayment = (data) => {
  return api.post('/payments/verify', data);
};
