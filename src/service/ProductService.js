import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const {
  ADD_PRODUCT_URL,
  GET_ALL_PRODUCT_URL,
  GET_PRODUCT_URL,
  UPDATE_PRODUCT_URL,
  UPDATE_PRODUCT_QUANTITY_URL,
  UPDATE_PRODUCT_IMAGE_URL,
} = url.product;

export const addProduct = async (product) => {
  return await api
    .post(`${ADD_PRODUCT_URL}`, { ...product, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateProduct = async (product) => {
  return await api
    .put(`${UPDATE_PRODUCT_URL}${product.id}`, product)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateProductImage = async (base64, id) => {
  return await api
    .put(`${UPDATE_PRODUCT_IMAGE_URL}${id}`, { base64: base64 })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateProductQuantity = async (id, quantity) => {
  return await api
    .put(`${UPDATE_PRODUCT_QUANTITY_URL}${id}`, quantity)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllProductByCategory = async (category, page, pageSize) => {
  console.log('Category ', category);
  category = category ? category : 'All';
  return await api
    .get(`${GET_ALL_PRODUCT_URL}${getOrgId()}/${category}/${page}/${pageSize}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getProductByDate = async (date) => {
  return await api
    .get(`/product/${date}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getProductById = async (id) => {
  return await api
    .get(`${GET_PRODUCT_URL}${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};
