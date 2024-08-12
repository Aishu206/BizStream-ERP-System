import api from '@/utils/api';
import { errorData } from '@/utils/ErrorHandler';

export const uploadBill = (bill) => {
  console.log('Request ====> ', bill);
  return api
    .post(`/bill/add`, bill)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllBill = () => {
  return api
    .get(`/bill/list`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getPendingBillCount = () => {
  return api
    .get(`/bill/pending/count`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getBillByDate = (date) => {
  return api
    .get(`/bill/date/${date}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
