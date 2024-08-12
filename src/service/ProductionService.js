import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const { UPDATE_PRODUCTION_URL, GET_ALL_PRODUCTION_URL } = url.production;

export const getAllProductionOrders = (page, pageSize) => {
  return api
    .get(`${GET_ALL_PRODUCTION_URL}${getOrgId()}/${page}/${pageSize}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateOrderStatus = (data, id) => {
  return api
    .put(`${UPDATE_PRODUCTION_URL}${id}`, { ...data })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
