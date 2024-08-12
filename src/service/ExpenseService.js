import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const { ADD_EXPENSE_URL, GET_ALL_EXPENSE_URL, UPDATE_EXPENSE_URL } =
  url.expense;

export const addExpense = (expense) => {
  const org = getOrgId();
  console.log(org)
  return api
    .post(`${ADD_EXPENSE_URL}`, { ...expense, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateExpense = (expense) => {
  return api
    .put(`${UPDATE_EXPENSE_URL}${expense.id}`, expense)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllExpense = (page, pageSize) => {
  return api
    .get(`${GET_ALL_EXPENSE_URL}${getOrgId()}/${page}/${pageSize}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getlatestExpense = () => {
  return api
    .get(`/expense/list/latest`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getExpenseByDate = (date) => {
  return api
    .get(`/expense/${date}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getExpenseById = (id) => {
  return api
    .get(`/expense/id/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
