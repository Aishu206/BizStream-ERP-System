import api from '@/utils/api';

export const addAttendance = (attendance) => {
  return api
    .post(`/attendance/add`, attendance)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const getAllAttendance = () => {
  return api
    .get(`/attendance`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const getAttendanceByDate = (date) => {
  return api
    .get(`/attendance/${date}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};
