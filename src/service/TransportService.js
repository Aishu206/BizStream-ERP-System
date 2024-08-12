import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const {
  ADD_TODAY_TRANSPORT_TASK_URL,
  GET_ALL_TRANSPORT_DAILY_TASK_URL,
  UPDATE_TRANSPORT_DAILY_TASK_URL,
} = url.transport;

export const addTransportTask = async (transport) => {
  return await api
    .post(`${ADD_TODAY_TRANSPORT_TASK_URL}`, {
      ...transport,
      orgId: getOrgId(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateTransportTaskStatus = async (transport) => {
  return await api
    .put(`${UPDATE_TRANSPORT_DAILY_TASK_URL}${transport.id}`, transport)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllTransportByStatus = async (status) => {
  return await api
    .get(`${GET_ALL_TRANSPORT_DAILY_TASK_URL}${getOrgId()}/${status}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
