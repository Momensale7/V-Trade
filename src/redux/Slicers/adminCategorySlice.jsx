import { createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUE = {
  admincategory: JSON.parse(localStorage.getItem("admincategory")) || [
    { id: 1, name: "men" },
  ],
};

const categoryAdminSlice = createSlice({
  initialState: INITIAL_VALUE,
  name: "admincategory",
  reducers: {
    addCate: (state, action) => {
      state.admincategory.push(action.payload);
      localStorage.setItem(
        "admincategory",
        JSON.stringify(state.admincategory)
      );
    },
    removeCate: (state, action) => {
      state.admincategory = state.admincategory.filter(
        (element) => element.id !== action.payload.id
      );
      localStorage.setItem(
        "admincategory",
        JSON.stringify(state.admincategory)
      );
    },
  },
});

export const { addCate, removeCate } = categoryAdminSlice.actions;
export default categoryAdminSlice.reducer;
