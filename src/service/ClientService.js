import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';
const {
  ADD_CLIENT_URL,
  GET_ALL_CLIENT_URL,
  GET_CLIENT_URL,
  UPDATE_CLIENT_URL,
  GET_ALL_CLIENT_KEY_VALUE_URL,
} = url.client;

export const addClient = (client) => {
  return api
    .post(`${ADD_CLIENT_URL}`, { ...client, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const addAssignClient = (client) => {
  console.log('Client=====> ', client);
  return api
    .put(`/client/add/product/${client.id}`, client)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateClient = (client) => {
  console.log('Client : ', client);
  return api
    .put(`${UPDATE_CLIENT_URL}${client.id}`, client)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllClient = (page, pageSize) => {
  return api
    .get(`${GET_ALL_CLIENT_URL}${getOrgId()}/${page}/${pageSize}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getClientById = (id) => {
  return api
    .get(`${GET_CLIENT_URL}${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllClientKeyValue = (id) => {
  console.log('ID: ', id);
  return api
    .get(`${GET_ALL_CLIENT_KEY_VALUE_URL}${getOrgId()}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
