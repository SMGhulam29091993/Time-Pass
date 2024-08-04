import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    user : null,
    loader : true,
    isAdmin : false,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        userExists : (state,action)=>{
            state.user = action.payload,
            state.loader = false
        },
        userNotExists : (state)=>{
            state.user = null,
            state.loader = false
        },
    }
})



export const {userExists, userNotExists} = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelector = (state)=>state.auth;
export default authSlice;
