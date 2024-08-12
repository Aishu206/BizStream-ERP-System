import api from '@/utils/api';
import { getEmailIdFromLocal, getOrgId } from './ServiceUtil';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const {
  CREATE_USER_URL,
  LOGIN_URL,
  CHANGE_PASSWORD_URL,
  CHECK_PASSWORD_URL,
  FORGET_PASSWORD_URL,
  VERIFY_CODE_URL,
  RESET_PASSWORD_URL,
  GET_PASSCODE_URL,
} = url.user;

export const login = async ({ emailId, password }) => {
  return await api
    .post(`${LOGIN_URL}`, {
      emailId,
      password,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const newUserRegister = async (user) => {
  return await api
    .post(`${CREATE_USER_URL}`, {
      ...user,
      orgId: getOrgId(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const isCorrectPassword = async (user) => {
  return await api
    .post(`${CHECK_PASSWORD_URL}`, {
      ...user,
      orgId: getOrgId(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const changePassword = async (user) => {
  return await api
    .post(`${CHANGE_PASSWORD_URL}`, {
      ...user,
      orgId: getOrgId(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const forgetPassword = async (req) => {
  return await api
    .post(`${FORGET_PASSWORD_URL}`, {
      ...req,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getPasscode = async (request) => {
  return await api
    .post(`${GET_PASSCODE_URL}`, {
      ...request,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const verifyCode = async (token, type) => {
  return await api
    .post(`${VERIFY_CODE_URL}`, {
      emailId: getEmailIdFromLocal(),
      token,
      type,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const resetPassword = async (req) => {
  return await api
    .post(`${RESET_PASSWORD_URL}`, {
      ...req,
      emailId: getEmailIdFromLocal(),
      orgId: getOrgId(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
