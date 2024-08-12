import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const {
  ADD_EMPLOYEE_URL,
  GET_ALL_EMPLOYEE_URL,
  GET_EMPLOYEE_URL,
  UPDATE_EMPLOYEE_URL,
  GET_ALL_EMPLOYEE_KEY_VALUE_URL,
  GET_ALL_EMPLOYEE_KEY_VALUE_DESIGNATION_URL,
  GET_ALL_EMPLOYEE_KEY_VALUE_PAID_URL,
} = url.employee;

export const addEmployee = async (employee) => {
  return await api
    .post(`${ADD_EMPLOYEE_URL}`, { ...employee, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateEmployee = async (employee) => {
  return await api
    .put(`${UPDATE_EMPLOYEE_URL}${employee.id}`, employee)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllEmployees = async (page, pageSize) => {
  return await api
    .get(`${GET_ALL_EMPLOYEE_URL}${getOrgId()}/${page}/${pageSize}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllEmployeeKeyValue = async () => {
  return await api
    .get(`${GET_ALL_EMPLOYEE_KEY_VALUE_URL}${getOrgId()}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getEmployeeById = async (id) => {
  return await api
    .get(`${GET_EMPLOYEE_URL}${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllEmployeeKeyValueByDesignation = async (designation) => {
  return await api
    .get(
      `${GET_ALL_EMPLOYEE_KEY_VALUE_DESIGNATION_URL}${getOrgId()}/${designation}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllEmployeeKeyValueByPaidBy = async () => {
  return await api
    .get(`${GET_ALL_EMPLOYEE_KEY_VALUE_PAID_URL}${getOrgId()}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
