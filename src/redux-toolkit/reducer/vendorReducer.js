import { getAllSalary } from '@/service/SalaryService';
import { addVendor, updateVendor } from '@/service/VendorService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import getVendorResponse from '../../component/common/commonResponse';

const initialState = {
  add: false,
  update: false,
  salary: [],
  error: '',
};

export const addVendorAction = createAsyncThunk(
  '@hrms/vendor/addVendor/',
  async (values) => {
    const data = await addVendor(values.dataAddVendor);
    console.log(data);
    console.log(values);
    return { data: data, navigate: values.navigate, onCancel: values.onCancel };
  }
);

export const updateVendorAction = createAsyncThunk(
  '@hrms/vendor/updateVendor/',
  async (values) => {
    const data = await updateVendor(values.dataUpdateVendor);
    console.log(data);
    return { data: data, navigate: values.navigate, onCancel: values.onCancel };
  }
);

export const vendorPaymentDetailsAction = createAsyncThunk(
  '@hrms/vendor/payment',
  async (values) => {
    const data = await getAllSalary(values);
    console.log(data);
    return data;
  }
);

export const vendorPurchasingDetailsAction = createAsyncThunk(
  '@hrms/vendor/purchase',
  async (values) => {
    const data = await getAllSalary(values);
    console.log(data);
    return data;
  }
);

export const vendorReducer = createSlice({
  name: '@hrms/vendor',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addVendorAction.fulfilled, (state, action) => {
        return getVendorResponse(action, state, true, false, 'vendor-list');
      })
      .addCase(updateVendorAction.fulfilled, (state, action) => {
        return getVendorResponse(action, state, false, true, 'vendor-list');
      })
      .addCase(vendorPaymentDetailsAction.fulfilled, (state, action) => {
        if (action.payload) {
          return { salary: action.payload };
        }
      })
      .addCase(vendorPurchasingDetailsAction.fulfilled, (state, action) => {
        if (action.payload) {
          return { salary: action.payload };
        }
      });
  },
});

export const {} = vendorReducer.actions;

export default vendorReducer.reducer;
