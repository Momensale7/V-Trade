import { configureStore } from "@reduxjs/toolkit";
import getProductSlice from "./Slicers/getProductsSlice";
import favoritesProductsSlice from "./Slicers/favoritesProductsSlice";
import adminProducts from "./Slicers/adminProducts";
import adminCategory from "./Slicers/adminCategorySlice";

export const store = configureStore({
  reducer: {
    products: getProductSlice,
    favorites: favoritesProductsSlice,
    adminProducts: adminProducts,
    adminCategory: adminCategory,
  },
});
