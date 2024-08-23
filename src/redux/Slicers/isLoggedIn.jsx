import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE={
    isLoggedIn:false
}
const isLoggedIn =createSlice ({
    name :"isLoggedIn",
    initialState:INITIAL_STATE,
    reducers:{
        changeAuth:(state,action)=>{
            state.isLoggedIn=action.payload
        }
    }
})
export default isLoggedIn.reducer
export const {changeAuth}=isLoggedIn.actions