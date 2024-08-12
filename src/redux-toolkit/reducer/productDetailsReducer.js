import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  materialUsed: [],
};

export const productDetailsReducer = createSlice({
  name: "@productDetailsReducer",
  initialState,
  reducers: {
    Product_Deatils: (state, action) => {
      return { materialUsed: action.payload };
    },

    Data_Table: (state, action) => {
      return {
        materialUsed: action.payload,
      };
    },
  },
});

export const { Product_Deatils, Data_Table } = productDetailsReducer.actions;

export default productDetailsReducer.reducer;
