import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth";
import authSlice from "./reducers/auth";

const store = configureStore({
    reducer : {
        [authSlice.name]: authReducer,
    },
});


export default store;