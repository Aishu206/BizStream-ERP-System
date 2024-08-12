import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const {
  ADD_MATERIAL_USED_IN_PRODUCT_URL,
  GET_MATERIAL_USED_IN_PRODUCT_URL,
  UPDATE_MATERIAL_USED_IN_PRODUCT_URL,
  GET_MATERIAL_DATA_BY_PRODUCT_ID_URL,
} = url.material_used;

export const addMaterialUsedInProduct = (data) => {
  return api
    .post(`${ADD_MATERIAL_USED_IN_PRODUCT_URL}`, { ...data, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateMaterialUsedInProduct = (data, id) => {
  return api
    .post(`${UPDATE_MATERIAL_USED_IN_PRODUCT_URL}${id}`, { ...data })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getMaterialUsedInProduct = (id) => {
  return api
    .get(`${GET_MATERIAL_USED_IN_PRODUCT_URL}${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getMaterialUsedInProductByProductId = async (id) => {
  return await api
    .get(`${GET_MATERIAL_DATA_BY_PRODUCT_ID_URL}${id}`)
    .then((res) => {
      console.log(' Data ', res.data);
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
