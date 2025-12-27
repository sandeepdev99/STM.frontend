import api from './api.js';

export const getProducts = (params) =>
  api.get('/products', { params });
