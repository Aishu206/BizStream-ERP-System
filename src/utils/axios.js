import axios from 'axios';
// import { API } from 'bckend';

const axiosInstance = axios.create();

// interceptor for http
axiosInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('JWT_TOKEN');
    if (token) request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response  ==> ', response);
    return response.data;
  },
  (error) => {
    console.error('Error ===>   ', error);
    const status = error.response ? error.response.status : null;

    // if the error is 401 Unauthorized, redirect to login page
    if (status === 401) {
      localStorage.removeItem('JWT_TOKEN');
      window.location.href = '/login';
    }

    // if the error is 404 Not Found, show a custom error message
    if (status === 404) {
      return Promise.reject(new Error('Page not found'));
    }

    // for other errors, show the default error message
    return Promise.reject(error);
  }
);

export default axiosInstance;
