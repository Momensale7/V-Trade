import { configureStore } from "@reduxjs/toolkit";
import getProductSlice from "./Slicers/getProductsSlice";

export const store = configureStore({
    reducer: {
        products: getProductSlice
    }
});
