import { createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUE = {
  adminProducts: JSON.parse(localStorage.getItem("adminProducts")) || [
    {
      id: 1,
      title: "test one",
      stock: 15,
      price: 495,
      category: "fashion",
    },
    {
      id: 2,
      title: "test two",
      stock: 15,
      price: 495,
      category: "women",
    },
    {
      id: 3,
      title: "test three",
      stock: 30,
      price: 495,
      category: "men",
    },
  ],
};

const productAdminSlice = createSlice({
  initialState: INITIAL_VALUE,
  name: "adminproducts",
  reducers: {
    addProduct: (state, action) => {
      state.adminProducts.push(action.payload);
      localStorage.setItem(
        "adminProducts",
        JSON.stringify(state.adminProducts)
      );
    },

    removeProdcut: (state, action) => {
      state.adminProducts = state.adminProducts.filter(
        (element) => element.id !== action.payload.id
      );
      localStorage.setItem(
        "adminProducts",
        JSON.stringify(state.adminProducts)
      );
    },

    updateProdcut: (state, action) => {
      state.adminProducts = state.adminProducts.map((element) =>
        element.id === action.payload.id
          ? { ...element, ...action.payload }
          : element
      );
      localStorage.setItem(
        "adminProducts",
        JSON.stringify(state.adminProducts)
      );
    },
  },
});

export const { addProduct, removeProdcut, updateProdcut } =
  productAdminSlice.actions;
export default productAdminSlice.reducer;
