import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const {
  ADD_DAILY_TASK_URL,
  GET_ALL_DAILY_TASK_URL,
  GET_ALL_DAILY_TASK_BY_STATUS_URL,
  UPDATE_DAILY_TASK_URL,
} = url.task;

export const addTodayTask = async (request) => {
  return await api
    .post(`${ADD_DAILY_TASK_URL}`, { ...request, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllTodayTask = async () => {
  return await api
    .get(`${GET_ALL_DAILY_TASK_URL}${getOrgId()}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllTaskByStatus = async (status) => {
  return await api
    .get(`${GET_ALL_DAILY_TASK_BY_STATUS_URL}${getOrgId()}/${status}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateTask = (task) => {
  console.log('Client : ', task);
  return api
    .put(`${UPDATE_DAILY_TASK_URL}${task.id}`, task)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
