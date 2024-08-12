export const getResponse = (
  action,
  state,
  addValue,
  updateValue,
  navigateUrl
) => {
  if (action.payload.data.reason) {
    return {
      ...state,
      error: action.payload.data.message,
      add: false,
      update: false,
    };
  }
  action.payload.onCancel();
  action.payload.navigate(`/app/${navigateUrl}`);
  return { ...state, error: '', add: addValue, update: updateValue };
};

export default getResponse;
