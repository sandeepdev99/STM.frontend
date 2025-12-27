import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-stm.onrender.com/api/v1',
});


//token inerceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


//error handling
api.interceptors.response.use(
  res => res,
  err => {
    alert(err.response?.data?.message || 'Error');
    return Promise.reject(err);
  }
);


export default api;