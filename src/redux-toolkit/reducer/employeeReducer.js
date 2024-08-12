import { addEmployee, updateEmployee } from '@/service/EmployeeService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getEmployeeResponse from '../../component/common/commonResponse';

const initialState = {
  add: false,
  update: false,
  error: '',
};

export const addEmployeeAction = createAsyncThunk(
  '@hrms/employee/addEmployee/',
  async (values) => {
    const data = await addEmployee(values.dataAddEmployee);
    return { data: data, navigate: values.navigate, onCancel: values.onCancel };
  }
);

export const updateEmployeeAction = createAsyncThunk(
  '@hrms/employee/updateEmployee/',
  async (values) => {
    const data = await updateEmployee(values.dataUpdateEmployee);
    return { data: data, navigate: values.navigate, onCancel: values.onCancel };
  }
);

export const employeeReducer = createSlice({
  name: '@hrms/employee',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addEmployeeAction.fulfilled, (state, action) => {
        return getEmployeeResponse(action, state, true, false, 'employee-list');
      })
      .addCase(updateEmployeeAction.fulfilled, (state, action) => {
        return getEmployeeResponse(action, state, false, true, 'employee-list');
      });
  },
});

export default employeeReducer.reducer;
