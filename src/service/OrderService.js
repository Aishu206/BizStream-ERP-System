import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const { ADD_ORDER_URL, GET_ALL_ORDER_URL, GET_ORDER_URL } = url.order;

export const addOrder = (order) => {
  return api
    .post(`${ADD_ORDER_URL}`, { ...order, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateOrder = (order) => {
  return api
    .put(`${ADD_ORDER_URL}`, { ...order })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllOrderByStatus = (status, page, pageSize) => {
  return api
    .get(`${GET_ALL_ORDER_URL}${getOrgId()}/${status}/${page}/${pageSize}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllOrderByClientId = (clientId) => {
  return api
    .get(`${GET_ALL_ORDER_URL}${getOrgId()}/${clientId}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getPendingOrCompletedOrders = () => {
  return api
    .get(`/order/list/pending-completed`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getOrderById = (id) => {
  return api
    .get(`${GET_ORDER_URL}${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
