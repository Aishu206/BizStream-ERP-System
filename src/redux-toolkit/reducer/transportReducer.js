import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getTransportResponse from '../../component/common/commonResponse';
import { addTransportTask } from '@/service/TransportService';

const initialState = {
  add: false,
  update: false,
  error: '',
};

export const addTransportTaskAction = createAsyncThunk(
  '@transport/addTransportTask/',
  async (values) => {
    const data = await addTransportTask(values.addTransportTask);
    return { data: data, navigate: values.navigate, onCancel: values.onCancel };
  }
);


export const transportReducer = createSlice({
  name: '@transport',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addTransportTaskAction.fulfilled, (state, action) => {
        return getTransportResponse(action, state, true, false, 'transport-status');
      })
  },
});

export default transportReducer.reducer;
