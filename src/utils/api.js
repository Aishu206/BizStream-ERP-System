import axios from 'axios';
import { API } from '../backend';
import { logoutUser } from '../service/AuthService';

const api = axios.create({
  baseURL: API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// interceptor for http
api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('JWT_TOKEN');
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1');
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Error in Interceptor ===>   ', error.response.data);
    const { httpStatusCode } = error.response.data;
    const { status } = error.response;

    // if the error is 401 Unauthorized, redirect to login page
    if (
      httpStatusCode === 401 ||
      httpStatusCode === 403 ||
      status === 401 ||
      status === 403
    ) {
      logoutUser();
      window.location.href = '/login';
    }

    // if the error is 404 Not Found, show a custom error message
    if (httpStatusCode === 404) return Promise.reject(error);

    // for other errors, show the default error message
    return Promise.reject(error);
  }
);

export default api;
