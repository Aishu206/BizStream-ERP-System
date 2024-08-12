import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const { ADD_ADVANCE_SALARY_URL, GET_ALL_ADVANCE_SALARY_URL } =
  url.advance_salary;

export const paidAdvance = (salary) => {
  return api
    .post(`${ADD_ADVANCE_SALARY_URL}`, { ...salary, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllAdvanceAmount = (empId) => {
  return api
    .get(`${GET_ALL_ADVANCE_SALARY_URL}${getOrgId()}/${empId}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
