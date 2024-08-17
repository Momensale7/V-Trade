import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUE = {
    products: [],
    status: 'idle',
    error: null,
    product:{}
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
    const result = await res.json();
    return result.data;
});

const getProductSlice = createSlice({
    name: 'products',
    initialState: INITIAL_VALUE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default getProductSlice.reducer;
export const {getProduct} = getProductSlice.actions;
