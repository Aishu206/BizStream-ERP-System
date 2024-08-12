import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const {
  ADD_VENDOR_URL,
  GET_ALL_VENDOR_URL,
  GET_VENDOR_URL,
  UPDATE_VENDOR_URL,
  GET_ALL_VENDOR_KEY_VALUE_URL,
} = url.vendor;

export const addVendor = async (vendor) => {
  return api
    .post(`${ADD_VENDOR_URL}`, { ...vendor, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateVendor = async (vendor) => {
  return api
    .put(`${UPDATE_VENDOR_URL}${vendor.id}`, vendor)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllVendor = async (page, pageSize) => {
  return api
    .get(`${GET_ALL_VENDOR_URL}${getOrgId()}/${page}/${pageSize}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getVendorById = async (id) => {
  return api
    .get(`${GET_VENDOR_URL}${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllVendorKeyValue = async () => {
  return api
    .get(`${GET_ALL_VENDOR_KEY_VALUE_URL}${getOrgId()}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
