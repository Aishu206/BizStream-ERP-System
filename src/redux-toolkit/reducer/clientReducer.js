import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getclientResponse from '../../component/common/commonResponse';
import { addClient, updateClient } from '@/service/ClientService';

const initialState = {
  clients: [],
  isModelOpen: false,
  formValues: false,
  page: 0,
  pageSize: 10,
  totalPage: 0,
  anchorEl: null,
  error: '',
};

export const addClientAction = createAsyncThunk(
  '@hrms/client/addClient/',
  async (values) => {
    const data = await addClient(values.dataAddClient);
    console.log(data);
    console.log(values);
    return { data: data, navigate: values.navigate, onCancel: values.onCancel };
  }
);

export const updateClientAction = createAsyncThunk(
  '@hrms/client/updateClient',
  async (values) => {
    const data = await updateClient(values.dataUpdateClient);
    console.log(data);
    return { data: data, navigate: values.navigate, onCancel: values.onCancel };
  }
);

export const clientReducer = createSlice({
  name: '@hrms/client/addEditClient',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addClientAction.fulfilled, (state, action) => {
        return getclientResponse(action, state, true, false, 'client-list');
      })
      .addCase(updateClientAction.fulfilled, (state, action) => {
        return getclientResponse(action, state, false, true, 'client-list');
      });
  },
});

export default clientReducer.reducer;
