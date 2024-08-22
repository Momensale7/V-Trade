import { createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUE = {
    favoriteProducts : JSON.parse(localStorage.getItem('favoritesProducts')) || []
}

const favoritesProductsSlice = createSlice({
    initialState: INITIAL_VALUE,
    name:"favorites",
    reducers: {
        addToFavorites : (state,action) => {
            state.favoriteProducts.push(action.payload)
            localStorage.setItem('favoritesProducts', JSON.stringify(state.favoriteProducts))
        },
        removeFromFavorites: (state,action) => {
            state.favoriteProducts = state.favoriteProducts.filter((element) => element.id !== action.payload.id);
            localStorage.setItem('favoritesProducts', JSON.stringify(state.favoriteProducts))
        }
    }
})

export const {addToFavorites ,removeFromFavorites} = favoritesProductsSlice.actions;
export default favoritesProductsSlice.reducer;