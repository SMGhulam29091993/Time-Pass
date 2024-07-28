import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth,js";
import authSlice from "./reducers/auth,js";

const store = configureStore({
    reducer : {
        [authSlice.name]: authReducer,
    },
});


export default store;