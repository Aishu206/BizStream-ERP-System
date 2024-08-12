import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDescription: [],
};

export const editProduct = createSlice({
  name: "@editProduct",
  initialState,
  reducers: {
    Product_Edit: (state, action) => {
      return {
        productDescription: action.payload,
      };
    },
  },
});

export const { Product_Edit } = editProduct.actions;

export default editProduct.reducer;
