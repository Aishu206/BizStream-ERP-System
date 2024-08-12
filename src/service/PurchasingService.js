import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const {
  ADD_PURCHASE_PRODUCT_URL,
  GET_ALL_PURCHASE_PRODUCT_URL,
  GET_PURCHASE_PRODUCT_URL,
} = url.purchase_product;

export const addPurchasingProduct = (bill) => {
  return api
    .post(`${ADD_PURCHASE_PRODUCT_URL}`, { ...bill, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllPurchasingProduct = async () => {
  return await api
    .get(`${GET_ALL_PURCHASE_PRODUCT_URL}${getOrgId()}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getPurchasingProductById = (id) => {
  return api
    .get(`${GET_PURCHASE_PRODUCT_URL}${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
