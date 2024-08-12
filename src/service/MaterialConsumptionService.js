import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const { ADD_MATERIAL_CONSUMPTION_URL, GET_ALL_MATERIAL_CONSUMPTION_URL } =
  url.consumption;

export const addConsumptionMaterial = (consumption) => {
  return api
    .post(`${ADD_MATERIAL_CONSUMPTION_URL}`, {
      ...consumption,
      orgId: getOrgId(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllConsumptionMaterial = (materialId) => {
  return api
    .get(`${GET_ALL_MATERIAL_CONSUMPTION_URL}${getOrgId()}/${materialId}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
