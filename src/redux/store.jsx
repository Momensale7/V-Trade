import { configureStore } from "@reduxjs/toolkit";
import getProductSlice from "./Slicers/getProductsSlice";
import favoritesProductsSlice from "./Slicers/favoritesProductsSlice";
import isLoggedIn from "./Slicers/isLoggedIn";

export const store = configureStore({
    reducer: {
        products: getProductSlice,
        favorites: favoritesProductsSlice,
        isLoggedIn,
    }
});
