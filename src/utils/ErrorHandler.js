export const errorData = (error) => {
  if (error.response) {
    console.error('Error Data : ', error.response.data);
    return error.response.data;
  } else {
    console.log('Message : ', error.message);
  }
  return error.data;
};
