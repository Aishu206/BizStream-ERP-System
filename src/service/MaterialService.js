import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const {
  ADD_MATERIAL_URL,
  GET_ALL_MATERIAL_URL,
  GET_MATERIAL_URL,
  UPDATE_MATERIAL_URL,
  UPDATE_MATERIAL_STOCK_URL,
} = url.material;

export const addMaterial = (material) => {
  console.log({ ...material });
  return api
    .post(`${ADD_MATERIAL_URL}`, { ...material, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateMaterial = (material) => {
  return api
    .put(`${UPDATE_MATERIAL_URL}${material.id}`, material)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateMaterialStock = (id, quantity) => {
  return api
    .put(`${UPDATE_MATERIAL_STOCK_URL}${id}`, quantity)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllMaterial = async (category, page, pageSize) => {
  return await api
    .get(`${GET_ALL_MATERIAL_URL}${getOrgId()}/${category}/${page}/${pageSize}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getMaterialById = (id) => {
  return api
    .get(`${GET_MATERIAL_URL}${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
