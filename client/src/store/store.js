import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cvReducer from "./cvSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cv: cvReducer,
  },
});

export default store;
