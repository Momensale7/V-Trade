import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUE = {
    products: [],
    status: 'idle',
    error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (url_api) => {
    const res = await fetch(url_api);
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
