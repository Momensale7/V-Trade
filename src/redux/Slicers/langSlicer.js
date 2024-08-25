import { createSlice } from "@reduxjs/toolkit";
import en from "../../Lang/EN";
import ar from "../../Lang/AR";
const translation={
    en:en,
    ar:ar
}
const initialState ={
    language:"en",
    translation:translation['en']
}
const languageSlicer =createSlice({
    "name":"lang",
    initialState,
    reducers:{
        changeLang:(state,action)=>{
            state.language=action.payload;
            state.translation=translation[action.payload]
        }
    }
})

export default languageSlicer.reducer
export const {changeLang}=languageSlicer.actions