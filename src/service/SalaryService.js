import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const { ADD_SALARY_URL, GET_ALL_SALARY_URL } = url.salary;

export const paidSalary = (salary) => {
  console.log('Salary Object ', salary);
  return api
    .post(`${ADD_SALARY_URL}`, { ...salary, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllSalary = (empId) => {
  return api
    .get(`${GET_ALL_SALARY_URL}${getOrgId()}/${empId}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData.error(error);
    });
};
