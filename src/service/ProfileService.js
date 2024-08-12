import api from '@/utils/api';
import { errorData } from '@/utils/ErrorHandler';
import { url } from '@/constant/network-url-mono';

const { CREATE_PROFILE_URL } = url.profile;

export const createProfile = (profile) => {
  return api
    .post(CREATE_PROFILE_URL, profile)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
