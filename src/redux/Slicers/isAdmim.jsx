import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE={
    isAdmin:false
}
const isAdmin =createSlice ({
    name :"isAdmin",
    initialState:INITIAL_STATE,
    reducers:{
        changeAmdinAuth:(state,action)=>{
            state.isAdmin=action.payload
        }
    }
})
export default isAdmin.reducer
export const {changeAmdinAuth}=isAdmin.actions