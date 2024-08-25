import { configureStore } from "@reduxjs/toolkit";
import getProductSlice from "./Slicers/getProductsSlice";
import favoritesProductsSlice from "./Slicers/favoritesProductsSlice";


import adminProducts from "./Slicers/adminProducts";
import adminCategory from "./Slicers/adminCategorySlice";
import isLoggedIn from "./Slicers/isLoggedIn";
import langSlicer from "./Slicers/langSlicer";
import isAdmim from "./Slicers/isAdmim";
export const store = configureStore({
  reducer: {
    products: getProductSlice,
    favorites: favoritesProductsSlice,
    adminProducts: adminProducts,
    adminCategory: adminCategory,
    isLoggedIn,
    langSlicer,
    isAdmim, 
  },
});
